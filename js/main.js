// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.querySelector('.back-to-top');
const preloader = document.querySelector('.preloader');

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.documentElement.setAttribute(
        'data-theme',
        document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
    localStorage.setItem('theme', document.documentElement.getAttribute('data-theme'));
});

// Set initial theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    }, 1000);
});

// Tab Functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // Update active tab button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Show corresponding tab content
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === tabId) {
                content.classList.add('active');
            }
        });
    });
});

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
const formMessage = document.querySelector('.form-message');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    
    // Simulate form submission
    formMessage.textContent = 'Thank you for subscribing!';
    formMessage.style.color = 'var(--accent)';
    newsletterForm.reset();
    
    setTimeout(() => {
        formMessage.textContent = '';
    }, 3000);
});

// Text animation for hero title
const animateText = document.querySelector('.anim-text');
if (animateText) {
    animateText.style.animationDelay = '0.5s';
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.language-card, .feature-card, .section-header').forEach(el => {
    observer.observe(el);
});