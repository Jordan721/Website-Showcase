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

window.addEventListener('scroll', () => {
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

// Back to top button click
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
