// This script adds cool features to the navbar across all pages

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
});

function initNavbar() {
    // Add notification badge to Messages link
    addMessagesBadge();

    // Add scroll effect to navbar
    addScrollEffect();

    // Add active page indicator animation
    animateActivePage();

    // Add tooltips on hover (for desktop)
    addTooltips();
}

// Add unread messages badge
function addMessagesBadge() {
    const messagesLinks = document.querySelectorAll('a[href="Messages.html"]');
    messagesLinks.forEach(link => {
        // Simulate unread messages (in real app, this would come from backend)
        const unreadCount = Math.floor(Math.random() * 5) + 1; // 1-5 unread messages

        if (unreadCount > 0) {
            const badge = document.createElement('span');
            badge.className = 'notification-badge';
            badge.textContent = unreadCount;
            link.style.position = 'relative';
            link.appendChild(badge);
        }
    });
}

// Add scroll effect - navbar becomes more opaque when scrolling
function addScrollEffect() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // Initial check
    updateNavbar();
}

// Animate the active page indicator
function animateActivePage() {
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink && !activeLink.querySelector('.active-indicator')) {
        const indicator = document.createElement('span');
        indicator.className = 'active-indicator';
        activeLink.appendChild(indicator);
    }
}

// Add tooltips for navigation items
function addTooltips() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const text = link.textContent.trim();
        link.setAttribute('data-tooltip', text);
    });
}

// Add CSS for navbar enhancements
const style = document.createElement('style');
style.textContent = `
    /* Notification Badge */
    .notification-badge {
        position: absolute;
        top: 8px;
        right: 8px;
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: white;
        font-size: 0.7rem;
        font-weight: 700;
        padding: 0.15rem 0.4rem;
        border-radius: 10px;
        min-width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: pulse-badge 2s infinite;
        box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
    }

    @keyframes pulse-badge {
        0%, 100% {
            transform: scale(1);
            box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
        }
        50% {
            transform: scale(1.1);
            box-shadow: 0 2px 12px rgba(239, 68, 68, 0.6);
        }
    }

    /* Active Page Indicator */
    .active-indicator {
        position: absolute;
        bottom: -2px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 3px;
        background: linear-gradient(90deg, transparent, white, transparent);
        animation: expandIndicator 0.5s ease-out forwards;
        border-radius: 2px;
    }

    @keyframes expandIndicator {
        from {
            width: 0;
        }
        to {
            width: 80%;
        }
    }

    /* Smooth navbar transitions */
    .navbar {
        transition: background 0.3s ease, box-shadow 0.3s ease;
    }

    /* Nav link enhancements */
    .nav-link {
        position: relative;
        overflow: visible;
    }

    .nav-link::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%) scaleX(0);
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
        transition: transform 0.3s ease;
    }

    .nav-link:hover::before {
        transform: translateX(-50%) scaleX(1);
    }

    /* Logo pulse on hover */
    .nav-logo {
        transition: transform 0.3s ease;
        cursor: pointer;
    }

    .nav-logo:hover {
        transform: scale(1.05);
    }

    .nav-logo i {
        transition: transform 0.3s ease;
    }

    .nav-logo:hover i {
        transform: rotate(10deg);
    }

    /* Divider styling */
    .nav-divider {
        width: 1px;
        height: 30px;
        background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        margin: 0 0.5rem;
        align-self: center;
    }

    /* Mobile menu improvements */
    @media (max-width: 768px) {
        .notification-badge {
            top: 5px;
            right: 5px;
        }

        .nav-divider {
            width: 80%;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            margin: 0.5rem auto;
        }
    }

    /* Accessibility - focus states */
    .nav-link:focus {
        outline: 2px solid rgba(255, 255, 255, 0.5);
        outline-offset: 2px;
    }

    /* Better hamburger animation */
    .hamburger {
        transition: transform 0.3s ease;
    }

    .hamburger:hover {
        transform: scale(1.1);
    }

    .hamburger.active {
        transform: rotate(90deg);
    }
`;
document.head.appendChild(style);

// Make logo clickable to go home
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.nav-logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // Enhanced mobile menu behavior
    setupEnhancedMobileMenu();
});

// Enhanced mobile menu
function setupEnhancedMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;

    console.log('[navbar.js] Setup mobile menu:', { hamburger, navMenu });

    if (!hamburger || !navMenu) {
        console.error('[navbar.js] Hamburger or navMenu not found!');
        return;
    }

    // Check if already initialized by inline script
    if (hamburger.dataset.navbarJsInitialized) {
        console.log('[navbar.js] Already initialized by inline script, skipping');
        return;
    }

    // Mark as initialized
    hamburger.dataset.navbarJsInitialized = 'true';

    // Hamburger click to toggle menu
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('[navbar.js] Hamburger clicked!');

        const isActive = navMenu.classList.contains('active');

        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        body.style.overflow = isActive ? '' : 'hidden';

        console.log('[navbar.js] Menu toggled. Active:', !isActive);
    });

    // Close menu when clicking outside (on overlay)
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Close menu and restore scroll when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            body.style.overflow = '';
        }
    });

    console.log('[navbar.js] Mobile menu initialized successfully');
}
