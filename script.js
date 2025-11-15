// ===================================
// THEME TOGGLE
// ===================================
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    updateThemeIcon(true);
}

themeToggle?.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
});

function updateThemeIcon(isDark) {
    if (themeToggle) {
        themeToggle.innerHTML = isDark ? '☀️' : '🌙';
    }
}

// ===================================
// MOBILE MENU TOGGLE
// ===================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
    const isActive = navMenu?.classList.contains('active');
    mobileMenuToggle.innerHTML = isActive ? '✕' : '☰';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
        if (mobileMenuToggle) {
            mobileMenuToggle.innerHTML = '☰';
        }
    });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = navbar?.offsetHeight || 70;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .stat-card, .skill-category, .experience-item, .project-card, .education-card, .certification-card, .award-item').forEach(el => {
    observer.observe(el);
});

// ===================================
// DYNAMIC YEAR IN FOOTER
// ===================================
const yearElement = document.getElementById('current-year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ===================================
// TYPING EFFECT FOR HERO SUBTITLE (Optional Enhancement)
// ===================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// const heroSubtitle = document.querySelector('.hero-subtitle');
// if (heroSubtitle) {
//     const originalText = heroSubtitle.textContent;
//     setTimeout(() => typeWriter(heroSubtitle, originalText, 50), 1000);
// }

// ===================================
// BACK TO TOP BUTTON
// ===================================
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopButton.addEventListener('mouseenter', () => {
    backToTopButton.style.transform = 'translateY(-5px)';
});

backToTopButton.addEventListener('mouseleave', () => {
    backToTopButton.style.transform = 'translateY(0)';
});

// ===================================
// INITIALIZE
// ===================================
console.log('🚀 Portfolio site loaded successfully!');
