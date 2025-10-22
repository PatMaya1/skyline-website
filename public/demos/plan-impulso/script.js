// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const header = document.getElementById('header');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Track event (Google Analytics simulation)
            console.log('📊 Analytics Event: Navigation Click -', this.textContent.trim());
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Portfolio Filter - Plan Impulso Feature
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // Track filter event
        console.log('📊 Analytics Event: Portfolio Filter -', filter);

        portfolioItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                item.style.animation = `fadeIn 0.5s ease ${index * 0.1}s forwards`;
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Track section view (Google Analytics simulation)
            const sectionId = entry.target.id || entry.target.className;
            console.log('📊 Analytics Event: Section View -', sectionId);
        }
    });
}, observerOptions);

// Observe service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe blog cards
const blogCards = document.querySelectorAll('.blog-card');
blogCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe testimonials
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
});

// Contact Form Handling - Plan Impulso Feature
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Validation
    const requiredFields = ['name', 'email', 'phone', 'service'];
    let isValid = true;

    requiredFields.forEach(field => {
        const input = contactForm.querySelector(`[name="${field}"]`);
        if (!data[field]) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#10b981';
        }
    });

    if (isValid) {
        // Track conversion event (Google Analytics simulation)
        console.log('📊 Analytics Event: Form Submission - Contact');
        console.log('📈 Meta Pixel Event: Lead');
        console.log('Form Data:', data);

        // Show success message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Solicitud Enviada!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            contactForm.reset();

            // Reset border colors
            contactForm.querySelectorAll('input, select, textarea').forEach(field => {
                field.style.borderColor = '';
            });
        }, 3000);

        // In a real implementation, this would send to a server
        alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.\n\nEsta es una demo del Plan Impulso.');
    } else {
        alert('Por favor completa todos los campos obligatorios.');
    }
});

// Track CTA clicks
document.querySelectorAll('.btn, .service-cta, .blog-link').forEach(btn => {
    btn.addEventListener('click', () => {
        const ctaText = btn.textContent.trim();
        console.log('📊 Analytics Event: CTA Click -', ctaText);
        console.log('📈 Meta Pixel Event: Click -', ctaText);
    });
});

// Track WhatsApp button clicks
document.querySelector('.whatsapp-float').addEventListener('click', () => {
    console.log('📊 Analytics Event: WhatsApp Click');
    console.log('📈 Meta Pixel Event: Contact - WhatsApp');
});

// Track social media clicks
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', () => {
        const platform = link.querySelector('i').className;
        console.log('📊 Analytics Event: Social Click -', platform);
    });
});

// Portfolio item hover effect
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const category = item.getAttribute('data-category');
        console.log('📊 Analytics Event: Portfolio Hover -', category);
    });

    item.addEventListener('click', () => {
        const category = item.getAttribute('data-category');
        console.log('📊 Analytics Event: Portfolio Click -', category);
        // In a real implementation, this would open a lightbox or detail view
    });
});

// Page load tracking
window.addEventListener('load', () => {
    console.log('📊 Analytics Event: Page Load');
    console.log('📈 Meta Pixel Event: PageView');
    console.log('%c🚀 Plan Impulso Features Active:', 'font-size: 16px; font-weight: bold; color: #2563eb;');
    console.log('%c✅ Google Analytics (simulated)', 'color: #10b981;');
    console.log('%c✅ Meta Pixel (simulated)', 'color: #10b981;');
    console.log('%c✅ SEO Optimized Structure', 'color: #10b981;');
    console.log('%c✅ Blog Section Integrated', 'color: #10b981;');
    console.log('%c✅ Advanced Form Validation', 'color: #10b981;');
    console.log('%c✅ Conversion Tracking', 'color: #10b981;');
});

// Simulate page exit tracking
window.addEventListener('beforeunload', () => {
    console.log('📊 Analytics Event: Page Exit');
});

// Track time on page
let startTime = Date.now();
setInterval(() => {
    const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
    if (timeOnPage % 30 === 0) { // Every 30 seconds
        console.log(`📊 Analytics Event: Time on Page - ${timeOnPage} seconds`);
    }
}, 1000);

// Scroll depth tracking
let maxScroll = 0;
window.addEventListener('scroll', () => {
    const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
    if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        console.log(`📊 Analytics Event: Scroll Depth - ${scrollPercent}%`);
    }
});
