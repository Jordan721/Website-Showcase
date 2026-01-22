// Game state
let score = 0;
let partyModeActive = false;
let gravityEnabled = true;
let physicsEnabled = false;
let proximityEnabled = true;
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

// Achievements
const achievements = {
    firstClick: { unlocked: false, name: 'First Contact', description: 'Click your first object' },
    combo5: { unlocked: false, name: 'Combo Starter', description: 'Get a 5x combo' },
    combo10: { unlocked: false, name: 'Combo Master', description: 'Get a 10x combo' },
    allOrbs: { unlocked: false, name: 'Collector', description: 'Collect all orbs' },
    score100: { unlocked: false, name: 'Century', description: 'Reach 100 points' },
    score500: { unlocked: false, name: 'High Scorer', description: 'Reach 500 points' }
};

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
        if (!proximityEnabled || physicsEnabled) return;

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
                const pushX = (dx / distance) * pushStrength;
                const pushZ = (dz / distance) * pushStrength;

                // Stronger push when closer
                const proximityFactor = 1 - (distance / proximityRadius);

                // Apply gentle push
                obj.setAttribute('position', {
                    x: objPos.x + pushX * proximityFactor,
                    y: objPos.y + (Math.sin(Date.now() / 200) * 0.02 * proximityFactor), // Slight bobbing
                    z: objPos.z + pushZ * proximityFactor
                });

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
    const backButton = document.getElementById('back-button');
    const exitModal = document.getElementById('exit-modal');
    const confirmExitBtn = document.getElementById('confirm-exit');
    const cancelExitBtn = document.getElementById('cancel-exit');

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
            playSound(400, 0.2, 'sine');
            location.reload();
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
            playSound(100, 0.3, 'triangle');
            location.reload();
        }
    });

    // Proximity Toggle
    const proximityToggleBtn = document.getElementById('proximity-toggle');
    proximityToggleBtn.addEventListener('click', function() {
        initAudio();
        proximityEnabled = !proximityEnabled;

        if (proximityEnabled) {
            this.classList.add('active');
            this.innerHTML = '<span class="icon">&#128400;</span> Push';
            playSound(500, 0.15, 'sine');
            updateProximityEffects(); // Restart the loop
        } else {
            this.classList.remove('active');
            this.innerHTML = '<span class="icon">&#128400;</span> Push Off';
            playSound(300, 0.15, 'sine');

            // Remove all glow effects
            document.querySelectorAll('.proximity-active').forEach(obj => {
                obj.classList.remove('proximity-active');
                obj.setAttribute('material', 'emissiveIntensity', 0);
            });
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
            playSound(400, 0.2, 'sine');

            // Reset - reload page to restore original state
            location.reload();
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
