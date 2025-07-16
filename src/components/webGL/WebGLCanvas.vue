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

const mars_albedo = new TextureLoader().load( new URL('@/assets/mars_albedo.png', import.meta.url).href, (t) => {t.colorSpace = THREE.SRGBColorSpace;})
const mars_normal = new TextureLoader().load( new URL('@/assets/texture.jpg', import.meta.url).href)

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
        opacity: 0.8
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

function init() {
    // Scene setup with deep space background
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000511); // Deep space blue-black
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(35, canvas.value.clientWidth / canvas.value.clientHeight, 0.1, 1000);
    camera.position.set(0, 3, 5);
    camera.lookAt(0, 0, 0);
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true });
    renderer.setSize(canvas.value.clientWidth, canvas.value.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Add starfield
    const starField = createStarfield();
    scene.add(starField);
    stars.push(starField);
    
    // Add nebula
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
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);
    
    // Blue rim light for space effect
    const rimLight = new THREE.PointLight(0x4466ff, 2.0, 30);
    rimLight.position.set(-10, 3, -8);
    scene.add(rimLight);
    
    // Orange warm light
    const warmLight = new THREE.PointLight(0xff6644, 1.5, 25);
    warmLight.position.set(4, -3, 5);
    scene.add(warmLight);
    
    // Create Mars group
    marsGroup = new THREE.Group();
    
    // Enhanced Mars material with rougher surface
    const marsMaterial = new THREE.MeshStandardMaterial({ 
        map: mars_normal,
        // normalMap: mars_albedo,
        roughness: 5,
        metalness: 1,
        normalScale: new THREE.Vector2(0.8, 0.8),
        bumpScale: 0.1
    });
    
    const marsSphere = new THREE.Mesh(createMarsphere(10, 128, 64), marsMaterial);
    marsSphere.position.set(0, 0, 0);
    marsSphere.castShadow = true;
    marsSphere.receiveShadow = true;
    marsGroup.add(marsSphere);
    shapes.push(marsSphere);
    
    
    scene.add(marsGroup);
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Handle mouse wheel for zoom
    // window.addEventListener('wheel', onMouseWheel, { passive: false });
    
    // Start animation
    animate();
}

function onWindowResize() {
    camera.aspect = canvas.value.clientWidth / canvas.value.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.value.clientWidth, canvas.value.clientHeight);
}

function onMouseWheel(event) {
    event.preventDefault();
    
    const zoomSpeed = 0.002;
    const minDistance = 2;
    const maxDistance = 15;
    
    const currentDistance = camera.position.length();
    let newDistance = currentDistance + (event.deltaY * zoomSpeed);
    
    // Clamp the distance
    newDistance = Math.max(minDistance, Math.min(maxDistance, newDistance));
    
    // Update camera position maintaining the same angle
    const direction = camera.position.clone().normalize();
    camera.position.copy(direction.multiplyScalar(newDistance));
    camera.lookAt(0, 0, 0);
}

function animate() {
    animationId = requestAnimationFrame(animate);
    
    const time = Date.now() * 0.0005;
    
    // Rotate Mars and its atmosphere
    if (marsGroup) {
        shapes.forEach((shape) => {
            shape.rotation.y += 0.003; // Slow Mars rotation
        });
        
        // Rotate atmosphere slightly differently
        if (atmosphereGroup) {
            atmosphereGroup.rotation.y += 0.001;
        }
    }
    
    // Gentle camera orbit
    camera.position.x = Math.cos(time * 0.3) * camera.position.length();
    camera.position.z = Math.sin(time * 0.3) * camera.position.length();
    camera.lookAt(0, 0, 0);
    
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

function cleanup() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    if (renderer) {
        renderer.dispose();
    }
    
    // Clean up geometries and materials
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
    window.removeEventListener('wheel', onMouseWheel);
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
}

canvas:active {
    cursor: grabbing;
}
</style>