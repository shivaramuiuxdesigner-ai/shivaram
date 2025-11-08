// ===========================
// Portfolio Website JavaScript
// ===========================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================
    // Navigation & Scroll Handling
    // ===========================
    
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const scrollTopBtn = document.getElementById('scrollTop');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Show/hide scroll to top button
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ===========================
    // Mobile Menu Toggle
    // ===========================
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ===========================
    // Scroll to Top Button
    // ===========================
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===========================
    // Intersection Observer for Scroll Animations
    // ===========================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in animation
    const fadeElements = document.querySelectorAll('.about-content, .project-card, .skill-card, .contact-content');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // ===========================
    // Contact Form Handling
    // ===========================
    
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual backend integration)
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // ===========================
    // Notification System
    // ===========================
    
    function showNotification(message, type = 'success') {
        // Remove any existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: ${type === 'success' ? '#14b8a6' : '#ef4444'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
    
    // Add notification animations to document
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
            font-family: 'Poppins', sans-serif;
            font-size: 0.95rem;
        }
        
        .notification-content i {
            font-size: 1.25rem;
        }
    `;
    document.head.appendChild(style);
    
    // ===========================
    // Resume Download Button
    // ===========================
    
    const resumeBtn = document.getElementById('resumeBtn');
    
  //  resumeBtn.addEventListener('click', function(e) {
   //     e.preventDefault();
  //      showNotification('Resume download feature - Please add your resume file to enable downloads', 'success');
        // In production, replace with actual download link:
        // window.open('path/to/your/resume.pdf', '_blank');
 //   });
    
    // ===========================
    // Project Cards Hover Effect
    // ===========================
    
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // ===========================
    // Skill Cards Animation
    // ===========================
    
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // ===========================
    // Dynamic Year in Footer
    // ===========================
    
    const updateFooterYear = function() {
        const footerText = document.querySelector('.footer-text');
        const currentYear = new Date().getFullYear();
        if (footerText) {
            footerText.innerHTML = `© ${currentYear} Neelakantam Shiva Ram Prasad | Designed with <i class="fas fa-heart"></i> using HTML, CSS & JS.`;
        }
    };
    
    updateFooterYear();
    
    // ===========================
    // Parallax Effect for Hero Section
    // ===========================
    
    const floatingShapes = document.querySelectorAll('.floating-shape');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        floatingShapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ===========================
    // Typing Effect for Hero Title (Optional Enhancement)
    // ===========================
    
    function initTypingEffect() {
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (!heroSubtitle) return;
        
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        heroSubtitle.style.opacity = '1';
        
        let index = 0;
        const typingSpeed = 30;
        
        function type() {
            if (index < text.length) {
                heroSubtitle.textContent += text.charAt(index);
                index++;
                setTimeout(type, typingSpeed);
            }
        }
        
        // Start typing after a short delay
        setTimeout(type, 500);
    }
    
    // Uncomment to enable typing effect
    // initTypingEffect();
    
    // ===========================
    // Smooth Reveal on Page Load
    // ===========================
    
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero content
        const heroContent = document.querySelector('.hero-content');
        const heroIllustration = document.querySelector('.hero-illustration');
        
        if (heroContent) {
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 100);
        }
        
        if (heroIllustration) {
            setTimeout(() => {
                heroIllustration.style.opacity = '1';
                heroIllustration.style.transform = 'translateX(0)';
            }, 300);
        }
    });
    
    // ===========================
    // Add Loading State
    // ===========================
    
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body:not(.loaded) .hero-content,
        body:not(.loaded) .hero-illustration {
            opacity: 0;
        }
        
        body.loaded .hero-content,
        body.loaded .hero-illustration {
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
    `;
    document.head.appendChild(loadingStyle);
    
    // ===========================
    // Console Welcome Message
    // ===========================
    
    console.log('%c Welcome to My Portfolio! ', 'background: #14b8a6; color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
    console.log('%c Designed and Developed by Neelakantam Shiva Ram Prasad ', 'font-size: 12px; color: #14b8a6;');
    console.log('%c Looking for opportunities in UI/UX Design! ', 'font-size: 12px; color: #64748b;');
    
    // ===========================
    // Performance Optimization
    // ===========================
    
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debounce to scroll-heavy functions
    const debouncedScroll = debounce(function() {
        updateActiveNavLink();
    }, 100);
    
    window.addEventListener('scroll', debouncedScroll);
    
});

// ===========================
// Service Worker Registration (Optional for PWA)
// ===========================

// Uncomment to enable PWA features
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(error => console.log('SW registration failed:', error));
    });
}
*/
