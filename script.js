// Particle System
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.container = document.querySelector('.particles-container');
        this.init();
    }

    init() {
        for (let i = 0; i < 50; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 4 + 1;
        
        // Random color from neon palette
        const colors = [
            'rgba(0, 243, 255, 0.5)',
            'rgba(157, 0, 255, 0.5)',
            'rgba(0, 255, 136, 0.5)',
            'rgba(255, 222, 0, 0.5)'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${x}vw;
            top: ${y}vh;
            filter: blur(1px);
            z-index: -1;
        `;
        
        this.container.appendChild(particle);
        this.particles.push({
            element: particle,
            x,
            y,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            size
        });
    }

    update() {
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x > 100) particle.x = 0;
            if (particle.x < 0) particle.x = 100;
            if (particle.y > 100) particle.y = 0;
            if (particle.y < 0) particle.y = 100;
            
            particle.element.style.left = `${particle.x}vw`;
            particle.element.style.top = `${particle.y}vh`;
            
            // Pulsing effect
            const scale = 1 + Math.sin(Date.now() * 0.001 + particle.x) * 0.3;
            particle.element.style.transform = `scale(${scale})`;
        });
    }
}

// Glitch Text Effect
class GlitchEffect {
    constructor(element) {
        this.element = element;
        this.originalText = element.textContent;
        this.isGlitching = false;
        this.init();
    }

    init() {
        this.element.addEventListener('mouseenter', () => this.startGlitch());
        this.element.addEventListener('mouseleave', () => this.stopGlitch());
    }

    startGlitch() {
        if (this.isGlitching) return;
        this.isGlitching = true;
        this.glitchInterval = setInterval(() => this.applyGlitch(), 100);
    }

    stopGlitch() {
        this.isGlitching = false;
        clearInterval(this.glitchInterval);
        this.element.textContent = this.originalText;
        this.element.style.color = '';
    }

    applyGlitch() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
        let glitchedText = '';
        
        for (let i = 0; i < this.originalText.length; i++) {
            if (Math.random() < 0.3) {
                glitchedText += chars.charAt(Math.floor(Math.random() * chars.length));
            } else {
                glitchedText += this.originalText.charAt(i);
            }
        }
        
        this.element.textContent = glitchedText;
        this.element.style.color = Math.random() < 0.5 ? '#00f3ff' : '#9d00ff';
    }
}

// Floating Elements
class FloatingElements {
    constructor() {
        this.elements = document.querySelectorAll('.floating-element');
        this.init();
    }

    init() {
        this.elements.forEach((el, index) => {
            // Set initial position and size
            const size = 100 + Math.random() * 200;
            el.style.width = `${size}px`;
            el.style.height = `${size}px`;
            
            // Set neon color with gradient
            const gradients = [
                'radial-gradient(circle, rgba(0, 243, 255, 0.1) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(157, 0, 255, 0.1) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, transparent 70%)'
            ];
            el.style.background = gradients[index % gradients.length];
            
            // Set border
            el.style.border = `1px solid ${['#00f3ff', '#9d00ff', '#00ff88'][index % 3]}`;
            
            // Set initial position
            const x = 10 + Math.random() * 80;
            const y = 10 + Math.random() * 80;
            el.style.left = `${x}vw`;
            el.style.top = `${y}vh`;
            
            // Store animation properties
            el.dataset.speedX = (Math.random() - 0.5) * 0.3;
            el.dataset.speedY = (Math.random() - 0.5) * 0.3;
            el.dataset.rotation = Math.random() * 360;
            el.dataset.rotationSpeed = (Math.random() - 0.5) * 0.5;
        });
        
        this.animate();
    }

    animate() {
        this.elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            // Move element
            let newX = parseFloat(el.style.left) + parseFloat(el.dataset.speedX);
            let newY = parseFloat(el.style.top) + parseFloat(el.dataset.speedY);
            
            // Bounce off edges
            if (newX <= 0 || newX >= 100 - (rect.width / windowWidth * 100)) {
                el.dataset.speedX *= -1;
            }
            if (newY <= 0 || newY >= 100 - (rect.height / windowHeight * 100)) {
                el.dataset.speedY *= -1;
            }
            
            el.style.left = `${newX}vw`;
            el.style.top = `${newY}vh`;
            
            // Rotate element
            el.dataset.rotation += parseFloat(el.dataset.rotationSpeed);
            el.style.transform = `rotate(${el.dataset.rotation}deg)`;
            
            // Pulsing opacity
            const pulse = Math.sin(Date.now() * 0.001 + newX) * 0.2 + 0.8;
            el.style.opacity = pulse;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Intersection Observer for animations
class ScrollAnimations {
    constructor() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            }
        );
        
        this.init();
    }

    init() {
        document.querySelectorAll('.arch-card, .feature-card').forEach(card => {
            this.observer.observe(card);
        });
    }
}

// Typewriter Effect
class Typewriter {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = texts;
        this.options = {
            speed: 50,
            deleteSpeed: 30,
            pauseTime: 2000,
            loop: true,
            ...options
        };
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }
        
        let typeSpeed = this.isDeleting ? this.options.deleteSpeed : this.options.speed;
        
        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            typeSpeed = this.options.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Form Submission
class ContactForm {
    constructor() {
        this.form = document.querySelector('.cta-form');
        this.emailInput = document.querySelector('.form-input');
        this.submitBtn = document.querySelector('.btn-large');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Add input validation effects
        this.emailInput.addEventListener('input', () => {
            if (this.isValidEmail(this.emailInput.value)) {
                this.emailInput.style.borderColor = '#00ff88';
                this.emailInput.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.5)';
            } else {
                this.emailInput.style.borderColor = '#00f3ff';
                this.emailInput.style.boxShadow = '0 0 15px rgba(0, 243, 255, 0.5)';
            }
        });
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const email = this.emailInput.value;
        
        if (!this.isValidEmail(email)) {
            this.showError('Please enter a valid email address');
            return;
        }
        
        // Show loading state
        const originalText = this.submitBtn.querySelector('span').textContent;
        this.submitBtn.querySelector('span').textContent = 'Sending...';
        this.submitBtn.disabled = true;
        
        try {
            // In a real application, you would send this to your server
            // const response = await fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email })
            // });
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            this.showSuccess('Demo request received! We\'ll contact you shortly.');
            this.emailInput.value = '';
            
        } catch (error) {
            this.showError('Something went wrong. Please try again.');
        } finally {
            this.submitBtn.querySelector('span').textContent = originalText;
            this.submitBtn.disabled = false;
        }
    }

    showError(message) {
        this.showNotification(message, '#ff0033');
    }

    showSuccess(message) {
        this.showNotification(message, '#00ff88');
    }

    showNotification(message, color) {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            border: 2px solid ${color};
            border-radius: 4px;
            z-index: 10000;
            font-family: var(--font-heading);
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    const particleSystem = new ParticleSystem();
    
    // Initialize floating elements
    new FloatingElements();
    
    // Initialize scroll animations
    new ScrollAnimations();
    
    // Initialize contact form
    new ContactForm();
    
    // Add glitch effects to important elements
    document.querySelectorAll('.hero-title, .section-title').forEach(title => {
        new GlitchEffect(title);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.style.display = '';
            }
        });
    }
    
    // Update particles on animation frame
    function animate() {
        particleSystem.update();
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Add custom notification styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
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
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 80px;
                left: 0;
                width: 100%;
                background: rgba(10, 10, 15, 0.95);
                backdrop-filter: blur(10px);
                flex-direction: column;
                padding: 2rem;
                display: none;
                border-bottom: 1px solid rgba(0, 243, 255, 0.2);
            }
        }
    `;
    document.head.appendChild(style);
});
