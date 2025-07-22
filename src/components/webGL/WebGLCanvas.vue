<template>
    <div class="mars-container">
        <!-- Canvas for 3D scene -->
        <canvas ref="canvas" class="w-full h-full"></canvas>
        
        
        <!-- Animated scroll indicator -->
        <div class="scroll-indicator" id="scroll-indicator">
            <div class="scroll-text">
                <span class="scroll-hint">SCROLL TO EXPLORE</span>
                <div class="scroll-subtext">Navigate through My atmosphere</div>
            </div>
            
            <div class="scroll-animation">
                <div class="scroll-wheel">
                    <div class="scroll-dot"></div>
                </div>
                <div class="scroll-arrows">
                    <div class="scroll-arrow" v-for="i in 3" :key="i"></div>
                </div>
            </div>
        </div>
        
        <!-- Progress bar -->
        <div class="progress-container">
            <div class="progress-bar">
                <div class="progress-fill" :style="{ width: (zoomProgress * 100) + '%' }"></div>
            </div>
            <div class="progress-labels">
                <span>SURFACE</span>
                <span>ORBIT</span>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, computed } from 'vue';
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
const zoomProgress = ref(0); // 0 = closest (top of Mars), 1 = fully zoomed out
const zoomSpeed = 0.06;
const minZoomProgress = 0;
const maxZoomProgress = 1;

// Camera and Mars positions based on zoom progress
const cameraStartDistance = 20; // Close enough to see Mars surface
const cameraEndDistance = 35; // Far enough to see full Mars
const marsStartY = -20; // Mars positioned way down (bottom of screen)
const marsEndY = 0; // Mars centered

const isZoomComplete = ref(false);

// UI reactive properties
const phases = ['Surface', 'Atmosphere', 'Low Orbit', 'High Orbit'];
const currentPhase = computed(() => {
    const progress = zoomProgress.value;
    if (progress < 0.25) return 0;
    if (progress < 0.5) return 1;
    if (progress < 0.75) return 2;
    return 3;
});

const overlayOpacity = computed(() => {
    return Math.max(0.3, 1 - zoomProgress.value * 0.7);
});

// Helper functions for UI
function formatDistance(progress) {
    const distance = 50 + (progress * 25000);
    return distance < 1000 ? Math.round(distance) : Math.round(distance / 1000) + 'K';
}

function formatAltitude(progress) {
    const altitude = Math.round(progress * 50000);
    return altitude.toLocaleString();
}

function getStatus(progress) {
    if (progress < 0.3) return 'APPROACHING';
    if (progress < 0.7) return 'ORBITING';
    return 'DEPARTING';
}

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
    const easeProgress = zoomProgress.value * zoomProgress.value * (3 - 2 * zoomProgress.value); // smoothstep
    
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
        star.material.opacity = 0.9 * (easeProgress + 0.3);
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
    const prevZoomProgress = zoomProgress.value;
    
    // Update zoom progress
    zoomProgress.value += delta * zoomSpeed;
    zoomProgress.value = Math.max(minZoomProgress, Math.min(maxZoomProgress, zoomProgress.value));
    
    // Check if we're in the zoom interaction range
    const isInZoomRange = zoomProgress.value < maxZoomProgress;
    
    // If we're in zoom range or going back into it, handle the zoom
    if (isInZoomRange || (prevZoomProgress >= maxZoomProgress && delta < 0)) {
        event.preventDefault();
        event.stopPropagation();
        
        // Update canvas visibility based on zoom progress
        updateCanvasVisibility();
    }
    
    // Update zoom complete state
    const wasZoomComplete = isZoomComplete.value;
    isZoomComplete.value = zoomProgress.value >= maxZoomProgress;
}

function updateCanvasVisibility() {
    if (!canvas.value) return;
    
    // Calculate opacity based on zoom progress
    // Fade out canvas as we approach max zoom, but keep it functional
    const fadeThreshold = 0.85; // Start fading at 85% zoom
    let opacity = 1;
    
    if (zoomProgress.value >= fadeThreshold) {
        const fadeProgress = (zoomProgress.value - fadeThreshold) / (1 - fadeThreshold);
        opacity = 0.2; // Fade to 20% opacity, not completely transparent
        const contentContainer = document.getElementById('content-container');
        const scrollIindicator = document.getElementById('scroll-indicator');

        if (contentContainer) {
            scrollIindicator.style.display ='none'
            contentContainer.style.zIndex = 5000;
        }
    }
    
    canvas.value.style.opacity = opacity.toString();
    // Manage pointer events based on zoom state
    if (zoomProgress.value >= maxZoomProgress) {
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
    if (isZoomComplete.value && event.deltaY < 0) {
        // User is scrolling up while at max zoom - re-enable Mars interaction
        event.preventDefault();
        event.stopPropagation();
        
        const delta = event.deltaY > 0 ? 1 : -1;
        zoomProgress.value += delta * zoomSpeed;
        zoomProgress.value = Math.max(minZoomProgress, Math.min(maxZoomProgress, zoomProgress.value));
        
        // Re-enable canvas interaction
        updateCanvasVisibility();
        
        // Update zoom complete state
        isZoomComplete.value = zoomProgress.value >= maxZoomProgress;
        
        if (!isZoomComplete.value) {
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
// Import font for better typography
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

.mars-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

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

// Left overlay panel
.left-overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 400px;
    height: 100vh;
    background: linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(22, 33, 62, 0.8) 100%);
    backdrop-filter: blur(10px);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 2000;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 40px 30px;
    transition: opacity 0.5s ease;
}

// Mission panel
.mission-panel {
    .mission-header {
        margin-bottom: 60px;
        
        .mission-title {
            font-family: 'Orbitron', monospace;
            font-size: 4rem;
            font-weight: 900;
            color: #ff6b47;
            margin: 0;
            letter-spacing: 8px;
            text-shadow: 0 0 20px rgba(255, 107, 71, 0.5);
        }
        
        .mission-subtitle {
            font-family: 'Orbitron', monospace;
            font-size: 1.2rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.8);
            margin: 10px 0 0 0;
            letter-spacing: 6px;
        }
    }
    
    .mission-stats {
        .stat-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            padding: 15px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            
            .stat-label {
                font-family: 'Orbitron', monospace;
                font-size: 0.9rem;
                color: rgba(255, 255, 255, 0.6);
                letter-spacing: 2px;
            }
            
            .stat-value {
                font-family: 'Orbitron', monospace;
                font-size: 1.1rem;
                font-weight: 700;
                color: #4ecdc4;
                text-shadow: 0 0 10px rgba(78, 205, 196, 0.3);
            }
        }
    }
}

// Navigation dots
.nav-dots {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 40px 0;
    
    .nav-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transition: all 0.3s ease;
        
        &.active {
            background: #ff6b47;
            transform: scale(1.5);
            box-shadow: 0 0 15px rgba(255, 107, 71, 0.6);
        }
    }
}

// Animated scroll indicator
.scroll-indicator {
    position: fixed;
    bottom: 250px;
    left: 20%;
    transform: translateX(-50%);
    z-index: 3000;
    text-align: center;
    animation: pulse 2s infinite;
    
    .scroll-text {
        margin-bottom: 20px;
        
        .scroll-hint {
            font-family: 'Orbitron', monospace;
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.9);
            letter-spacing: 3px;
            display: block;
        }
        
        .scroll-subtext {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.5);
            margin-top: 5px;
            letter-spacing: 1px;
        }
    }
    
    .scroll-animation {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        
        .scroll-wheel {
            width: 30px;
            height: 50px;
            border: 2px solid rgba(255, 255, 255, 0.6);
            border-radius: 25px;
            position: relative;
            
            .scroll-dot {
                width: 6px;
                height: 6px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                animation: scroll-bounce 2s infinite;
            }
        }
        
        .scroll-arrows {
            display: flex;
            flex-direction: column;
            gap: 3px;
            
            .scroll-arrow {
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 8px solid rgba(255, 255, 255, 0.6);
                animation: arrow-float 2s infinite;
                
                &:nth-child(2) {
                    animation-delay: 0.3s;
                }
                
                &:nth-child(3) {
                    animation-delay: 0.6s;
                }
            }
        }
    }
}

// Progress bar
.progress-container {
    position: fixed;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2000;
    
    .progress-bar {
        width: 4px;
        height: 200px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
        overflow: hidden;
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(to top, #ff6b47, #4ecdc4);
            border-radius: 2px;
            transition: width 0.3s ease;
            box-shadow: 0 0 10px rgba(78, 205, 196, 0.5);
        }
    }
    
    .progress-labels {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 200px;
        margin-left: 15px;
        font-family: 'Orbitron', monospace;
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.6);
        letter-spacing: 1px;
        
        span:last-child {
            align-self: flex-end;
        }
    }
}

// Social links
.social-links {
    position: fixed;
    left: 30px;
    bottom: 40px;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    .social-link {
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255, 255, 255, 0.7);
        text-decoration: none;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        
        &:hover {
            background: rgba(255, 107, 71, 0.2);
            border-color: #ff6b47;
            color: #ff6b47;
            transform: scale(1.1);
            box-shadow: 0 0 20px rgba(255, 107, 71, 0.3);
        }
        
        i {
            font-size: 16px;
        }
    }
}

// Animations
@keyframes pulse {
    0%, 100% { opacity: 0.7; transform: translateX(-50%) scale(1); }
    50% { opacity: 1; transform: translateX(-50%) scale(1.05); }
}

@keyframes scroll-bounce {
    0%, 100% { top: 10px; opacity: 1; }
    50% { top: 30px; opacity: 0.3; }
}

@keyframes arrow-float {
    0%, 100% { opacity: 0.3; transform: translateY(0); }
    50% { opacity: 1; transform: translateY(5px); }
}

// Responsive design
@media (max-width: 768px) {
    .left-overlay {
        width: 100%;
        background: rgba(26, 26, 46, 0.95);
        padding: 20px;
    }
    
    .mission-panel .mission-header .mission-title {
        font-size: 2.5rem;
        letter-spacing: 4px;
    }
    
    .progress-container {
        right: 20px;
    }
    
    .social-links {
        left: 20px;
        bottom: 20px;
        flex-direction: row;
    }
}

// Visual indicator when canvas is faded but still present
canvas[style*="opacity: 0.2"] {
    cursor: default;
}

@media only screen and (max-width: 1024px) {
  .progress-container {
    display: none;
  }
}
</style>