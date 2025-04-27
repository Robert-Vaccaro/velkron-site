document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('header nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // Fix navigation links scrolling
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            nav.classList.remove('active');
            
            // Update active link
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
            
            // Get the target section ID
            const targetId = this.getAttribute('href');
            
            // Scroll to the section
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Pricing toggle
    const pricingToggle = document.getElementById('pricing-toggle');
    const priceValues = document.querySelectorAll('.price-value');
    
    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            priceValues.forEach(price => {
                const monthly = price.getAttribute('data-monthly');
                const yearly = price.getAttribute('data-yearly');
                
                if (!monthly || !yearly) return;
                
                if (this.checked) {
                    price.textContent = yearly;
                } else {
                    price.textContent = monthly;
                }
            });
        });
        
        // Set initial data attributes
        priceValues.forEach(price => {
            const currentPrice = price.textContent;
            price.setAttribute('data-monthly', currentPrice);
            
            // Calculate yearly price (20% discount)
            const value = parseFloat(currentPrice.replace(/[^0-9.]/g, ''));
            const yearlyValue = Math.round(value * 0.8);
            price.setAttribute('data-yearly', '$' + yearlyValue);
        });
    }
    
    // Testimonial slider
    const dots = document.querySelectorAll('.dot');
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    if (dots.length && testimonials.length) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                dots.forEach(d => d.classList.remove('active'));
                testimonials.forEach(t => t.classList.remove('active'));
                
                dot.classList.add('active');
                if (testimonials[index]) {
                    testimonials[index].classList.add('active');
                }
            });
        });
        
        // Auto slide every 5 seconds
        let currentIndex = 0;
        setInterval(() => {
            currentIndex = (currentIndex + 1) % dots.length;
            dots.forEach(d => d.classList.remove('active'));
            testimonials.forEach(t => t.classList.remove('active'));
            
            dots[currentIndex].classList.add('active');
            testimonials[currentIndex].classList.add('active');
        }, 5000);
    }
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && message) {
                // In a real application, you would send this data to a server
                console.log('Form submitted:', { name, email, message });
                
                // Show success message
                formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                formMessage.className = 'success-message';
                
                // Reset form
                contactForm.reset();
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = '';
                }, 5000);
            } else {
                // Show error message
                formMessage.textContent = 'Please fill in all fields.';
                formMessage.className = 'error-message';
            }
        });
    }
    
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
}); 