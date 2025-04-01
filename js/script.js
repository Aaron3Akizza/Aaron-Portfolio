document.addEventListener('DOMContentLoaded', function() {
    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // ===== STICKY NAVIGATION =====
    const nav = document.querySelector('.main-nav');
    window.addEventListener('scroll', function() {
        nav.classList.toggle('sticky', window.scrollY > 50);
    });

    // ===== ACTIVE SECTION HIGHLIGHT =====
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    function highlightNavItem() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavItem);
    highlightNavItem(); // Run once on load

    // ===== TYPEWRITER EFFECT =====
    const typewriterText = "Cybersecurity Specialist | Web Developer | IT Consultant | Musician";
    const typewriterElement = document.querySelector('.typewriter');
    let i = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeWriter() {
        const currentText = typewriterText.substring(0, i);
        typewriterElement.textContent = currentText;
        
        if (!isDeleting && i === typewriterText.length) {
            isDeleting = true;
            typingSpeed = 50;
            setTimeout(typeWriter, 1500);
            return;
        }
        
        if (isDeleting && i === 0) {
            isDeleting = false;
            typingSpeed = 100;
        }
        
        i = isDeleting ? i - 1 : i + 1;
        
        const randomSpeed = Math.random() * 50 + typingSpeed;
        setTimeout(typeWriter, randomSpeed);
    }
    
    // Start typewriter after 1 second
    setTimeout(typeWriter, 1000);

    // ===== MODAL FUNCTIONALITY =====
    let currentModal = null;
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('.view-details');

    // Open modal
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            currentModal = this.getAttribute('href');
            document.querySelector(currentModal).classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

    // Modal navigation
    function navigateModal(direction) {
        const currentIndex = Array.from(modals).findIndex(m => `#${m.id}` === currentModal);
        const nextIndex = (currentIndex + direction + modals.length) % modals.length;
        
        document.querySelector(currentModal).classList.remove('active');
        currentModal = `#${modals[nextIndex].id}`;
        document.querySelector(currentModal).classList.add('active');
    }

    document.addEventListener('click', function(e) {
        if (e.target.closest('.modal-prev')) {
            navigateModal(-1);
        } else if (e.target.closest('.modal-next')) {
            navigateModal(1);
        }
    });

    // ===== SCROLL REVEAL ANIMATIONS =====
    function animateOnScroll() {
        const elements = document.querySelectorAll('.portfolio-item, .skill-card, .service-card, .contact-form, .contact-info');
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial state
    document.querySelectorAll('.portfolio-item, .skill-card, .service-card, .contact-form, .contact-info').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });

    // ===== PARTICLES.JS INITIALIZATION =====
    function initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#00f0ff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 2,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#d400ff",
                        "opacity": 0.3,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": true,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "repulse"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "repulse": {
                            "distance": 100,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        }
                    }
                },
                "retina_detect": true
            });
        }
    }

    // Initialize particles after everything loads
    window.addEventListener('load', initParticles);

    // ===== TOOLTIP FUNCTIONALITY =====
    document.querySelectorAll('.tech-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const tooltip = this.querySelector('::after');
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateX(-50%) translateY(0)';
            }
        });
        
        icon.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('::after');
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateX(-50%) translateY(10px)';
            }
        });
    });

    // ===== FORM VALIDATION =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        try {
            // Clear previous errors
            this.querySelectorAll('.field-error').forEach(el => el.remove());
            this.querySelectorAll('input, textarea').forEach(el => {
                el.style.borderColor = 'var(--glass-border)';
            });

            // Client-side validation
            let isValid = true;
            const name = this.querySelector('[name="name"]');
            const email = this.querySelector('[name="email"]');
            const message = this.querySelector('[name="message"]');

            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            }

            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                showError(email, 'Invalid email format');
                isValid = false;
            }

            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            }

            if (!isValid) throw new Error('Validation failed');

            // Prepare and send data
            const formData = new FormData(this);
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                showSuccess(this, 'Thank you! Your message has been sent.');
                this.reset();
            } else {
                if (result.errors) {
                    Object.entries(result.errors).forEach(([field, error]) => {
                        const input = this.querySelector(`[name="${field}"]`);
                        if (input) showError(input, error);
                    });
                }
                throw new Error(result.message || 'Submission failed');
            }
        } catch (error) {
            if (!this.querySelector('.field-error')) {
                alert(error.message || 'An error occurred. Please try again.');
            }
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });

    // Helper functions
    function showError(input, message) {
        input.style.borderColor = '#ff416c';
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        input.parentNode.appendChild(errorElement);
        
        input.addEventListener('focus', function clearError() {
            input.style.borderColor = 'var(--glass-border)';
            errorElement.remove();
        }, { once: true });
    }

    function showSuccess(form, message) {
        const successElement = document.createElement('div');
        successElement.className = 'form-success glass';
        successElement.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>${message}</p>
        `;
        form.parentNode.insertBefore(successElement, form.nextSibling);
        
        setTimeout(() => {
            successElement.style.opacity = '0';
            setTimeout(() => successElement.remove(), 300);
        }, 5000);
    }
}
});