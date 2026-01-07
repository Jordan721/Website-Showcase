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
}

animationToggle.addEventListener('click', () => {
    const isPaused = animatedBackground.classList.contains('paused');

    if (isPaused) {
        animatedBackground.classList.remove('paused');
        animationToggle.classList.remove('paused');
        toggleIcon.classList.remove('fa-pause');
        toggleIcon.classList.add('fa-play');
        localStorage.setItem('animationsEnabled', 'true');
    } else {
        animatedBackground.classList.add('paused');
        animationToggle.classList.add('paused');
        toggleIcon.classList.remove('fa-play');
        toggleIcon.classList.add('fa-pause');
        localStorage.setItem('animationsEnabled', 'false');
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

// Parallax effect for background
function parallaxScroll() {
    const scrolled = window.pageYOffset;
    const animatedBg = document.getElementById('animatedBackground');
    if (animatedBg && !animatedBg.classList.contains('paused')) {
        // Move background UP slightly as you scroll down for subtle depth effect
        animatedBg.style.transform = `translateY(${scrolled * -0.15}px)`;
    }
}

window.addEventListener('scroll', () => {
    // Update scroll progress bar
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrollPercentage + '%';

    // Parallax effect
    parallaxScroll();

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
