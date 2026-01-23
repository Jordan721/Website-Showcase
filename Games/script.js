// ========================================
// Sound Effects System
// ========================================

class SoundEffects {
    constructor() {
        this.audioContext = null;
        this.enabled = localStorage.getItem('soundEnabled') !== 'false';
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.initialized = true;
    }

    play(type) {
        if (!this.enabled) return;

        // Initialize on first interaction
        if (!this.initialized) {
            this.init();
        }

        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        const now = this.audioContext.currentTime;

        switch (type) {
            case 'hover':
                // Short blip sound
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(800, now);
                oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                oscillator.start(now);
                oscillator.stop(now + 0.1);
                break;

            case 'click':
                // Satisfying click
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(600, now);
                oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.1);
                gainNode.gain.setValueAtTime(0.15, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                oscillator.start(now);
                oscillator.stop(now + 0.15);
                break;

            case 'success':
                // Ascending arpeggio
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(523, now); // C5
                oscillator.frequency.setValueAtTime(659, now + 0.1); // E5
                oscillator.frequency.setValueAtTime(784, now + 0.2); // G5
                gainNode.gain.setValueAtTime(0.12, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
                oscillator.start(now);
                oscillator.stop(now + 0.4);
                break;

            case 'toggle':
                // Toggle switch sound
                oscillator.type = 'triangle';
                oscillator.frequency.setValueAtTime(this.enabled ? 880 : 440, now);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                oscillator.start(now);
                oscillator.stop(now + 0.1);
                break;

            case 'download':
                // Download whoosh
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(400, now);
                oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.3);
                gainNode.gain.setValueAtTime(0.08, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                oscillator.start(now);
                oscillator.stop(now + 0.3);
                break;
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('soundEnabled', this.enabled);
        this.play('toggle');
        return this.enabled;
    }
}

const sfx = new SoundEffects();

// Sound Toggle Button
const soundToggle = document.getElementById('soundToggle');
const soundIcon = document.getElementById('soundIcon');

if (soundToggle) {
    // Set initial state
    if (!sfx.enabled) {
        soundToggle.classList.add('muted');
        soundIcon.className = 'fas fa-volume-mute';
    }

    soundToggle.addEventListener('click', () => {
        const enabled = sfx.toggle();
        soundToggle.classList.toggle('muted', !enabled);
        soundIcon.className = enabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
    });
}

// Add sound effects to interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Game cards hover
    document.querySelectorAll('.game-card:not(.empty-slot)').forEach(card => {
        card.addEventListener('mouseenter', () => sfx.play('hover'));
        card.addEventListener('click', () => sfx.play('click'));
    });

    // Download cards
    document.querySelectorAll('.download-card').forEach(card => {
        card.addEventListener('mouseenter', () => sfx.play('hover'));
        card.addEventListener('click', () => sfx.play('download'));
    });

    // Buttons
    document.querySelectorAll('button, .back-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => sfx.play('hover'));
        btn.addEventListener('click', () => sfx.play('click'));
    });

    // Stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', () => sfx.play('hover'));
    });
});

// ========================================
// Background Canvas Animation
// ========================================

const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Particle class
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = this.getRandomColor();
    }

    getRandomColor() {
        const colors = ['#e94560', '#00d4ff', '#a855f7', '#4ade80'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction
        if (mouse.x && mouse.y) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const force = (100 - distance) / 100;
                this.x -= dx * force * 0.02;
                this.y -= dy * force * 0.02;
            }
        }

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

// Initialize particles
function initParticles() {
    particles = [];
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

initParticles();
window.addEventListener('resize', initParticles);

// Draw connections between nearby particles
function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(233, 69, 96, ${0.1 * (1 - distance / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    ctx.fillStyle = 'rgba(5, 5, 8, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    drawConnections();
    requestAnimationFrame(animate);
}

animate();

// ========================================
// Typing Animation
// ========================================

const phrases = [
    "Where games come to life...",
    "Built with code and passion",
    "Challenge yourself...",
    "Can you beat them all?",
    "More games coming soon..."
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

const typingElement = document.querySelector('.typing-text');

function typeText() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before next phrase
    }

    setTimeout(typeText, typingSpeed);
}

typeText();

// ========================================
// Number Counter Animation
// ========================================

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                const duration = 2000;
                const start = 0;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const current = Math.floor(start + (count - start) * easeOutQuart);

                    target.textContent = current.toLocaleString();

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }

                requestAnimationFrame(updateCounter);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

animateCounters();

// ========================================
// Konami Code Easter Egg
// ========================================

const konamiCode = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;

        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    sfx.play('success');
    const overlay = document.getElementById('easterEgg');
    overlay.classList.add('active');

    // Add some extra flair
    document.body.style.animation = 'none';
    setTimeout(() => {
        document.body.style.animation = 'rainbowBg 2s linear infinite';
    }, 10);

    // Create confetti
    createConfetti();
}

function closeEasterEgg() {
    const overlay = document.getElementById('easterEgg');
    overlay.classList.remove('active');
    document.body.style.animation = 'none';
}

// Make closeEasterEgg available globally
window.closeEasterEgg = closeEasterEgg;

// Confetti effect
function createConfetti() {
    const colors = ['#e94560', '#00d4ff', '#a855f7', '#4ade80', '#facc15'];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            z-index: 3000;
            pointer-events: none;
            animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
        `;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
    }
}

// Add confetti animation to page
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    @keyframes rainbowBg {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(confettiStyle);

// ========================================
// Game Card Hover Sound Effect (Visual)
// ========================================

const gameCards = document.querySelectorAll('.game-card:not(.coming-soon):not(.empty-slot)');

gameCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Create a visual "click" indicator
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            border: 2px solid var(--primary);
            border-radius: 50%;
            animation: ripple 0.6s ease-out forwards;
            pointer-events: none;
            z-index: 100;
        `;
        card.style.position = 'relative';
        card.appendChild(indicator);

        setTimeout(() => indicator.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ========================================
// Smooth Scroll
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Parallax Effect on Scroll
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const titleSection = document.querySelector('.title-section');

    if (titleSection) {
        titleSection.style.transform = `translateY(${scrolled * 0.3}px)`;
        titleSection.style.opacity = 1 - (scrolled / 700);
    }
});

// ========================================
// Random Origin Quote
// ========================================

const originQuotes = [
    {
        text: "Every expert was once a beginner.",
        author: "Helen Hayes"
    },
    {
        text: "The secret of getting ahead is getting started.",
        author: "Mark Twain"
    },
    {
        text: "Small steps lead to big changes.",
        author: "Unknown"
    },
    {
        text: "You don't have to be great to start, but you have to start to be great.",
        author: "Zig Ziglar"
    },
    {
        text: "The journey of a thousand miles begins with a single step.",
        author: "Lao Tzu"
    },
    {
        text: "Great things are not done by impulse, but by a series of small things brought together.",
        author: "Vincent Van Gogh"
    },
    {
        text: "What you do today can improve all your tomorrows.",
        author: "Ralph Marston"
    },
    {
        text: "From small beginnings come great things.",
        author: "Proverb"
    }
];

function displayRandomQuote() {
    const quoteElement = document.getElementById('origin-quote');
    const authorElement = document.getElementById('quote-author');

    if (quoteElement && authorElement) {
        const randomQuote = originQuotes[Math.floor(Math.random() * originQuotes.length)];
        quoteElement.textContent = `"${randomQuote.text}"`;
        authorElement.textContent = `— ${randomQuote.author}`;
    }
}

displayRandomQuote();

// ========================================
// Initialize
// ========================================

console.log('%c🎮 GAME VAULT LOADED', 'color: #e94560; font-size: 20px; font-weight: bold;');
console.log('%cTry the Konami Code: ↑↑↓↓←→←→BA', 'color: #00d4ff; font-size: 12px;');
