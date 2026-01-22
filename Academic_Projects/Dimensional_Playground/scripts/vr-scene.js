// Game state
let score = 0;
let partyModeActive = false;
let gravityEnabled = true;
let physicsEnabled = false;
let proximityEnabled = false;
let grabModeEnabled = false;
let originalAnimations = new Map();
let originalPositions = new Map();

// Combo system
let comboCount = 0;
let comboTimer = null;
const COMBO_TIMEOUT = 2000; // 2 seconds to maintain combo
let lastClickTime = 0;

// Collectibles
let orbsCollected = 0;
let totalOrbs = 5;

// Grab and throw system
let grabbedObject = null;
let grabOffset = { x: 0, y: 0, z: 0 };
let velocityHistory = [];
let lastMousePos = { x: 0, y: 0 };
let lastMouseTime = 0;
const GRAVITY = 9.8;
const GROUND_Y = 0.3;
const BOUNCE_DAMPING = 0.6;
const FRICTION = 0.98;

// Keyboard control for grabbed objects
const grabKeys = {
    left: false,
    right: false,
    up: false,
    down: false,
    forward: false,
    backward: false
};
let grabVelocity = { x: 0, y: 0, z: 0 };
const GRAB_ACCELERATION = 0.02;
const GRAB_MAX_SPEED = 0.3;
const GRAB_DECELERATION = 0.92;

// Active physics objects (objects that have been thrown)
let physicsObjects = new Map();

// Store initial state for reset
const initialState = {
    positions: new Map(),
    animations: new Map(),
    initialized: false
};

// Achievements
const achievements = {
    firstClick: { unlocked: false, name: 'First Contact', description: 'Click your first object' },
    combo5: { unlocked: false, name: 'Combo Starter', description: 'Get a 5x combo' },
    combo10: { unlocked: false, name: 'Combo Master', description: 'Get a 10x combo' },
    allOrbs: { unlocked: false, name: 'Collector', description: 'Collect all orbs' },
    score100: { unlocked: false, name: 'Century', description: 'Reach 100 points' },
    score500: { unlocked: false, name: 'High Scorer', description: 'Reach 500 points' }
};

// Store initial object states
function storeInitialState() {
    if (initialState.initialized) return;

    document.querySelectorAll('.clickable').forEach((obj, index) => {
        const id = obj.id || `clickable-${index}`;
        initialState.positions.set(id, { ...obj.getAttribute('position') });

        // Store all animation attributes
        const anims = {};
        Array.from(obj.attributes).forEach(attr => {
            if (attr.name.startsWith('animation')) {
                anims[attr.name] = attr.value;
            }
        });
        initialState.animations.set(id, anims);
    });

    initialState.initialized = true;
}

// Reset scene to initial state
function resetScene() {
    // Reset game state
    score = 0;
    partyModeActive = false;
    gravityEnabled = true;
    physicsEnabled = false;
    comboCount = 0;
    if (comboTimer) clearTimeout(comboTimer);

    // Update UI
    document.getElementById('score-display').textContent = 'Score: 0';
    document.getElementById('combo-display').classList.remove('visible');
    document.getElementById('combo-display').classList.add('hidden');

    // Reset button states
    document.getElementById('party-mode').classList.remove('active');
    document.getElementById('party-mode').innerHTML = '<span class="icon">&#127881;</span> Party Mode';
    document.getElementById('gravity-toggle').classList.remove('active');
    document.getElementById('gravity-toggle').innerHTML = '<span class="icon">&#127758;</span> Gravity';
    document.getElementById('physics-drop').classList.remove('active');
    document.getElementById('physics-drop').innerHTML = '<span class="icon">&#11015;</span> Drop All';

    // Reset sky
    const sky = document.querySelector('a-sky');
    sky.setAttribute('color', '#050510');
    sky.setAttribute('animation', {
        property: 'color',
        to: '#0a0a20',
        dur: 20000,
        dir: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
    });

    // Reset clickable objects
    document.querySelectorAll('.clickable').forEach((obj, index) => {
        const id = obj.id || `clickable-${index}`;

        // Remove any current animations
        Array.from(obj.attributes).forEach(attr => {
            if (attr.name.startsWith('animation')) {
                obj.removeAttribute(attr.name);
            }
        });

        // Restore position
        if (initialState.positions.has(id)) {
            obj.setAttribute('position', initialState.positions.get(id));
        }

        // Restore original animations
        if (initialState.animations.has(id)) {
            const anims = initialState.animations.get(id);
            Object.entries(anims).forEach(([name, value]) => {
                obj.setAttribute(name, value);
            });
        }

        // Reset material
        obj.setAttribute('material', 'emissiveIntensity', 0);
        obj.classList.remove('proximity-active');
    });

    // Remove any spawned objects (those without stored initial state)
    document.querySelectorAll('.clickable').forEach((obj, index) => {
        const id = obj.id || `clickable-${index}`;
        if (!initialState.positions.has(id) && obj.parentNode) {
            obj.parentNode.removeChild(obj);
        }
    });

    playSound(500, 0.2, 'sine');
    playSound(700, 0.15, 'sine');
}

// Audio context for sound effects
let audioContext;

function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}

function playSound(frequency, duration, type = 'sine', volume = 0.25) {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    filter.type = 'lowpass';
    filter.frequency.value = 2000;

    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

function playChord(baseFreq, duration) {
    playSound(baseFreq, duration, 'sine', 0.15);
    playSound(baseFreq * 1.25, duration, 'sine', 0.1);
    playSound(baseFreq * 1.5, duration, 'sine', 0.08);
}

function playComboSound(comboLevel) {
    // Higher pitched sounds for higher combos
    const baseFreq = 400 + (comboLevel * 50);
    playSound(baseFreq, 0.15, 'sine', 0.2);
    setTimeout(() => playSound(baseFreq * 1.25, 0.1, 'sine', 0.15), 50);
}

function playCollectSound() {
    // Magical collect sound
    playSound(880, 0.1, 'sine', 0.2);
    setTimeout(() => playSound(1100, 0.1, 'sine', 0.15), 50);
    setTimeout(() => playSound(1320, 0.15, 'sine', 0.1), 100);
}

function playAchievementSound() {
    // Fanfare for achievements
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((note, i) => {
        setTimeout(() => playSound(note, 0.3, 'sine', 0.15), i * 100);
    });
}

// Grab and throw physics functions
function grabObject(obj, mouseX, mouseY) {
    if (!grabModeEnabled || grabbedObject) return;

    grabbedObject = obj;
    velocityHistory = [];
    grabVelocity = { x: 0, y: 0, z: 0 };
    lastMousePos = { x: mouseX, y: mouseY };
    lastMouseTime = performance.now();

    // Stop any physics on this object
    if (physicsObjects.has(obj)) {
        physicsObjects.delete(obj);
    }

    // Remove animations while grabbed
    const attrs = obj.attributes;
    for (let i = attrs.length - 1; i >= 0; i--) {
        const attrName = attrs[i].name;
        if (attrName.startsWith('animation')) {
            obj.removeAttribute(attrName);
        }
    }

    // Visual feedback
    obj.setAttribute('material', 'emissive', obj.getAttribute('color'));
    obj.setAttribute('material', 'emissiveIntensity', 0.5);

    playSound(400, 0.1, 'sine', 0.2);

    // Start keyboard control loop for grabbed object
    requestAnimationFrame(updateGrabbedObjectMovement);
}

// Update grabbed object position based on keyboard input
function updateGrabbedObjectMovement() {
    if (!grabbedObject || !grabModeEnabled) return;

    // Apply acceleration based on keys pressed
    if (grabKeys.left) grabVelocity.x -= GRAB_ACCELERATION;
    if (grabKeys.right) grabVelocity.x += GRAB_ACCELERATION;
    if (grabKeys.up) grabVelocity.y += GRAB_ACCELERATION;
    if (grabKeys.down) grabVelocity.y -= GRAB_ACCELERATION;
    if (grabKeys.forward) grabVelocity.z -= GRAB_ACCELERATION;
    if (grabKeys.backward) grabVelocity.z += GRAB_ACCELERATION;

    // Clamp velocity
    grabVelocity.x = Math.max(-GRAB_MAX_SPEED, Math.min(GRAB_MAX_SPEED, grabVelocity.x));
    grabVelocity.y = Math.max(-GRAB_MAX_SPEED, Math.min(GRAB_MAX_SPEED, grabVelocity.y));
    grabVelocity.z = Math.max(-GRAB_MAX_SPEED, Math.min(GRAB_MAX_SPEED, grabVelocity.z));

    // Apply deceleration when no keys pressed
    if (!grabKeys.left && !grabKeys.right) grabVelocity.x *= GRAB_DECELERATION;
    if (!grabKeys.up && !grabKeys.down) grabVelocity.y *= GRAB_DECELERATION;
    if (!grabKeys.forward && !grabKeys.backward) grabVelocity.z *= GRAB_DECELERATION;

    // Update position
    const pos = grabbedObject.getAttribute('position');
    grabbedObject.setAttribute('position', {
        x: pos.x + grabVelocity.x,
        y: Math.max(GROUND_Y + 0.2, pos.y + grabVelocity.y),
        z: pos.z + grabVelocity.z
    });

    // Store velocity for throwing
    velocityHistory.push({
        vx: grabVelocity.x * 50,
        vy: grabVelocity.y * 50,
        vz: grabVelocity.z * 50,
        time: performance.now()
    });
    if (velocityHistory.length > 10) velocityHistory.shift();

    requestAnimationFrame(updateGrabbedObjectMovement);
}

function dragObject(mouseX, mouseY) {
    if (!grabbedObject) return;

    const now = performance.now();
    const deltaTime = (now - lastMouseTime) / 1000;

    // Calculate velocity from mouse movement
    if (deltaTime > 0) {
        const vx = (mouseX - lastMousePos.x) / deltaTime;
        const vy = (mouseY - lastMousePos.y) / deltaTime;

        // Keep last 5 velocity samples for smoothing
        velocityHistory.push({ vx, vy, time: now });
        if (velocityHistory.length > 5) velocityHistory.shift();
    }

    lastMousePos = { x: mouseX, y: mouseY };
    lastMouseTime = now;

    // Move object based on mouse position (projected into 3D space)
    const camera = document.querySelector('#camera-rig');
    if (!camera) return;

    const cameraPos = camera.getAttribute('position');
    const currentPos = grabbedObject.getAttribute('position');

    // Convert screen movement to 3D movement
    const moveScale = 0.01;
    const newX = currentPos.x + (mouseX - window.innerWidth / 2) * moveScale * 0.1;
    const newY = Math.max(GROUND_Y + 0.2, currentPos.y - (mouseY - window.innerHeight / 2) * moveScale * 0.05);

    grabbedObject.setAttribute('position', {
        x: currentPos.x + (mouseX - lastMousePos.x) * 0.02,
        y: newY,
        z: currentPos.z
    });
}

function releaseObject() {
    if (!grabbedObject) return;

    // Calculate throw velocity from velocity history (keyboard-based)
    let avgVx = 0, avgVy = 0, avgVz = 0;
    if (velocityHistory.length > 0) {
        velocityHistory.forEach(v => {
            avgVx += v.vx || 0;
            avgVy += v.vy || 0;
            avgVz += v.vz || 0;
        });
        avgVx /= velocityHistory.length;
        avgVy /= velocityHistory.length;
        avgVz /= velocityHistory.length;
    }

    const pos = grabbedObject.getAttribute('position');

    // Calculate throw strength based on current grab velocity
    const speed = Math.sqrt(grabVelocity.x ** 2 + grabVelocity.y ** 2 + grabVelocity.z ** 2);
    const throwMultiplier = 15; // Amplify for good throwing feel

    // Add to physics simulation with velocity from keyboard movement
    physicsObjects.set(grabbedObject, {
        vx: grabVelocity.x * throwMultiplier,
        vy: grabVelocity.y * throwMultiplier + (speed > 0.05 ? 3 : 1), // Add upward boost if moving fast
        vz: grabVelocity.z * throwMultiplier,
        x: pos.x,
        y: pos.y,
        z: pos.z,
        bounces: 0
    });

    // Visual feedback
    grabbedObject.setAttribute('material', 'emissiveIntensity', 0);

    playSound(300 + speed * 500, 0.15, 'sine', 0.2);

    grabbedObject = null;
    velocityHistory = [];
    grabVelocity = { x: 0, y: 0, z: 0 };
}

// Physics simulation loop
let lastPhysicsTime = performance.now();

function updatePhysics() {
    if (!grabModeEnabled && physicsObjects.size === 0) {
        requestAnimationFrame(updatePhysics);
        return;
    }

    const now = performance.now();
    const deltaTime = Math.min((now - lastPhysicsTime) / 1000, 0.05); // Cap delta time
    lastPhysicsTime = now;

    physicsObjects.forEach((physics, obj) => {
        if (!obj.parentNode) {
            physicsObjects.delete(obj);
            return;
        }

        // Apply gravity
        physics.vy -= GRAVITY * deltaTime;

        // Apply friction
        physics.vx *= FRICTION;
        physics.vz *= FRICTION;

        // Update position
        physics.x += physics.vx * deltaTime * 60;
        physics.y += physics.vy * deltaTime * 60;
        physics.z += physics.vz * deltaTime * 60;

        // Ground collision
        if (physics.y < GROUND_Y) {
            physics.y = GROUND_Y;
            physics.vy = -physics.vy * BOUNCE_DAMPING;
            physics.bounces++;

            // Play bounce sound
            if (Math.abs(physics.vy) > 0.5) {
                playSound(80 + physics.bounces * 20, 0.1, 'triangle', 0.15);
            }

            // Stop bouncing after too many bounces or low velocity
            if (physics.bounces > 5 || Math.abs(physics.vy) < 0.3) {
                physics.vy = 0;
                physics.vx *= 0.5;
                physics.vz *= 0.5;
            }
        }

        // Wall boundaries
        if (Math.abs(physics.x) > 20) {
            physics.x = Math.sign(physics.x) * 20;
            physics.vx = -physics.vx * BOUNCE_DAMPING;
        }
        if (physics.z < -25 || physics.z > 5) {
            physics.z = physics.z < -25 ? -25 : 5;
            physics.vz = -physics.vz * BOUNCE_DAMPING;
        }

        // Update object position
        obj.setAttribute('position', {
            x: physics.x,
            y: physics.y,
            z: physics.z
        });

        // Add rotation based on velocity
        const currentRot = obj.getAttribute('rotation') || { x: 0, y: 0, z: 0 };
        obj.setAttribute('rotation', {
            x: currentRot.x + physics.vz * 2,
            y: currentRot.y + (physics.vx + physics.vz) * 0.5,
            z: currentRot.z - physics.vx * 2
        });

        // Remove from physics if nearly stopped
        if (physics.bounces > 5 &&
            Math.abs(physics.vx) < 0.01 &&
            Math.abs(physics.vy) < 0.01 &&
            Math.abs(physics.vz) < 0.01) {
            physicsObjects.delete(obj);
        }
    });

    requestAnimationFrame(updatePhysics);
}

// Start physics loop
requestAnimationFrame(updatePhysics);

// Combo system functions
function updateCombo() {
    const comboDisplay = document.getElementById('combo-display');
    const comboCountEl = document.getElementById('combo-count');

    comboCount++;

    // Clear existing timer
    if (comboTimer) clearTimeout(comboTimer);

    // Update display
    comboCountEl.textContent = `${comboCount}x`;
    comboDisplay.classList.remove('hidden');
    comboDisplay.classList.add('visible', 'pulse');

    // Play combo sound
    playComboSound(comboCount);

    // Check achievements
    if (comboCount >= 5 && !achievements.combo5.unlocked) {
        unlockAchievement('combo5');
    }
    if (comboCount >= 10 && !achievements.combo10.unlocked) {
        unlockAchievement('combo10');
    }

    // Remove pulse class after animation
    setTimeout(() => comboDisplay.classList.remove('pulse'), 200);

    // Set timer to reset combo
    comboTimer = setTimeout(() => {
        comboCount = 0;
        comboDisplay.classList.remove('visible');
        comboDisplay.classList.add('hidden');
    }, COMBO_TIMEOUT);

    return comboCount;
}

// Achievement system
function unlockAchievement(achievementKey) {
    if (achievements[achievementKey].unlocked) return;

    achievements[achievementKey].unlocked = true;

    const popup = document.getElementById('achievement-popup');
    const text = document.getElementById('achievement-text');

    text.textContent = achievements[achievementKey].name;
    popup.classList.remove('hidden');
    popup.classList.add('visible');

    playAchievementSound();

    // Hide after 3 seconds
    setTimeout(() => {
        popup.classList.remove('visible');
        popup.classList.add('hidden');
    }, 3000);
}

// Collectible orb functions
function collectOrb(orbElement) {
    orbsCollected++;

    // Update counter
    document.getElementById('orbs-collected').textContent = orbsCollected;

    // Play collect sound
    playCollectSound();

    // Animate orb collection
    orbElement.setAttribute('animation__collect', {
        property: 'scale',
        to: '0 0 0',
        dur: 300,
        easing: 'easeInBack'
    });

    orbElement.setAttribute('animation__rise', {
        property: 'position',
        to: `${orbElement.getAttribute('position').x} ${orbElement.getAttribute('position').y + 2} ${orbElement.getAttribute('position').z}`,
        dur: 300,
        easing: 'easeOutQuad'
    });

    // Add bonus points
    const bonusPoints = 50 * (comboCount > 0 ? comboCount : 1);
    score += bonusPoints;
    document.getElementById('score-display').textContent = `Score: ${score}`;

    // Remove orb after animation
    setTimeout(() => {
        orbElement.parentNode.removeChild(orbElement);
    }, 300);

    // Check if all orbs collected
    if (orbsCollected >= totalOrbs && !achievements.allOrbs.unlocked) {
        unlockAchievement('allOrbs');
        spawnBonusOrbs();
    }
}

// Spawn bonus orbs when all are collected
function spawnBonusOrbs() {
    const container = document.getElementById('collectibles-container');
    const colors = ['#FF6B6B', '#4ECDC4', '#AA96DA', '#95E1D3', '#FCBAD3'];

    for (let i = 0; i < 5; i++) {
        const orb = document.createElement('a-sphere');
        orb.classList.add('collectible');
        orb.setAttribute('position', {
            x: (Math.random() - 0.5) * 16,
            y: 1.5 + Math.random() * 2,
            z: -3 - Math.random() * 10
        });
        orb.setAttribute('radius', '0.2');
        orb.setAttribute('color', colors[i]);
        orb.setAttribute('material', 'shader: flat; transparent: true; opacity: 0.9; emissive: #fff; emissiveIntensity: 0.5');
        orb.setAttribute('animation', {
            property: 'position',
            to: `${orb.getAttribute('position').x} ${orb.getAttribute('position').y + 1} ${orb.getAttribute('position').z}`,
            dur: 2000 + Math.random() * 1000,
            dir: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });
        orb.setAttribute('animation__spin', {
            property: 'rotation',
            to: '0 360 0',
            dur: 3000,
            loop: true,
            easing: 'linear'
        });

        container.appendChild(orb);

        // Add click listener
        orb.addEventListener('click', function() {
            collectOrb(this);
        });
    }

    totalOrbs += 5;
    document.getElementById('orbs-total').textContent = totalOrbs;
}

// Shooting star function
function triggerShootingStar() {
    const shootingStar = document.getElementById('shooting-star');
    if (shootingStar) {
        // Reset position
        shootingStar.setAttribute('position', {
            x: -20 + Math.random() * 10,
            y: 12 + Math.random() * 8,
            z: -20 - Math.random() * 10
        });

        // Update animation target
        shootingStar.setAttribute('animation', {
            property: 'position',
            to: `${15 + Math.random() * 10} ${3 + Math.random() * 5} ${-10 - Math.random() * 10}`,
            dur: 1000 + Math.random() * 1000,
            easing: 'linear'
        });

        // Emit the event to trigger animation
        shootingStar.emit('shoot');
    }
}

// Random shooting stars
setInterval(() => {
    if (Math.random() < 0.3) { // 30% chance every interval
        triggerShootingStar();
    }
}, 5000);

// Wait for scene to load
document.addEventListener('DOMContentLoaded', function() {
    const scene = document.querySelector('a-scene');
    const loadingScreen = document.getElementById('loading-screen');
    let hasLoaded = false;

    function hideLoadingScreen() {
        if (hasLoaded) return;
        hasLoaded = true;

        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Show VR button after loading screen fades
            setTimeout(() => {
                const vrButton = document.querySelector('.a-enter-vr-button');
                if (vrButton) {
                    vrButton.classList.add('visible');
                    vrButton.innerHTML = '<span class="vr-icon">🥽</span> Enter VR';
                }
            }, 400);
        }, 800);
        console.log('Dimensional Playground loaded successfully!');

        // Store initial state for reset functionality
        setTimeout(storeInitialState, 100);
    }

    // Primary: wait for scene loaded event
    if (scene) {
        scene.addEventListener('loaded', hideLoadingScreen);
    }

    // Fallback: if scene doesn't load within 5 seconds, hide loading anyway
    setTimeout(() => {
        if (!hasLoaded) {
            console.warn('Scene load timeout - forcing load screen hide');
            hideLoadingScreen();
        }
    }, 5000);

    // Also try renderstart event as backup
    if (scene) {
        scene.addEventListener('renderstart', hideLoadingScreen);
    }

    // Setup collectible orbs (can run immediately, elements exist)
    const collectibles = document.querySelectorAll('.collectible');
    collectibles.forEach(orb => {
        orb.addEventListener('click', function() {
            initAudio();
            collectOrb(this);
        });
    });

    // Setup VR controller interactions
    const setupVRControllers = () => {
        const leftHand = document.getElementById('left-hand');
        const rightHand = document.getElementById('right-hand');

        [leftHand, rightHand].forEach(hand => {
            if (hand) {
                hand.addEventListener('triggerdown', function() {
                    initAudio();
                    const raycaster = this.components.raycaster;
                    if (raycaster && raycaster.intersectedEls) {
                        const intersections = raycaster.intersectedEls;
                        if (intersections.length > 0) {
                            const target = intersections[0];
                            if (target.classList.contains('collectible')) {
                                collectOrb(target);
                            } else if (target.classList.contains('clickable')) {
                                target.emit('click');
                            }
                        }
                    }
                });
            }
        });
    };

    // Try to setup controllers now and also after a delay (for VR mode)
    setupVRControllers();
    setTimeout(setupVRControllers, 2000);

    // Initialize on first interaction
    document.body.addEventListener('click', initAudio, { once: true });
    document.body.addEventListener('touchstart', initAudio, { once: true });

    // UI Elements
    const scoreDisplay = document.getElementById('score-display');

    // Proximity detection - objects react when you walk near them
    const proximityRadius = 2.5; // How close you need to be
    const pushStrength = 0.08; // How much objects move away

    function updateProximityEffects() {
        if (!proximityEnabled) return;

        const camera = document.querySelector('#camera-rig');
        if (!camera) return;

        const cameraPos = camera.getAttribute('position');
        const clickableObjs = document.querySelectorAll('.clickable');

        clickableObjs.forEach(obj => {
            const objPos = obj.getAttribute('position');
            if (!objPos) return;

            // Calculate distance from camera to object (XZ plane only)
            const dx = objPos.x - cameraPos.x;
            const dz = objPos.z - cameraPos.z;
            const distance = Math.sqrt(dx * dx + dz * dz);

            if (distance < proximityRadius && distance > 0.1) {
                // Calculate push direction (away from player)
                // Stronger push when physics is enabled (objects on ground are easier to push)
                const currentPushStrength = physicsEnabled ? pushStrength * 1.5 : pushStrength;
                const pushX = (dx / distance) * currentPushStrength;
                const pushZ = (dz / distance) * currentPushStrength;

                // Stronger push when closer
                const proximityFactor = 1 - (distance / proximityRadius);

                // Apply push - if physics enabled, keep Y constant (slide on ground)
                if (physicsEnabled) {
                    // Slide along ground only (no Y movement)
                    obj.setAttribute('position', {
                        x: objPos.x + pushX * proximityFactor,
                        y: objPos.y, // Keep Y fixed on ground
                        z: objPos.z + pushZ * proximityFactor
                    });

                    // Add slight rotation when pushed (rolling effect)
                    const currentRot = obj.getAttribute('rotation') || {x: 0, y: 0, z: 0};
                    obj.setAttribute('rotation', {
                        x: currentRot.x + pushZ * proximityFactor * 5,
                        y: currentRot.y,
                        z: currentRot.z - pushX * proximityFactor * 5
                    });
                } else {
                    // Normal floating push with bobbing
                    obj.setAttribute('position', {
                        x: objPos.x + pushX * proximityFactor,
                        y: objPos.y + (Math.sin(Date.now() / 200) * 0.02 * proximityFactor),
                        z: objPos.z + pushZ * proximityFactor
                    });
                }

                // Add a glow effect when close
                if (!obj.classList.contains('proximity-active')) {
                    obj.classList.add('proximity-active');
                    const currentColor = obj.getAttribute('color');
                    obj.setAttribute('material', 'emissive', currentColor);
                    obj.setAttribute('material', 'emissiveIntensity', 0.3);
                }
            } else {
                // Remove glow when far
                if (obj.classList.contains('proximity-active')) {
                    obj.classList.remove('proximity-active');
                    obj.setAttribute('material', 'emissiveIntensity', 0);
                }
            }
        });

        requestAnimationFrame(updateProximityEffects);
    }

    // Start proximity detection
    updateProximityEffects();
    const toggleInfoBtn = document.getElementById('toggle-info');
    const infoPanel = document.getElementById('info-panel');
    const toggleAboutBtn = document.getElementById('toggle-about');
    const aboutPanel = document.getElementById('about-panel');
    const partyModeBtn = document.getElementById('party-mode');
    const gravityToggleBtn = document.getElementById('gravity-toggle');
    const addObjectBtn = document.getElementById('add-object');
    const resetSceneBtn = document.getElementById('reset-scene');
    const backButton = document.getElementById('back-button');
    const exitModal = document.getElementById('exit-modal');
    const confirmExitBtn = document.getElementById('confirm-exit');
    const cancelExitBtn = document.getElementById('cancel-exit');

    // Reset Scene button
    resetSceneBtn.addEventListener('click', function() {
        initAudio();
        resetScene();
    });

    // Panel toggles with smooth animations
    toggleInfoBtn.addEventListener('click', function() {
        initAudio();
        infoPanel.classList.toggle('hidden');
        infoPanel.classList.toggle('visible');
        playSound(600, 0.1, 'sine');
    });

    toggleAboutBtn.addEventListener('click', function() {
        initAudio();
        aboutPanel.classList.toggle('hidden');
        aboutPanel.classList.toggle('visible');
        playSound(600, 0.1, 'sine');
    });

    // Back button modal
    backButton.addEventListener('click', function() {
        initAudio();
        exitModal.classList.add('visible');
        playSound(400, 0.15, 'sine');
    });

    confirmExitBtn.addEventListener('click', function() {
        playChord(523, 0.3);
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 200);
    });

    cancelExitBtn.addEventListener('click', function() {
        exitModal.classList.remove('visible');
        playSound(523, 0.1, 'sine');
    });

    exitModal.addEventListener('click', function(e) {
        if (e.target === exitModal) {
            exitModal.classList.remove('visible');
            playSound(400, 0.1, 'sine');
        }
    });

    // Clickable objects interaction
    const clickableObjects = document.querySelectorAll('.clickable');

    clickableObjects.forEach(obj => {
        obj.addEventListener('click', function() {
            initAudio();

            // Update combo
            const currentCombo = updateCombo();

            // Generate harmonious random color
            const hue = Math.random() * 360;
            const saturation = 70 + Math.random() * 30;
            const lightness = 50 + Math.random() * 20;
            this.setAttribute('color', `hsl(${hue}, ${saturation}%, ${lightness}%)`);

            // Add emissive glow on click
            this.setAttribute('material', 'emissive', `hsl(${hue}, ${saturation}%, ${lightness}%)`);
            this.setAttribute('material', 'emissiveIntensity', 0.5);
            setTimeout(() => {
                this.setAttribute('material', 'emissiveIntensity', 0);
            }, 300);

            // Scale pulse animation
            const currentScale = this.getAttribute('scale') || {x: 1, y: 1, z: 1};
            this.setAttribute('animation__click', {
                property: 'scale',
                from: `${currentScale.x} ${currentScale.y} ${currentScale.z}`,
                to: `${currentScale.x * 1.4} ${currentScale.y * 1.4} ${currentScale.z * 1.4}`,
                dur: 150,
                dir: 'alternate',
                loop: 1,
                easing: 'easeOutElastic'
            });

            // Update score with combo multiplier
            const basePoints = 10;
            const comboBonus = currentCombo > 1 ? Math.floor(basePoints * (currentCombo * 0.5)) : 0;
            score += basePoints + comboBonus;
            scoreDisplay.textContent = `Score: ${score}`;
            scoreDisplay.classList.add('visible');

            // Check score achievements
            if (!achievements.firstClick.unlocked) {
                unlockAchievement('firstClick');
            }
            if (score >= 100 && !achievements.score100.unlocked) {
                unlockAchievement('score100');
            }
            if (score >= 500 && !achievements.score500.unlocked) {
                unlockAchievement('score500');
            }

            // Musical click sound (pentatonic scale) - higher pitch for combos
            const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
            const noteIndex = Math.min(Math.floor(currentCombo / 2), notes.length - 1);
            const note = notes[noteIndex];
            playSound(note, 0.2, 'sine');
        });

        // Hover effects
        obj.addEventListener('mouseenter', function() {
            this.setAttribute('animation__hover', {
                property: 'scale',
                to: '1.15 1.15 1.15',
                dur: 200,
                easing: 'easeOutQuad'
            });
            if (audioContext) playSound(880, 0.05, 'sine', 0.1);
        });

        obj.addEventListener('mouseleave', function() {
            this.setAttribute('animation__hover', {
                property: 'scale',
                to: '1 1 1',
                dur: 200,
                easing: 'easeOutQuad'
            });
        });
    });

    // Party Mode
    partyModeBtn.addEventListener('click', function() {
        initAudio();
        partyModeActive = !partyModeActive;

        if (partyModeActive) {
            this.classList.add('active');
            this.innerHTML = '<span class="icon">&#127882;</span> Party ON!';
            playChord(523, 0.3);

            // Speed up animations
            document.querySelectorAll('[animation]').forEach(el => {
                const anims = el.components;
                Object.keys(anims).forEach(key => {
                    if (key.startsWith('animation')) {
                        const anim = el.getAttribute(key);
                        if (anim && anim.dur && !originalAnimations.has(el.id + key)) {
                            originalAnimations.set(el.id + key, anim.dur);
                            el.setAttribute(key, { ...anim, dur: anim.dur / 2.5 });
                        }
                    }
                });
            });

            // Crazy sky colors
            const sky = document.querySelector('a-sky');
            sky.setAttribute('animation', {
                property: 'color',
                to: '#FF1493',
                dur: 400,
                dir: 'alternate',
                loop: true
            });
        } else {
            this.classList.remove('active');
            this.innerHTML = '<span class="icon">&#127881;</span> Party Mode';
            resetScene();
        }
    });

    // Gravity Toggle
    gravityToggleBtn.addEventListener('click', function() {
        initAudio();
        gravityEnabled = !gravityEnabled;

        const clickableObjs = document.querySelectorAll('.clickable');

        if (!gravityEnabled) {
            this.classList.add('active');
            this.innerHTML = '<span class="icon">&#128640;</span> Zero-G';
            playSound(200, 0.3, 'triangle');

            clickableObjs.forEach(obj => {
                const pos = obj.getAttribute('position');
                obj.setAttribute('animation__antigravity', {
                    property: 'position',
                    to: `${pos.x + (Math.random() - 0.5) * 2} ${pos.y + 4 + Math.random() * 2} ${pos.z + (Math.random() - 0.5) * 2}`,
                    dur: 3000,
                    easing: 'easeOutQuad'
                });
            });
        } else {
            this.classList.remove('active');
            this.innerHTML = '<span class="icon">&#127758;</span> Gravity';
            resetScene();
        }
    });

    // Grab Mode Toggle (replaces proximity)
    const proximityToggleBtn = document.getElementById('proximity-toggle');
    proximityToggleBtn.addEventListener('click', function() {
        initAudio();
        grabModeEnabled = !grabModeEnabled;

        if (grabModeEnabled) {
            this.classList.add('active');
            this.innerHTML = '<span class="icon">&#9995;</span> Grab ON';
            playSound(500, 0.15, 'sine');

            // Disable proximity push when grab mode is on
            proximityEnabled = false;

            // Add visual hint - make objects glow slightly
            document.querySelectorAll('.clickable').forEach(obj => {
                obj.setAttribute('material', 'emissive', obj.getAttribute('color'));
                obj.setAttribute('material', 'emissiveIntensity', 0.15);
            });
        } else {
            this.classList.remove('active');
            this.innerHTML = '<span class="icon">&#128400;</span> Push';
            playSound(300, 0.15, 'sine');

            // Re-enable proximity
            proximityEnabled = true;

            // Release any grabbed object
            if (grabbedObject) {
                releaseObject();
            }

            // Remove glow effects
            document.querySelectorAll('.clickable').forEach(obj => {
                obj.setAttribute('material', 'emissiveIntensity', 0);
            });

            // Clear all physics objects and reset
            physicsObjects.clear();
            updateProximityEffects();
        }
    });

    // Mouse/touch events for grab and throw
    let isMouseDown = false;

    // Create a Three.js raycaster for mouse-based picking
    const mouseRaycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Helper to get object under mouse position using Three.js raycaster
    function getObjectAtMousePosition(clientX, clientY) {
        // Convert mouse position to normalized device coordinates (-1 to +1)
        mouse.x = (clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(clientY / window.innerHeight) * 2 + 1;

        // Get the camera from A-Frame
        const camera = document.querySelector('a-camera');
        if (!camera || !camera.components || !camera.components.camera) return null;

        const threeCamera = camera.components.camera.camera;
        if (!threeCamera) return null;

        // Update the raycaster
        mouseRaycaster.setFromCamera(mouse, threeCamera);

        // Get all clickable objects' 3D meshes
        const clickableEls = document.querySelectorAll('.clickable');
        const meshes = [];

        clickableEls.forEach(el => {
            if (el.object3D) {
                el.object3D.traverse(child => {
                    if (child.isMesh) {
                        child.userData.aframeEl = el; // Store reference to A-Frame element
                        meshes.push(child);
                    }
                });
            }
        });

        // Check for intersections
        const intersects = mouseRaycaster.intersectObjects(meshes, false);

        if (intersects.length > 0) {
            // Return the A-Frame element of the first intersection
            return intersects[0].object.userData.aframeEl;
        }

        return null;
    }

    // Global mousedown - use Three.js raycaster to find object
    document.addEventListener('mousedown', function(e) {
        if (!grabModeEnabled) return;

        // Check if clicking on UI elements
        if (e.target.closest('#fun-controls') ||
            e.target.closest('.toggle-btn') ||
            e.target.closest('.glass-panel') ||
            e.target.closest('#back-button') ||
            e.target.closest('#exit-modal')) {
            return;
        }

        isMouseDown = true;
        initAudio();

        // Use Three.js raycaster to find object at mouse position
        const targetObj = getObjectAtMousePosition(e.clientX, e.clientY);
        if (targetObj) {
            grabObject(targetObj, e.clientX, e.clientY);
        }
    });

    // Global mouse move for dragging (optional - keyboard is primary)
    document.addEventListener('mousemove', function(e) {
        if (grabModeEnabled && grabbedObject && isMouseDown) {
            // Only track mouse position, don't move object (keyboard controls movement)
            lastMousePos = { x: e.clientX, y: e.clientY };
            lastMouseTime = performance.now();
        }
    });

    // Global mouse up for releasing/throwing
    document.addEventListener('mouseup', function(e) {
        if (grabModeEnabled && grabbedObject) {
            releaseObject();
        }
        isMouseDown = false;
    });

    // Touch support for mobile
    document.addEventListener('touchstart', function(e) {
        if (!grabModeEnabled) return;

        // Check if touching UI elements
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element && (
            element.closest('#fun-controls') ||
            element.closest('.toggle-btn') ||
            element.closest('.glass-panel') ||
            element.closest('#back-button'))) {
            return;
        }

        isMouseDown = true;
        initAudio();

        // Use Three.js raycaster to find object at touch position
        const targetObj = getObjectAtMousePosition(touch.clientX, touch.clientY);
        if (targetObj) {
            grabObject(targetObj, touch.clientX, touch.clientY);
        }
    }, { passive: false });

    document.addEventListener('touchmove', function(e) {
        if (grabModeEnabled && grabbedObject) {
            e.preventDefault();
            const touch = e.touches[0];

            const pos = grabbedObject.getAttribute('position');
            const now = performance.now();
            const deltaTime = (now - lastMouseTime) / 1000;

            // For touch, allow direct movement (mobile doesn't have keyboard)
            if (deltaTime > 0 && deltaTime < 0.1) {
                const sensitivity = 0.015;
                const dx = (touch.clientX - lastMousePos.x) * sensitivity;
                const dy = -(touch.clientY - lastMousePos.y) * sensitivity;

                grabbedObject.setAttribute('position', {
                    x: pos.x + dx,
                    y: Math.max(GROUND_Y + 0.2, pos.y + dy),
                    z: pos.z
                });

                // Store velocity for throwing
                grabVelocity.x = dx;
                grabVelocity.y = dy;
            }

            lastMousePos = { x: touch.clientX, y: touch.clientY };
            lastMouseTime = now;
        }
    }, { passive: false });

    document.addEventListener('touchend', function() {
        if (grabModeEnabled && grabbedObject) {
            releaseObject();
        }
        isMouseDown = false;
    });

    // Keyboard controls for grabbed objects
    // Arrow keys: move left/right/up/down
    // W/S: move forward/backward (depth)
    // Space: release/throw
    document.addEventListener('keydown', function(e) {
        if (!grabModeEnabled || !grabbedObject) return;

        // Prevent default for arrow keys to avoid scrolling
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyS', 'KeyA', 'KeyD', 'Space'].includes(e.code)) {
            e.preventDefault();
        }

        switch (e.code) {
            case 'ArrowLeft':
            case 'KeyA':
                grabKeys.left = true;
                break;
            case 'ArrowRight':
            case 'KeyD':
                grabKeys.right = true;
                break;
            case 'ArrowUp':
                grabKeys.up = true;
                break;
            case 'ArrowDown':
                grabKeys.down = true;
                break;
            case 'KeyW':
                grabKeys.forward = true;
                break;
            case 'KeyS':
                grabKeys.backward = true;
                break;
            case 'Space':
                // Release/throw the object
                releaseObject();
                break;
        }
    });

    document.addEventListener('keyup', function(e) {
        switch (e.code) {
            case 'ArrowLeft':
            case 'KeyA':
                grabKeys.left = false;
                break;
            case 'ArrowRight':
            case 'KeyD':
                grabKeys.right = false;
                break;
            case 'ArrowUp':
                grabKeys.up = false;
                break;
            case 'ArrowDown':
                grabKeys.down = false;
                break;
            case 'KeyW':
                grabKeys.forward = false;
                break;
            case 'KeyS':
                grabKeys.backward = false;
                break;
        }
    });

    // Physics Drop (animation-based gravity simulation)
    const physicsDropBtn = document.getElementById('physics-drop');
    physicsDropBtn.addEventListener('click', function() {
        initAudio();
        physicsEnabled = !physicsEnabled;

        const clickableObjs = document.querySelectorAll('.clickable');

        if (physicsEnabled) {
            this.classList.add('active');
            this.innerHTML = '<span class="icon">&#8679;</span> Reset';
            playSound(150, 0.4, 'triangle');

            // Store original positions and remove animations, simulate drop
            clickableObjs.forEach((obj, index) => {
                // Store original position
                const pos = obj.getAttribute('position');
                originalPositions.set(obj.id || `obj-${index}`, { ...pos });

                // Remove all animations
                const attrs = obj.attributes;
                for (let i = attrs.length - 1; i >= 0; i--) {
                    const attrName = attrs[i].name;
                    if (attrName.startsWith('animation')) {
                        obj.removeAttribute(attrName);
                    }
                }

                // Simulate gravity drop with animation
                setTimeout(() => {
                    const currentPos = obj.getAttribute('position');
                    const groundY = 0.3 + Math.random() * 0.2; // Slight variation in landing height
                    const dropDistance = currentPos.y - groundY;
                    const dropDuration = Math.sqrt(dropDistance) * 300; // Realistic timing

                    // Add slight horizontal drift
                    const driftX = (Math.random() - 0.5) * 0.5;
                    const driftZ = (Math.random() - 0.5) * 0.5;

                    // Drop animation
                    obj.setAttribute('animation__drop', {
                        property: 'position',
                        to: `${currentPos.x + driftX} ${groundY} ${currentPos.z + driftZ}`,
                        dur: dropDuration,
                        easing: 'easeInQuad'
                    });

                    // Bounce animation after landing
                    setTimeout(() => {
                        const landPos = obj.getAttribute('position');
                        obj.setAttribute('animation__bounce', {
                            property: 'position',
                            to: `${landPos.x} ${groundY + 0.15} ${landPos.z}`,
                            dur: 150,
                            dir: 'alternate',
                            loop: 2,
                            easing: 'easeOutQuad'
                        });

                        // Add wobble rotation
                        obj.setAttribute('animation__wobble', {
                            property: 'rotation',
                            to: `${(Math.random() - 0.5) * 30} ${Math.random() * 360} ${(Math.random() - 0.5) * 30}`,
                            dur: 300,
                            easing: 'easeOutElastic'
                        });

                        playSound(80 + Math.random() * 60, 0.2, 'triangle');
                    }, dropDuration);

                    playSound(100 + index * 50, 0.1, 'sine');
                }, index * 80);
            });

        } else {
            this.classList.remove('active');
            this.innerHTML = '<span class="icon">&#11015;</span> Drop All';
            resetScene();
        }
    });

    // Spawn Object
    addObjectBtn.addEventListener('click', function() {
        initAudio();
        playSound(600, 0.15, 'sawtooth');

        const scene = document.querySelector('a-scene');
        const shapes = ['a-sphere', 'a-box', 'a-cone', 'a-dodecahedron', 'a-icosahedron', 'a-torus'];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

        const hue = Math.random() * 360;
        const color = `hsl(${hue}, 75%, 60%)`;

        const newObj = document.createElement(randomShape);
        newObj.setAttribute('position', {
            x: (Math.random() - 0.5) * 8,
            y: Math.random() * 3 + 2,
            z: -4 - Math.random() * 6
        });
        newObj.setAttribute('color', color);
        newObj.setAttribute('metalness', 0.6 + Math.random() * 0.3);
        newObj.setAttribute('roughness', 0.1 + Math.random() * 0.2);
        newObj.setAttribute('shadow', 'cast: true');
        newObj.setAttribute('class', 'clickable');

        // Dynamic rotation animation
        const rotSpeed = 3000 + Math.random() * 5000;
        newObj.setAttribute('animation', {
            property: 'rotation',
            to: `${Math.random() * 360} ${360 + Math.random() * 360} ${Math.random() * 360}`,
            dur: rotSpeed,
            loop: true,
            easing: 'linear'
        });

        // Floating animation
        newObj.setAttribute('animation__float', {
            property: 'position',
            to: `${newObj.getAttribute('position').x} ${newObj.getAttribute('position').y + 1 + Math.random()} ${newObj.getAttribute('position').z}`,
            dur: 2000 + Math.random() * 2000,
            dir: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });

        // Set size based on shape
        const size = 0.3 + Math.random() * 0.4;
        if (randomShape === 'a-sphere' || randomShape === 'a-dodecahedron' || randomShape === 'a-icosahedron') {
            newObj.setAttribute('radius', size);
        } else if (randomShape === 'a-box') {
            newObj.setAttribute('width', size);
            newObj.setAttribute('height', size);
            newObj.setAttribute('depth', size);
        } else if (randomShape === 'a-torus') {
            newObj.setAttribute('radius', size);
            newObj.setAttribute('radius-tubular', size * 0.15);
        } else if (randomShape === 'a-cone') {
            newObj.setAttribute('radius-bottom', size);
            newObj.setAttribute('height', size * 2);
        }

        scene.appendChild(newObj);

        // If drop mode is enabled, make spawned object drop to ground
        if (physicsEnabled) {
            setTimeout(() => {
                // Remove float animation and drop to ground
                newObj.removeAttribute('animation');
                newObj.removeAttribute('animation__float');

                const pos = newObj.getAttribute('position');
                const groundY = 0.3 + Math.random() * 0.2;
                const dropDuration = Math.sqrt(pos.y - groundY) * 300;

                newObj.setAttribute('animation__drop', {
                    property: 'position',
                    to: `${pos.x} ${groundY} ${pos.z}`,
                    dur: dropDuration,
                    easing: 'easeInQuad'
                });

                // Bounce after landing
                setTimeout(() => {
                    playSound(80 + Math.random() * 60, 0.15, 'triangle');
                }, dropDuration);
            }, 100);
        }

        // Add click listener to new object
        newObj.addEventListener('click', function() {
            const newHue = Math.random() * 360;
            this.setAttribute('color', `hsl(${newHue}, 75%, 60%)`);
            score += 10;
            scoreDisplay.textContent = `Score: ${score}`;
            scoreDisplay.classList.add('visible');

            const notes = [261.63, 293.66, 329.63, 392.00, 440.00];
            playSound(notes[Math.floor(Math.random() * notes.length)], 0.2, 'sine');
        });

        // Hover effects for new object
        newObj.addEventListener('mouseenter', function() {
            this.setAttribute('animation__hover', {
                property: 'scale',
                to: '1.15 1.15 1.15',
                dur: 200,
                easing: 'easeOutQuad'
            });
        });

        newObj.addEventListener('mouseleave', function() {
            this.setAttribute('animation__hover', {
                property: 'scale',
                to: '1 1 1',
                dur: 200,
                easing: 'easeOutQuad'
            });
        });
    });
});
