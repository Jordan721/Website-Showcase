/*
Final Project - Interactive Orbit Control
Jordan Alexis
*/

// Interactive control variables
var camX = 0;
var camY = 0;
var camZ = 200;
var targetCamX = 0;
var targetCamY = 0;
var targetCamZ = 200;
var rotationSpeedMultiplier = 1;
var isPaused = false;
var shapeMode = 'mixed';
var colorScheme = 'default';
var currentColorIndex = 0;
var backgroundMusic;
var isMusicPlaying = false;
var hoverColorEffect = true;
var mouseHue = 0;

// Mouse drag controls
var isDragging = false;
var lastMouseX = 0;
var lastMouseY = 0;
var orbitAngleX = 0;
var orbitAngleY = 0;
var targetOrbitX = 0;
var targetOrbitY = 0;

// Zoom controls
var zoomLevel = 1;
var targetZoom = 1;
var minZoom = 0.3;
var maxZoom = 3;

// Particle system
var particles = [];
var maxParticles = 100;

// Shape interaction
var shapePositions = [];
var explosionAmount = 0;
var targetExplosion = 0;
var pulsePhase = 0;

// Color schemes
var colorSchemes = {
    default: { color1: 'white', color2: 'teal' },
    neon: { color1: '#ff00ff', color2: '#00ffff' },
    rainbow: { color1: '#ff0080', color2: '#00ff80' },
    monochrome: { color1: '#ffffff', color2: '#888888' },
    fire: { color1: '#ff4500', color2: '#ffd700' },
    ocean: { color1: '#00bfff', color2: '#004080' },
    matrix: { color1: '#00ff00', color2: '#003300' }
};

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.parent('canvas-container');
    rectMode(CENTER);
    colorMode(HSB, 360, 100, 100, 100);

    // Initialize shape positions
    initShapePositions();

    setupEventListeners();
    setupMouseControls();
}

function initShapePositions() {
    shapePositions = [];
    var radius = width * 0.8;
    for (var i = 0; i <= 12; i++) {
        for (var j = 0; j <= 12; j++) {
            var a = (j / 12) * PI;
            var b = (i / 12) * PI;
            var x = sin(2 * a) * radius * sin(b);
            var y = cos(b) * radius / 2;
            var z = cos(2 * a) * radius * sin(b);
            shapePositions.push({ x: x, y: y, z: z, i: i, j: j, scale: 1, pulse: random(TWO_PI) });
        }
    }
}

function setupMouseControls() {
    var canvasContainer = document.getElementById('canvas-container');

    // Mouse drag for orbit
    canvasContainer.addEventListener('mousedown', function(e) {
        if (e.button === 0) {
            isDragging = true;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
        }
    });

    window.addEventListener('mouseup', function() {
        isDragging = false;
    });

    window.addEventListener('mousemove', function(e) {
        if (isDragging) {
            var deltaX = e.clientX - lastMouseX;
            var deltaY = e.clientY - lastMouseY;
            targetOrbitX += deltaY * 0.005;
            targetOrbitY += deltaX * 0.005;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
        }
    });

    // Scroll wheel for zoom
    canvasContainer.addEventListener('wheel', function(e) {
        e.preventDefault();
        var zoomDelta = e.deltaY > 0 ? -0.1 : 0.1;
        targetZoom = constrain(targetZoom + zoomDelta, minZoom, maxZoom);
        updateZoomSlider();
    }, { passive: false });
}

function setupEventListeners() {
    // Get background music element
    backgroundMusic = document.getElementById('backgroundMusic');

    // Toggle UI visibility
    var toggleUIBtn = document.getElementById('toggleUI');
    var mainContent = document.getElementById('mainContent');
    var isUIVisible = true;

    toggleUIBtn.addEventListener('click', function () {
        isUIVisible = !isUIVisible;
        if (isUIVisible) {
            mainContent.classList.remove('hidden');
            this.textContent = 'Hide UI';
            this.classList.remove('hidden-state');
        } else {
            mainContent.classList.add('hidden');
            this.textContent = 'Show UI';
            this.classList.add('hidden-state');
        }
    });

    // About Project Modal
    var modal = document.getElementById('aboutModal');
    var aboutBtn = document.getElementById('aboutProject');
    var closeBtn = document.getElementsByClassName('close')[0];

    aboutBtn.addEventListener('click', function () {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Toggle music button
    document.getElementById('toggleMusic').addEventListener('click', function () {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            this.textContent = 'Play Music';
            isMusicPlaying = false;
        } else {
            backgroundMusic.play();
            this.textContent = 'Pause Music';
            isMusicPlaying = true;
        }
    });

    // Toggle rotation button
    document.getElementById('toggleRotation').addEventListener('click', function () {
        isPaused = !isPaused;
        this.textContent = isPaused ? 'Resume Rotation' : 'Pause Rotation';
    });

    // Reset view button
    document.getElementById('resetView').addEventListener('click', function () {
        camX = 0;
        camY = 0;
        sensorValue = 512;
        sensorValue2 = 512;
        rotationSpeedMultiplier = 1;
        document.getElementById('rotationSpeed').value = 2;
        document.getElementById('speedValue').textContent = '2x';
    });

    // Random colors button
    document.getElementById('randomColors').addEventListener('click', function () {
        var schemes = Object.keys(colorSchemes);
        currentColorIndex = (currentColorIndex + 1) % schemes.length;
        colorScheme = schemes[currentColorIndex];
        document.getElementById('colorScheme').value = colorScheme;
    });

    // Rotation speed slider
    document.getElementById('rotationSpeed').addEventListener('input', function () {
        rotationSpeedMultiplier = this.value / 2;
        document.getElementById('speedValue').textContent = this.value / 2 + 'x';
    });

    // Shape type selector
    document.getElementById('shapeType').addEventListener('change', function () {
        shapeMode = this.value;
    });

    // Color scheme selector
    document.getElementById('colorScheme').addEventListener('change', function () {
        colorScheme = this.value;
    });

    // Zoom slider
    var zoomSlider = document.getElementById('zoomLevel');
    if (zoomSlider) {
        zoomSlider.addEventListener('input', function () {
            targetZoom = parseFloat(this.value);
            document.getElementById('zoomValue').textContent = (targetZoom * 100).toFixed(0) + '%';
        });
    }

    // Explosion button
    var explodeBtn = document.getElementById('explodeShapes');
    if (explodeBtn) {
        explodeBtn.addEventListener('click', function () {
            targetExplosion = targetExplosion > 0 ? 0 : 1;
            this.textContent = targetExplosion > 0 ? 'Collapse' : 'Explode';
        });
    }

    // Particle toggle
    var particleBtn = document.getElementById('toggleParticles');
    if (particleBtn) {
        particleBtn.addEventListener('click', function () {
            maxParticles = maxParticles > 0 ? 0 : 100;
            this.textContent = maxParticles > 0 ? 'Hide Particles' : 'Show Particles';
        });
    }
}

function updateZoomSlider() {
    var zoomSlider = document.getElementById('zoomLevel');
    var zoomValue = document.getElementById('zoomValue');
    if (zoomSlider && zoomValue) {
        zoomSlider.value = targetZoom;
        zoomValue.textContent = (targetZoom * 100).toFixed(0) + '%';
    }
}

function draw() {
    background(0);

    // Smooth interpolation for all controls
    orbitAngleX = lerp(orbitAngleX, targetOrbitX, 0.08);
    orbitAngleY = lerp(orbitAngleY, targetOrbitY, 0.08);
    zoomLevel = lerp(zoomLevel, targetZoom, 0.08);
    explosionAmount = lerp(explosionAmount, targetExplosion, 0.05);
    pulsePhase += 0.03;

    // Update hover color based on mouse position
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        mouseHue = map(mouseX, 0, width, 0, 360);
        updateTextColors();
    }

    // Smooth camera position updates
    if (!isDragging && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        targetCamX = map(mouseX, 0, width, -100, 100);
        targetCamY = map(mouseY, 0, height, -100, 100);
    }
    camX = lerp(camX, targetCamX, 0.05);
    camY = lerp(camY, targetCamY, 0.05);

    // Apply orbit rotation and zoom to camera
    var camDist = 600 / zoomLevel;
    var camPosX = sin(orbitAngleY) * cos(orbitAngleX) * camDist;
    var camPosY = sin(orbitAngleX) * camDist;
    var camPosZ = cos(orbitAngleY) * cos(orbitAngleX) * camDist;

    camera(camPosX, camPosY, camPosZ, camX, camY, 0, 0, 1, 0);

    // Enhanced lighting
    ambientLight(80);
    pointLight(255, 255, 255, camPosX, camPosY, camPosZ);

    // Dynamic colored lights based on mouse position
    var lightHue = mouseHue;
    colorMode(HSB, 360, 100, 100);
    pointLight(color(lightHue, 80, 100), -300, -300, 300);
    pointLight(color((lightHue + 180) % 360, 80, 100), 300, 300, -300);

    // Draw particles
    updateAndDrawParticles();

    // Draw the 3D orbit structure
    translate(0, 0, -600);
    var radius = width * 0.8;

    for (var idx = 0; idx < shapePositions.length; idx++) {
        var shape = shapePositions[idx];
        push();

        // Calculate explosion offset
        var explosionOffset = explosionAmount * 200;
        var ex = shape.x + (shape.x / radius) * explosionOffset * radius;
        var ey = shape.y + (shape.y / (radius/2)) * explosionOffset * radius / 2;
        var ez = shape.z + (shape.z / radius) * explosionOffset * radius;

        translate(ex, ey, ez);

        // Pulsing scale effect
        var pulseScale = 1 + sin(pulsePhase + shape.pulse) * 0.15;
        scale(pulseScale);

        // Rotation animation
        if (!isPaused) {
            rotateZ(frameCount * 0.02 * rotationSpeedMultiplier);
            rotateX(frameCount * 0.02 * rotationSpeedMultiplier);
            rotateY(frameCount * 0.01 * rotationSpeedMultiplier);
        }

        // Get colors from current scheme
        var colors = colorSchemes[colorScheme];

        // Draw shapes based on mode with slight color variation
        drawShape(shape.j, shape.i, colors, pulseScale);

        pop();
    }
}

// Particle system
function updateAndDrawParticles() {
    // Add new particles
    if (particles.length < maxParticles && frameCount % 3 === 0) {
        particles.push({
            x: random(-400, 400),
            y: random(-400, 400),
            z: random(-800, -200),
            vx: random(-1, 1),
            vy: random(-1, 1),
            vz: random(2, 5),
            size: random(2, 6),
            hue: random(360),
            life: 255
        });
    }

    // Update and draw particles
    noStroke();
    for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        p.life -= 2;
        p.hue = (p.hue + 1) % 360;

        // Draw particle
        push();
        translate(p.x, p.y, p.z);
        fill(p.hue, 80, 100, p.life / 255 * 100);
        sphere(p.size);
        pop();

        // Remove dead particles
        if (p.life <= 0 || p.z > 200) {
            particles.splice(i, 1);
        }
    }
}

function drawShape(j, i, colors, pulseScale) {
    // Use normalMaterial for a nice reflective look, or fill with the color
    noStroke();

    // Get the base color and apply it
    var baseColor = j % 2 === 0 ? colors.color1 : colors.color2;

    // Use ambientMaterial for better color rendering in WebGL
    ambientMaterial(baseColor);

    switch (shapeMode) {
        case 'mixed':
            if (j % 2 === 0) {
                cone(40, 60);
            } else {
                box(50, 30, 30);
            }
            break;
        case 'cones':
            cone(40, 60);
            break;
        case 'boxes':
            box(50, 30, 30);
            break;
        case 'spheres':
            sphere(30);
            break;
        case 'torus':
            torus(25, 10);
            break;
        case 'cylinders':
            cylinder(20, 50);
            break;
    }
}

// Keyboard controls
function keyPressed() {
    // Space to toggle rotation
    if (key === ' ') {
        isPaused = !isPaused;
        document.getElementById('toggleRotation').textContent = isPaused ? 'Resume Rotation' : 'Pause Rotation';
        return false; // Prevent page scroll
    }

    // R to reset view
    if (key === 'r' || key === 'R') {
        targetCamX = 0;
        targetCamY = 0;
        targetOrbitX = 0;
        targetOrbitY = 0;
        targetZoom = 1;
        targetExplosion = 0;
        updateZoomSlider();
        var explodeBtn = document.getElementById('explodeShapes');
        if (explodeBtn) explodeBtn.textContent = 'Explode';
    }

    // C to cycle colors
    if (key === 'c' || key === 'C') {
        var schemes = Object.keys(colorSchemes);
        currentColorIndex = (currentColorIndex + 1) % schemes.length;
        colorScheme = schemes[currentColorIndex];
        document.getElementById('colorScheme').value = colorScheme;
    }

    // WASD for camera orbit
    if (key === 'w' || key === 'W') {
        targetOrbitX -= 0.1;
    } else if (key === 's' || key === 'S') {
        targetOrbitX += 0.1;
    } else if (key === 'a' || key === 'A') {
        targetOrbitY -= 0.1;
    } else if (key === 'd' || key === 'D') {
        targetOrbitY += 0.1;
    }

    // Q/E for zoom
    if (key === 'q' || key === 'Q') {
        targetZoom = constrain(targetZoom - 0.1, minZoom, maxZoom);
        updateZoomSlider();
    } else if (key === 'e' || key === 'E') {
        targetZoom = constrain(targetZoom + 0.1, minZoom, maxZoom);
        updateZoomSlider();
    }

    // X to toggle explosion
    if (key === 'x' || key === 'X') {
        targetExplosion = targetExplosion > 0 ? 0 : 1;
        var explodeBtn = document.getElementById('explodeShapes');
        if (explodeBtn) explodeBtn.textContent = targetExplosion > 0 ? 'Collapse' : 'Explode';
    }

    // P to toggle particles
    if (key === 'p' || key === 'P') {
        maxParticles = maxParticles > 0 ? 0 : 100;
        var particleBtn = document.getElementById('toggleParticles');
        if (particleBtn) particleBtn.textContent = maxParticles > 0 ? 'Hide Particles' : 'Show Particles';
    }

    // Number keys 1-6 for shape modes
    if (key === '1') {
        shapeMode = 'mixed';
        document.getElementById('shapeType').value = 'mixed';
    } else if (key === '2') {
        shapeMode = 'cones';
        document.getElementById('shapeType').value = 'cones';
    } else if (key === '3') {
        shapeMode = 'boxes';
        document.getElementById('shapeType').value = 'boxes';
    } else if (key === '4') {
        shapeMode = 'spheres';
        document.getElementById('shapeType').value = 'spheres';
    } else if (key === '5') {
        shapeMode = 'torus';
        document.getElementById('shapeType').value = 'torus';
    } else if (key === '6') {
        shapeMode = 'cylinders';
        document.getElementById('shapeType').value = 'cylinders';
    }

    // +/- for rotation speed
    if (key === '+' || key === '=') {
        rotationSpeedMultiplier = min(rotationSpeedMultiplier + 0.5, 5);
        document.getElementById('rotationSpeed').value = rotationSpeedMultiplier * 2;
        document.getElementById('speedValue').textContent = rotationSpeedMultiplier + 'x';
    } else if (key === '-' || key === '_') {
        rotationSpeedMultiplier = max(rotationSpeedMultiplier - 0.5, 0);
        document.getElementById('rotationSpeed').value = rotationSpeedMultiplier * 2;
        document.getElementById('speedValue').textContent = rotationSpeedMultiplier + 'x';
    }

    // Arrow keys for fine camera pan
    if (keyCode === LEFT_ARROW) {
        targetCamX -= 20;
    } else if (keyCode === RIGHT_ARROW) {
        targetCamX += 20;
    } else if (keyCode === UP_ARROW) {
        targetCamY -= 20;
        return false;
    } else if (keyCode === DOWN_ARROW) {
        targetCamY += 20;
        return false;
    }
}

// Update text colors based on mouse position
function updateTextColors() {
    // Calculate colors based on mouse position
    var hue1 = mouseHue;
    var hue2 = (mouseHue + 120) % 360;
    var hue3 = (mouseHue + 240) % 360;

    var saturation = map(mouseY, 0, height, 60, 100);
    var lightness = map(mouseX, 0, width, 50, 80);

    // Convert HSL to CSS format
    var color1 = 'hsl(' + hue1 + ', ' + saturation + '%, ' + lightness + '%)';
    var color2 = 'hsl(' + hue2 + ', ' + saturation + '%, ' + (lightness + 10) + '%)';
    var color3 = 'hsl(' + hue3 + ', ' + saturation + '%, ' + lightness + '%)';

    // Update text elements
    var h1 = document.querySelector('h1');
    var subtitle = document.querySelector('.subtitle');
    var infoText = document.querySelector('.info-text');
    var instructions = document.querySelectorAll('.instructions li');
    var labels = document.querySelectorAll('.control-group label');

    if (h1) h1.style.color = color1;
    if (subtitle) subtitle.style.color = color2;
    if (infoText) infoText.style.color = color3;

    // Update instruction items
    for (var i = 0; i < instructions.length; i++) {
        instructions[i].style.color = color3;
    }

    // Update labels
    for (var i = 0; i < labels.length; i++) {
        labels[i].style.color = color2;
    }
}

// Responsive canvas
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
