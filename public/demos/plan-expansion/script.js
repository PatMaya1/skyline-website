// ============================================
// QUANTUM DIGITAL - PLAN EXPANSIÓN
// Advanced Interactive Features
// ============================================

// ============================================
// MOBILE NAVIGATION
// ============================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const header = document.getElementById('header');
const navActions = document.querySelector('.nav-actions');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navActions.classList.toggle('active');

        // Animate hamburger
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

    // Close menu on link click
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navActions.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================
// SMOOTH SCROLLING
// ============================================

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

            // Track navigation
            console.log('🎯 Event: Navigation Click -', this.textContent.trim());
        }
    });
});

// ============================================
// INTERSECTION OBSERVER - SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Track section views
            const sectionId = entry.target.id || entry.target.className;
            console.log('📊 Analytics: Section View -', sectionId);
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

// Observe landing cards
const landingCards = document.querySelectorAll('.landing-card');
landingCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
});

// Observe KPI cards
const kpiCards = document.querySelectorAll('.kpi-card');
kpiCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe resource cards
const resourceCards = document.querySelectorAll('.resource-card');
resourceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
});

// Observe testimonial cards
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
});

// ============================================
// NEWSLETTER FORM HANDLING
// ============================================

const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = newsletterForm.querySelector('input[type="email"]').value;
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const originalBtnHTML = submitBtn.innerHTML;

        // Simulate automation
        console.log('📧 Automation Triggered: Newsletter Signup');
        console.log('📊 Analytics Event: Newsletter Subscribe -', email);
        console.log('🤖 CRM Action: Contact Added to Newsletter List');
        console.log('📨 Email Automation: Welcome Email Queued');

        // Update button state
        submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Suscrito!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

        setTimeout(() => {
            submitBtn.innerHTML = originalBtnHTML;
            submitBtn.style.background = '';
            newsletterForm.reset();
            alert('¡Gracias por suscribirte! 🎉\n\nEsta es una demo del Plan Expansión.\n\nEn un sitio real:\n✅ Recibirías un email de bienvenida automático\n✅ Serías agregado a nuestro CRM\n✅ Empezarías a recibir contenido semanal');
        }, 2500);
    });
}

// ============================================
// CONTACT FORM - ADVANCED VALIDATION & AUTOMATION
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                validateField(input);
            }
        });
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            alert('Por favor completa todos los campos obligatorios correctamente.');
            return;
        }

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Simulate advanced automation sequence
        console.log('%c🚀 PLAN EXPANSIÓN - AUTOMATION SEQUENCE STARTED', 'font-size: 16px; font-weight: bold; color: #7c3aed;');
        console.log('');

        console.log('📊 Step 1: Analytics Tracking');
        console.log('  └─ Google Analytics: Form Submit Event');
        console.log('  └─ Meta Pixel: Lead Event');
        console.log('  └─ LinkedIn Insight: Conversion Tracked');

        await simulateDelay(500);

        console.log('');
        console.log('🤖 Step 2: CRM Integration');
        console.log('  └─ Contact Created:', data.name);
        console.log('  └─ Email:', data.email);
        console.log('  └─ Company:', data.company || 'N/A');
        console.log('  └─ Service Interest:', data.service);
        console.log('  └─ Budget Range:', data.budget || 'Not specified');
        console.log('  └─ Lead Score: 85/100 (High Priority)');
        console.log('  └─ Assigned to: Sales Rep - María González');

        await simulateDelay(700);

        console.log('');
        console.log('📨 Step 3: Email Automation');
        console.log('  └─ Email #1 Queued: Immediate auto-response (within 2 min)');
        console.log('  └─ Email #2 Scheduled: Case study relevant to', data.service, '(+3 hours)');
        console.log('  └─ Email #3 Scheduled: Calendar link for demo (+24 hours)');

        await simulateDelay(500);

        console.log('');
        console.log('📲 Step 4: Multi-Channel Notification');
        console.log('  └─ SMS sent to assigned sales rep');
        console.log('  └─ Slack notification: #leads-hot channel');
        console.log('  └─ Mobile push to sales app');

        await simulateDelay(500);

        console.log('');
        console.log('🎯 Step 5: Lead Nurturing Workflow Started');
        console.log('  └─ Workflow: "High-Intent Service Inquiry"');
        console.log('  └─ Duration: 14-day nurture sequence');
        console.log('  └─ Touchpoints: 8 automated + 3 personal');

        await simulateDelay(500);

        console.log('');
        console.log('✅ AUTOMATION COMPLETE - Total time: <2 seconds');
        console.log('');

        // Update form UI
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnHTML = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> ¡Solicitud Enviada!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

        // Show success message
        setTimeout(() => {
            alert(
                '🎉 ¡Gracias por tu interés, ' + data.name + '!\n\n' +
                '📧 Recibirás un email automático en menos de 2 minutos\n' +
                '👤 Tu consultor asignado es: María González\n' +
                '📅 En 24 horas recibirás un enlace para agendar tu demo\n\n' +
                '⚡ Esta es una demo del Plan Expansión\n\n' +
                'En un sitio real, todas estas automatizaciones sucederían automáticamente:\n' +
                '✅ CRM integrado con datos en tiempo real\n' +
                '✅ Emails automáticos personalizados\n' +
                '✅ Notificaciones al equipo de ventas\n' +
                '✅ Seguimiento automático por 14 días\n' +
                '✅ Dashboards actualizados instantáneamente'
            );

            submitBtn.innerHTML = originalBtnHTML;
            submitBtn.style.background = '';
            contactForm.reset();

            // Reset validation states
            inputs.forEach(input => {
                input.classList.remove('valid', 'invalid');
                input.style.borderColor = '';
            });
        }, 3000);
    });
}

function validateField(field) {
    let isValid = true;

    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
    }

    if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
        }
    }

    if (field.type === 'tel' && field.value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(field.value) || field.value.replace(/\D/g, '').length < 10) {
            isValid = false;
        }
    }

    if (isValid) {
        field.style.borderColor = '#10b981';
        field.classList.add('valid');
        field.classList.remove('invalid');
    } else {
        field.style.borderColor = '#ef4444';
        field.classList.add('invalid');
        field.classList.remove('valid');
    }

    return isValid;
}

function simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// CTA & BUTTON TRACKING
// ============================================

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (!btn.getAttribute('href')?.startsWith('#') && !btn.type === 'submit') {
            const btnText = btn.textContent.trim();
            console.log('🎯 Event: CTA Click -', btnText);
            console.log('📊 Analytics: Button Interaction -', btnText);
        }
    });
});

// ============================================
// SERVICE CARD INTERACTION
// ============================================

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const serviceName = card.querySelector('h3').textContent;
        console.log('👀 Event: Service Card Hover -', serviceName);
    });

    card.addEventListener('click', () => {
        const serviceName = card.querySelector('h3').textContent;
        console.log('🎯 Event: Service Card Click -', serviceName);
        console.log('📊 Analytics: Service Interest -', serviceName);
    });
});

// ============================================
// LANDING PAGE CARD INTERACTION
// ============================================

landingCards.forEach(card => {
    card.addEventListener('click', () => {
        const landingTitle = card.querySelector('h3').textContent;
        console.log('🎯 Event: Landing Page Interest -', landingTitle);
        console.log('📊 Analytics: Landing Page Click');
    });
});

// ============================================
// RESOURCE CARD TRACKING
// ============================================

document.querySelectorAll('.resource-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const resourceTitle = link.closest('.resource-card').querySelector('h3').textContent;
        const category = link.closest('.resource-card').querySelector('.resource-category').textContent;

        console.log('📚 Event: Resource Click');
        console.log('  └─ Title:', resourceTitle);
        console.log('  └─ Category:', category);
        console.log('📊 Analytics: Content Download/View');

        // In a real implementation, would download or navigate
        alert('En un sitio real, este recurso se descargaría o se abriría en una nueva página.\n\nSe registraría en el CRM que mostraste interés en: ' + category);
    });
});

// ============================================
// SOCIAL MEDIA TRACKING
// ============================================

document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const platform = link.querySelector('i').className;
        console.log('🔗 Event: Social Media Click -', platform);
        console.log('📊 Analytics: External Link Click');
    });
});

// ============================================
// WHATSAPP BUTTON TRACKING
// ============================================

const whatsappBtn = document.querySelector('.whatsapp-float');
if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
        console.log('💬 Event: WhatsApp Click');
        console.log('📊 Analytics: Messaging Channel - WhatsApp');
        console.log('🤖 CRM: Contact interaction via WhatsApp logged');
    });
}

// ============================================
// SCROLL DEPTH TRACKING
// ============================================

let maxScroll = 0;
const scrollMilestones = [25, 50, 75, 100];
const reachedMilestones = new Set();

window.addEventListener('scroll', () => {
    const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;

        scrollMilestones.forEach(milestone => {
            if (scrollPercent >= milestone && !reachedMilestones.has(milestone)) {
                reachedMilestones.add(milestone);
                console.log(`📊 Analytics: Scroll Depth - ${milestone}%`);
            }
        });
    }
});

// ============================================
// TIME ON PAGE TRACKING
// ============================================

let startTime = Date.now();
const timeCheckInterval = 30000; // Every 30 seconds

setInterval(() => {
    const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
    console.log(`⏱️ Analytics: Time on Page - ${Math.floor(timeOnPage / 60)} min ${timeOnPage % 60} sec`);
}, timeCheckInterval);

// ============================================
// PAGE VISIBILITY TRACKING
// ============================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('👋 Event: User Left Page (Tab Hidden)');
    } else {
        console.log('👀 Event: User Returned to Page');
    }
});

// ============================================
// EXIT INTENT DETECTION
// ============================================

let exitIntentShown = false;

document.addEventListener('mouseout', (e) => {
    if (!e.toElement && !e.relatedTarget && !exitIntentShown) {
        if (e.clientY < 50) {
            exitIntentShown = true;
            console.log('🚪 Event: Exit Intent Detected');
            console.log('💡 Trigger: Exit popup could be shown here');

            // In a real implementation, show exit popup
            // For demo purposes, just log
        }
    }
});

// ============================================
// PAGE LOAD COMPLETE
// ============================================

window.addEventListener('load', () => {
    console.log('%c🚀 QUANTUM DIGITAL - PLAN EXPANSIÓN LOADED', 'font-size: 18px; font-weight: bold; color: #7c3aed; background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); padding: 10px 20px; border-radius: 8px; color: white;');
    console.log('');
    console.log('%c✨ FEATURES ACTIVAS:', 'font-size: 14px; font-weight: bold; color: #3b82f6;');
    console.log('');
    console.log('%c✅ SEO Avanzado con Schema.org', 'color: #10b981;');
    console.log('%c✅ Automatización CRM Completa', 'color: #10b981;');
    console.log('%c✅ Email Marketing Automation', 'color: #10b981;');
    console.log('%c✅ Analytics Avanzado (Google + Meta + LinkedIn)', 'color: #10b981;');
    console.log('%c✅ Lead Scoring Automático', 'color: #10b981;');
    console.log('%c✅ Multi-Channel Notifications', 'color: #10b981;');
    console.log('%c✅ Dashboard en Tiempo Real', 'color: #10b981;');
    console.log('%c✅ A/B Testing Framework', 'color: #10b981;');
    console.log('%c✅ Landing Pages Optimizadas', 'color: #10b981;');
    console.log('%c✅ Chatbot con IA (Simulado)', 'color: #10b981;');
    console.log('');
    console.log('%c📊 Abre la consola para ver el tracking en tiempo real', 'color: #6b7280; font-style: italic;');
    console.log('');
    console.log('%c💡 Esta demo muestra el Plan Expansión de SkyLine IT', 'color: #6b7280; font-style: italic;');
    console.log('%c   El plan más completo para empresas que quieren escalar', 'color: #6b7280; font-style: italic;');
    console.log('');

    // Track page load
    console.log('📊 Analytics Event: Page Load Complete');
    console.log('📈 Meta Pixel Event: PageView');
    console.log('💼 LinkedIn Insight: Page View');
});

// ============================================
// PAGE UNLOAD TRACKING
// ============================================

window.addEventListener('beforeunload', () => {
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    console.log('📊 Analytics: Session End');
    console.log(`  └─ Total Time: ${Math.floor(totalTime / 60)} min ${totalTime % 60} sec`);
    console.log(`  └─ Max Scroll Depth: ${maxScroll}%`);
});

// ============================================
// ADVANCED: HEATMAP DATA COLLECTION (Simulated)
// ============================================

let clickHeatmapData = [];

document.addEventListener('click', (e) => {
    const clickData = {
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
        element: e.target.tagName,
        class: e.target.className
    };

    clickHeatmapData.push(clickData);

    // In a real implementation, this would be sent to an analytics backend
    // For demo, we just collect it

    if (clickHeatmapData.length % 10 === 0) {
        console.log('🎯 Heatmap: Collected', clickHeatmapData.length, 'click events');
    }
});

// ============================================
// ADVANCED: USER SESSION RECORDING (Simulated)
// ============================================

const sessionData = {
    sessionId: 'demo-' + Date.now(),
    startTime: new Date().toISOString(),
    events: [],
    userAgent: navigator.userAgent,
    screenSize: `${window.screen.width}x${window.screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`
};

function logSessionEvent(eventType, data) {
    sessionData.events.push({
        timestamp: Date.now() - startTime,
        type: eventType,
        data: data
    });

    // In a real implementation, batch send to backend
}

// Track key session events
window.addEventListener('scroll', () => {
    logSessionEvent('scroll', { scrollY: window.scrollY });
});

// ============================================
// ADVANCED: A/B TESTING FRAMEWORK (Simulated)
// ============================================

const abTestVariant = Math.random() < 0.5 ? 'A' : 'B';
console.log('🧪 A/B Test: User assigned to variant', abTestVariant);

// In a real implementation, this would:
// - Show different versions of elements
// - Track conversion rates per variant
// - Automatically determine winner

// ============================================
// CHATBOT SIMULATION
// ============================================

// Simulate chatbot behavior after 10 seconds
setTimeout(() => {
    console.log('');
    console.log('%c💬 CHATBOT CON IA ACTIVADO', 'font-size: 14px; font-weight: bold; color: #7c3aed;');
    console.log('');
    console.log('  Usuario ha estado en la página 10 segundos sin interactuar');
    console.log('  └─ En un sitio real, el chatbot aparecería con:');
    console.log('     "👋 ¡Hola! ¿Tienes alguna pregunta sobre nuestros servicios?"');
    console.log('');
    console.log('  Funcionalidades del chatbot:');
    console.log('  ✅ Respuestas automáticas con IA');
    console.log('  ✅ Calificación de leads');
    console.log('  ✅ Agendamiento de citas');
    console.log('  ✅ Handoff a agente humano si es necesario');
    console.log('');
}, 10000);

console.log('');
console.log('%c🎉 Todo listo! Navega por el sitio y observa la consola', 'color: #7c3aed; font-weight: bold;');
console.log('');
