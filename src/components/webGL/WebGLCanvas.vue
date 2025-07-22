<template>
    <canvas ref="canvas" class="w-full h-full" ></canvas>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const canvas = ref(null);
let scene, camera, renderer, animationId;
let shapes = [];
let stars = [];
let nebula = [];
let marsGroup;
let atmosphereGroup;

// Enhanced zoom system
let zoomProgress = 0; // 0 = closest (top of Mars), 1 = fully zoomed out
const zoomSpeed = 0.1;
const minZoomProgress = 0;
const maxZoomProgress = 1;

// Camera and Mars positions based on zoom progress
const cameraStartDistance = 20; // Close enough to see Mars surface
const cameraEndDistance = 35; // Far enough to see full Mars
const marsStartY = -20; // Mars positioned way down (bottom of screen)
const marsEndY = 0; // Mars centered

let isZoomComplete = false;

const mars_albedo = new TextureLoader().load( new URL('@/assets/mars_albedo.png', import.meta.url).href)
const mars_normal = new TextureLoader().load( new URL('@/assets/texture.jpg', import.meta.url).href, (t) => {t.colorSpace = THREE.SRGBColorSpace;})
// Create starfield
function createStarfield() {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount; i++) {
        // Random positions in a sphere
        const radius = 200 + Math.random() * 300;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
        
        // Random star colors (white to blue-white)
        const intensity = 0.5 + Math.random() * 0.5;
        colors[i * 3] = intensity; // R
        colors[i * 3 + 1] = intensity; // G
        colors[i * 3 + 2] = intensity + Math.random() * 0.3; // B (slight blue tint)
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const starMaterial = new THREE.PointsMaterial({
        size: 2,
        sizeAttenuation: false,
        vertexColors: true,
        transparent: true,
        opacity: 1
    });
    
    const starField = new THREE.Points(starGeometry, starMaterial);
    return starField;
}

// Create nebula clouds
function createNebula() {
    const nebulaGroup = new THREE.Group();
    
    for (let i = 0; i < 8; i++) {
        const geometry = new THREE.SphereGeometry(30 + Math.random() * 50, 16, 8);
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(0.8 + Math.random() * 0.2, 0.6, 0.1 + Math.random() * 0.2),
            transparent: true,
            opacity: 0.03 + Math.random() * 0.02,
            side: THREE.BackSide
        });
        
        const nebulaMesh = new THREE.Mesh(geometry, material);
        nebulaMesh.position.set(
            (Math.random() - 0.5) * 400,
            (Math.random() - 0.5) * 200,
            (Math.random() - 0.5) * 400
        );
        
        nebulaGroup.add(nebulaMesh);
    }
    
    return nebulaGroup;
}

function createMarsphere(radius = 1, widthSegments = 64, heightSegments = 32) {
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    return geometry;
}

function updateCameraAndMars() {
    // Smooth easing function for more natural animation
    const easeProgress = zoomProgress * zoomProgress * (3 - 2 * zoomProgress); // smoothstep
    
    // Update Mars position first (move up as we scroll)
    if (marsGroup) {
        const currentY = THREE.MathUtils.lerp(marsStartY, marsEndY, easeProgress);
        marsGroup.position.y = currentY;
    }
    
    // Update camera distance (zoom out after Mars moves up)
    const zoomPhase = Math.max(0, easeProgress - 0.3) / 0.7; // Start zooming after 30% of movement
    const currentDistance = THREE.MathUtils.lerp(cameraStartDistance, cameraEndDistance, zoomPhase);
    const direction = camera.position.clone().normalize();
    camera.position.copy(direction.multiplyScalar(currentDistance));
    camera.lookAt(-5, -2, 12);
    
    // Update stars and nebula opacity based on zoom
    const spaceOpacity = Math.max(0, easeProgress - 0.5) / 0.5; // Fade in after 50% progress
    stars.forEach(star => {
        star.material.opacity = 0.9 * spaceOpacity;
    });
    nebula.forEach(neb => {
        neb.children.forEach(child => {
            child.material.opacity = (0.03 + Math.random() * 0.02) * spaceOpacity;
        });
    });
}

function init() {
    // Scene setup with deep space background
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000511); // Deep space blue-black
    
    // Camera setup - start very close to Mars
    camera = new THREE.PerspectiveCamera(35, canvas.value.clientWidth / canvas.value.clientHeight, 0.1, 1000);
    camera.position.set(0, 3, cameraStartDistance);
    camera.lookAt(0, 0, 0);
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true });
    renderer.setSize(canvas.value.clientWidth, canvas.value.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Add starfield (initially hidden)
    const starField = createStarfield();
    scene.add(starField);
    stars.push(starField);
    
    // Add nebula (initially hidden)
    const nebulaGroup = createNebula();
    scene.add(nebulaGroup);
    nebula.push(nebulaGroup);
    
    // Enhanced lighting for space scene
    const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.4);
    scene.add(ambientLight);
    
    // Main sun light
    const sunLight = new THREE.DirectionalLight(0xfff8dc, 3.0);
    sunLight.position.set(8, 4, 6);
    sunLight.castShadow = true;
    sunLight.shadow.camera.near = 0.1;
    sunLight.shadow.camera.far = 50;
    sunLight.shadow.camera.left = -5;
    sunLight.shadow.camera.right = 5;
    sunLight.shadow.camera.top = 5;
    sunLight.shadow.camera.bottom = -5;
    sunLight.shadow.mapSize.width = 4096;
    sunLight.shadow.mapSize.height = 4096;
    sunLight.shadow.bias = -0.001;
    sunLight.shadow.normalBias = 0.005;
    sunLight.shadow.radius = 10;
    scene.add(sunLight);
    
    // Blue rim light for space effect
    const rimLight = new THREE.PointLight(0x4466ff, 2.0, 30);
    rimLight.position.set(-10, 3, -8);
    scene.add(rimLight);
    
    // Orange warm light
    const warmLight = new THREE.PointLight(0xff6644, 1.5, 25);
    warmLight.position.set(4, -3, 5);
    scene.add(warmLight);
    
    // Create Mars group - start positioned down
    marsGroup = new THREE.Group();
    marsGroup.position.y = marsStartY;
    
    // Enhanced Mars material
    const marsMaterial = new THREE.MeshStandardMaterial({ 
        map: mars_normal,
        bumpMap: mars_albedo,
        roughness: 0.8,
        metalness: 0.1,
        normalScale: new THREE.Vector2(0.8, 0.8),
        bumpScale: 0.1
    });
    
    const marsSphere = new THREE.Mesh(createMarsphere(15, 128, 64), marsMaterial);
    marsSphere.position.set(0, 0, 0);
    marsSphere.castShadow = true;
    marsSphere.receiveShadow = true;
    marsGroup.add(marsSphere);
    shapes.push(marsSphere);
    
    scene.add(marsGroup);
    
    // Initialize camera and Mars positions
    updateCameraAndMars();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Handle mouse wheel for zoom - use passive: false to allow preventDefault
    canvas.value.addEventListener('wheel', onMouseWheel, { passive: false });
    
    // Also listen for wheel events on the document to catch reverse scrolling
    document.addEventListener('wheel', onDocumentWheel, { passive: false });
    
    // Start animation
    animate();
}

function onWindowResize() {
    camera.aspect = canvas.value.clientWidth / canvas.value.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.value.clientWidth, canvas.value.clientHeight);
}

function onMouseWheel(event) {
    // Always handle zoom interaction, but allow page scrolling when appropriate
    const delta = event.deltaY > 0 ? 1 : -1;
    const prevZoomProgress = zoomProgress;
    
    // Update zoom progress
    zoomProgress += delta * zoomSpeed;
    zoomProgress = Math.max(minZoomProgress, Math.min(maxZoomProgress, zoomProgress));
    
    // Check if we're in the zoom interaction range
    const isInZoomRange = zoomProgress < maxZoomProgress;
    
    // If we're in zoom range or going back into it, handle the zoom
    if (isInZoomRange || (prevZoomProgress >= maxZoomProgress && delta < 0)) {
        event.preventDefault();
        event.stopPropagation();
        
        // Update canvas visibility based on zoom progress
        updateCanvasVisibility();
    }
    
    // Update zoom complete state
    const wasZoomComplete = isZoomComplete;
    isZoomComplete = zoomProgress >= maxZoomProgress;
    
    // Log state changes
    if (wasZoomComplete !== isZoomComplete) {
        if (isZoomComplete) {
            console.log('Zoom complete! Page scrolling enabled.');
        } else {
            console.log('Back in zoom mode! Canvas interaction enabled.');
        }
    }
    
    console.log('Zoom progress:', zoomProgress.toFixed(2));
}

function updateCanvasVisibility() {
    if (!canvas.value) return;
    
    // Calculate opacity based on zoom progress
    // Fade out canvas as we approach max zoom, but keep it functional
    const fadeThreshold = 0.85; // Start fading at 85% zoom
    let opacity = 1;
    
    if (zoomProgress >= fadeThreshold) {
        const fadeProgress = (zoomProgress - fadeThreshold) / (1 - fadeThreshold);
        opacity = 0.2; // Fade to 30% opacity, not completely transparent
        const contentContainer = document.getElementById('content-container');
        contentContainer.style.zIndex = 5000;
    }
    
    canvas.value.style.opacity = opacity.toString();
    // Manage pointer events based on zoom state
    if (zoomProgress >= maxZoomProgress) {
        // At max zoom, reduce pointer events but don't disable completely
        canvas.value.style.pointerEvents = 'none';
    } else {
        // In zoom range, enable pointer events
        canvas.value.style.pointerEvents = 'auto';
    }
}

function animate() {
    animationId = requestAnimationFrame(animate);
    
    // Update camera and Mars positions
    updateCameraAndMars();
    
    // Rotate Mars
    if (marsGroup) {
        shapes.forEach((shape) => {
            shape.rotation.y += 0.003;
        });
        
        if (atmosphereGroup) {
            atmosphereGroup.rotation.y += 0.001;
        }
    }
    
    // Animate starfield rotation
    stars.forEach(star => {
        star.rotation.y += 0.0002;
    });
    
    // Animate nebula
    nebula.forEach(neb => {
        neb.rotation.x += 0.0001;
        neb.rotation.y += 0.00015;
    });
    
    renderer.render(scene, camera);
}

function onDocumentWheel(event) {
    // Handle reverse scrolling when canvas is not interactive
    if (isZoomComplete && event.deltaY < 0) {
        // User is scrolling up while at max zoom - re-enable Mars interaction
        event.preventDefault();
        event.stopPropagation();
        
        const delta = event.deltaY > 0 ? 1 : -1;
        zoomProgress += delta * zoomSpeed;
        zoomProgress = Math.max(minZoomProgress, Math.min(maxZoomProgress, zoomProgress));
        
        // Re-enable canvas interaction
        updateCanvasVisibility();
        
        // Update zoom complete state
        isZoomComplete = zoomProgress >= maxZoomProgress;
        
        if (!isZoomComplete) {
            console.log('Back in zoom mode! Canvas interaction enabled.');
        }
    }
}

function cleanup() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    if (renderer) {
        renderer.dispose();
    }
    
    scene.traverse((object) => {
        if (object.geometry) {
            object.geometry.dispose();
        }
        if (object.material) {
            if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
            } else {
                object.material.dispose();
            }
        }
    });
    
    window.removeEventListener('resize', onWindowResize);
    if (canvas.value) {
        canvas.value.removeEventListener('wheel', onMouseWheel);
    }
    document.removeEventListener('wheel', onDocumentWheel);
}

onMounted(() => {
    init();
});

onBeforeUnmount(() => {
    cleanup();
});
</script>

<style lang="scss" scoped>
canvas {
    display: block;
    cursor: grab;
    height: 100vh;
    width: 100vw;
    background: radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    transition: opacity 0.3s ease-out;
}

canvas:active {
    cursor: grabbing;
}

/* Visual indicator when canvas is faded but still present */
canvas[style*="opacity: 0.5"] {
    cursor: default;
}
</style>