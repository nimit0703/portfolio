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

const canvas = ref(null);
let scene, camera, renderer, animationId;
let shapes = [];
let stars = [];
let nebula = [];
let marsGroup;
let atmosphereGroup;

// Enhanced zoom system
const zoomProgress = ref(0);
const zoomSpeed = 0.06;
const minZoomProgress = 0;
const maxZoomProgress = 1;

// Camera and Mars positions based on zoom progress
const cameraStartDistance = 20;
const cameraEndDistance = 35;
const marsStartY = -20;
const marsEndY = 0;

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

// Texture loading with promise-based approach
async function loadTextures() {
    const loader = new THREE.TextureLoader();
    
    const loadTexture = (url) => {
        return new Promise((resolve, reject) => {
            loader.load(
                url,
                (texture) => {
                    // Configure texture immediately
                    texture.colorSpace = THREE.SRGBColorSpace;
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                    texture.generateMipmaps = true;
                    texture.minFilter = THREE.LinearMipmapLinearFilter;
                    texture.magFilter = THREE.LinearFilter;
                    resolve(texture);
                },
                undefined,
                reject
            );
        });
    };

    try {
        const [albedoTexture, normalTexture] = await Promise.all([
            loadTexture(new URL('@/assets/mars_albedo.png', import.meta.url).href),
            loadTexture(new URL('@/assets/texture.jpg', import.meta.url).href)
        ]);
        
        return { albedo: albedoTexture, normal: normalTexture };
    } catch (error) {
        console.warn('Failed to load Mars textures, using fallback:', error);
        return null;
    }
}

// Create starfield
function createStarfield() {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount; i++) {
        const radius = 200 + Math.random() * 300;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
        
        const intensity = 0.5 + Math.random() * 0.5;
        colors[i * 3] = intensity;
        colors[i * 3 + 1] = intensity;
        colors[i * 3 + 2] = intensity + Math.random() * 0.3;
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
    
    return new THREE.Points(starGeometry, starMaterial);
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

// Create Mars with proper material
function createMars(textures) {
    const geometry = new THREE.SphereGeometry(15, 128, 64);
    
    let material;
    if (textures) {
        // Enhanced material with textures
        material = new THREE.MeshStandardMaterial({
            map: textures.normal,
            bumpMap: textures.albedo,
            roughness: 0.8,
            metalness: 0.1,
            normalScale: new THREE.Vector2(0.8, 0.8),
            bumpScale: 0.1,
            transparent: true,
            opacity: 0
        });
    } else {
        // Fallback material with Mars-like appearance
        material = new THREE.MeshStandardMaterial({
            color: 0xcd5c3c, // Mars red-brown
            roughness: 0.9,
            metalness: 0.05,
            bumpScale: 0.02,
            transparent: true,
            opacity: 0
        });
    }
    
    const marsSphere = new THREE.Mesh(geometry, material);
    marsSphere.position.set(0, 0, 0);
    marsSphere.castShadow = true;
    marsSphere.receiveShadow = true;
    
    // marsSphere.scale.set(0.5, 0.5, 0.5);

    return marsSphere;
}

function updateCameraAndMars() {
    const easeProgress = zoomProgress.value * zoomProgress.value * (3 - 2 * zoomProgress.value);
    
    if (marsGroup) {
        const currentY = THREE.MathUtils.lerp(marsStartY, marsEndY, easeProgress);
        marsGroup.position.y = currentY;
    }
    
    const zoomPhase = Math.max(0, easeProgress - 0.3) / 0.7;
    const currentDistance = THREE.MathUtils.lerp(cameraStartDistance, cameraEndDistance, zoomPhase);
    const direction = camera.position.clone().normalize();
    camera.position.copy(direction.multiplyScalar(currentDistance));
    camera.lookAt(-5, -2, 12);
    
    const spaceOpacity = Math.max(0, easeProgress - 0.5) / 0.5;
    stars.forEach(star => {
        star.material.opacity = 0.9 * (easeProgress + 0.3);
    });
    nebula.forEach(neb => {
        neb.children.forEach(child => {
            child.material.opacity = (0.03 + Math.random() * 0.02) * spaceOpacity;
        });
    });
}

async function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000511);
    
    // Camera setup
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
    
    const rimLight = new THREE.PointLight(0x4466ff, 2.0, 30);
    rimLight.position.set(-10, 3, -8);
    scene.add(rimLight);
    
    const warmLight = new THREE.PointLight(0xff6644, 1.5, 25);
    warmLight.position.set(4, -3, 5);
    scene.add(warmLight);
    
    // Load textures and create Mars
    const textures = await loadTextures();
    
    // Create Mars group
    marsGroup = new THREE.Group();
    marsGroup.position.y = marsStartY;
    
    const marsSphere = createMars(textures);
    marsGroup.add(marsSphere);
    shapes.push(marsSphere);
    scene.add(marsGroup);
    
    // Initialize positions
    updateCameraAndMars();
    
    // Event listeners
    window.addEventListener('resize', onWindowResize);
    canvas.value.addEventListener('wheel', onMouseWheel, { passive: false });
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
    const delta = event.deltaY > 0 ? 1 : -1;
    const prevZoomProgress = zoomProgress.value;
    
    zoomProgress.value += delta * zoomSpeed;
    zoomProgress.value = Math.max(minZoomProgress, Math.min(maxZoomProgress, zoomProgress.value));
    
    const isInZoomRange = zoomProgress.value < maxZoomProgress;
    
    if (isInZoomRange || (prevZoomProgress >= maxZoomProgress && delta < 0)) {
        event.preventDefault();
        event.stopPropagation();
        updateCanvasVisibility();
    }
    
    const wasZoomComplete = isZoomComplete.value;
    isZoomComplete.value = zoomProgress.value >= maxZoomProgress;
}

function updateCanvasVisibility() {
    if (!canvas.value) return;
    
    const fadeThreshold = 0.85;
    let opacity = 1;
    
    if (zoomProgress.value >= fadeThreshold) {
        const fadeProgress = (zoomProgress.value - fadeThreshold) / (1 - fadeThreshold);
        opacity = 0.2;
        const contentContainer = document.getElementById('content-container');
        const scrollIndicator = document.getElementById('scroll-indicator');

        if (contentContainer) {
            scrollIndicator.style.display = 'none';
            contentContainer.style.zIndex = 5000;
        }
    }
    
    canvas.value.style.opacity = opacity.toString();
    
    if (zoomProgress.value >= maxZoomProgress) {
        canvas.value.style.pointerEvents = 'none';
    } else {
        canvas.value.style.pointerEvents = 'auto';
    }
}

function animate() {
    animationId = requestAnimationFrame(animate);
    
    updateCameraAndMars();
    
    if (marsGroup) {
        shapes.forEach((shape) => {
            shape.rotation.y += 0.003;

            if (shape.material.opacity < 1) {
                shape.material.opacity += 0.009;
            }
            // if (shape.scale.x < 1) {
            //     const newScale = Math.min(1, shape.scale.x + 0.009);
            //     shape.scale.set(newScale, newScale, newScale);
            // }
        });
        
        if (atmosphereGroup) {
            atmosphereGroup.rotation.y += 0.001;
        }
    }
    
    stars.forEach(star => {
        star.rotation.y += 0.0002;
    });
    
    nebula.forEach(neb => {
        neb.rotation.x += 0.0001;
        neb.rotation.y += 0.00015;
    });
    
    renderer.render(scene, camera);
}

function onDocumentWheel(event) {
    if (isZoomComplete.value && event.deltaY < 0) {
        event.preventDefault();
        event.stopPropagation();
        
        const delta = event.deltaY > 0 ? 1 : -1;
        zoomProgress.value += delta * zoomSpeed;
        zoomProgress.value = Math.max(minZoomProgress, Math.min(maxZoomProgress, zoomProgress.value));
        
        updateCanvasVisibility();
        isZoomComplete.value = zoomProgress.value >= maxZoomProgress;
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
    background: transparent;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    transition: opacity 0.3s ease-out;
}

canvas:active {
    cursor: grabbing;
}

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

@media (max-width: 768px) {
    .progress-container {
        right: 20px;
    }
}

@media only screen and (max-width: 1024px) {
    .progress-container {
        display: none;
    }
}

canvas[style*="opacity: 0.2"] {
    cursor: default;
}
</style>