// Constellation Background Animation
const canvas = document.getElementById('constellationCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
let animationId;
let isAnimating = true;

// Configuration
const config = {
    particleCount: 80,
    particleSize: 2,
    lineDistance: 150,
    particleSpeed: 0.3,
    primaryColor: 'rgba(168, 85, 247, ',  // Purple
    secondaryColor: 'rgba(192, 132, 252, ', // Light purple
};

// Resize canvas to window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * config.particleSpeed;
        this.vy = (Math.random() - 0.5) * config.particleSpeed;
        this.size = Math.random() * config.particleSize + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseOffset = Math.random() * Math.PI * 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Pulse effect
        this.currentOpacity = this.opacity + Math.sin(Date.now() * this.pulseSpeed + this.pulseOffset) * 0.2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = config.primaryColor + this.currentOpacity + ')';
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = config.primaryColor + (this.currentOpacity * 0.3) + ')';
        ctx.fill();
    }
}

// Initialize particles
function initParticles() {
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
        particles.push(new Particle());
    }
}

// Draw lines between nearby particles
function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < config.lineDistance) {
                const opacity = (1 - distance / config.lineDistance) * 0.4;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = config.secondaryColor + opacity + ')';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    if (!isAnimating) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Draw connecting lines
    drawLines();

    animationId = requestAnimationFrame(animate);
}

// Start animation
function startAnimation() {
    isAnimating = true;
    animate();
}

// Stop animation
function stopAnimation() {
    isAnimating = false;
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
}

// Initialize
resizeCanvas();
initParticles();

// Handle window resize
window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

// Animation toggle functionality
const animationToggle = document.getElementById('animationToggle');
const animatedBackground = document.getElementById('animatedBackground');
const toggleIcon = animationToggle.querySelector('i');

// Check localStorage for saved preference
const animationsEnabled = localStorage.getItem('animationsEnabled') !== 'false';

// Set initial state
if (!animationsEnabled) {
    animatedBackground.classList.add('paused');
    animationToggle.classList.add('paused');
    toggleIcon.classList.remove('fa-play');
    toggleIcon.classList.add('fa-pause');
    stopAnimation();
} else {
    startAnimation();
}

animationToggle.addEventListener('click', () => {
    const isPaused = animatedBackground.classList.contains('paused');

    if (isPaused) {
        animatedBackground.classList.remove('paused');
        animationToggle.classList.remove('paused');
        toggleIcon.classList.remove('fa-pause');
        toggleIcon.classList.add('fa-play');
        localStorage.setItem('animationsEnabled', 'true');
        startAnimation();
    } else {
        animatedBackground.classList.add('paused');
        animationToggle.classList.add('paused');
        toggleIcon.classList.remove('fa-play');
        toggleIcon.classList.add('fa-pause');
        localStorage.setItem('animationsEnabled', 'false');
        stopAnimation();
    }
});

// Toggle category function
function toggleCategory(categoryId) {
    const content = document.getElementById(categoryId);
    const header = content.previousElementSibling;
    const arrow = header.querySelector('.folder-arrow i');
    const categorySection = content.parentElement;

    if (categorySection.classList.contains('active')) {
        categorySection.classList.remove('active');
        arrow.style.transform = 'rotate(0deg)';
    } else {
        categorySection.classList.add('active');
        arrow.style.transform = 'rotate(90deg)';
    }
}

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Update active navigation dot on scroll
const sections = document.querySelectorAll('.section, .hero');
const navDots = document.querySelectorAll('.nav-dot');

// Scroll Progress Bar
const scrollProgress = document.getElementById('scrollProgress');

// Reveal on scroll animation
const revealElements = document.querySelectorAll('.category-section');

function reveal() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add('reveal');
        }
    });
}


window.addEventListener('scroll', () => {
    // Update scroll progress bar
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrollPercentage + '%';

    // Reveal animations
    reveal();

    // Navigation dots
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-section') === current) {
            dot.classList.add('active');
        }
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Initial reveal check on page load
window.addEventListener('load', reveal);

// Back to top button click
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// GitHub Commits Functionality
const GITHUB_API_URL = 'https://api.github.com/repos/Jordan721/Development-Showcase/commits';
const COMMITS_LIMIT = 5;

// Format relative time
function formatRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffSecs < 60) return 'just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
}

// Create commit card HTML
function createCommitCard(commit) {
    const { sha, commit: commitData, author, html_url } = commit;
    const shortSha = sha.substring(0, 7);
    const message = commitData.message.split('\n')[0]; // First line only
    const authorName = commitData.author.name;
    const authorAvatar = author?.avatar_url || 'https://github.com/identicons/default.png';
    const date = commitData.author.date;
    const relativeTime = formatRelativeTime(date);

    return `
        <div class="commit-card">
            <div class="commit-header">
                <img src="${authorAvatar}" alt="${authorName}" class="commit-avatar">
                <div class="commit-meta">
                    <div class="commit-author">
                        <strong>${authorName}</strong>
                        <a href="${html_url}" target="_blank" class="commit-sha" title="View commit on GitHub">
                            <i class="fab fa-github"></i>
                            ${shortSha}
                        </a>
                    </div>
                    <div class="commit-date">
                        <i class="fas fa-clock"></i>
                        ${relativeTime}
                    </div>
                </div>
            </div>
            <div class="commit-message">${message}</div>
        </div>
    `;
}

// Fetch and display commits
async function fetchCommits() {
    const commitsList = document.getElementById('commitsList');
    const refreshBtn = document.getElementById('refreshCommits');

    try {
        // Show loading state
        commitsList.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading commits...</p>
            </div>
        `;

        // Add spinning class to refresh button
        refreshBtn.classList.add('spinning');

        const response = await fetch(`${GITHUB_API_URL}?per_page=${COMMITS_LIMIT}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const commits = await response.json();

        // Clear loading state
        commitsList.innerHTML = '';

        // Create commit cards
        commits.forEach(commit => {
            commitsList.innerHTML += createCommitCard(commit);
        });

    } catch (error) {
        console.error('Error fetching commits:', error);
        commitsList.innerHTML = `
            <div class="error-message glass-card">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Failed to load commits. Please try again later.</p>
            </div>
        `;
    } finally {
        // Remove spinning class after a short delay
        setTimeout(() => {
            refreshBtn.classList.remove('spinning');
        }, 500);
    }
}

// Refresh button click handler
document.getElementById('refreshCommits').addEventListener('click', fetchCommits);

// Load commits on page load
window.addEventListener('load', fetchCommits);
