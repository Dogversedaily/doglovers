// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
const navLinkItems = document.querySelectorAll('.nav-links a');
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// CTA Button functionality
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', () => {
    const breedsSection = document.querySelector('#breeds');
    breedsSection.scrollIntoView({ behavior: 'smooth' });
});

// Learn More Buttons
const learnMoreButtons = document.querySelectorAll('.learn-more');
learnMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
        const breedName = this.parentElement.querySelector('h3').textContent;
        alert(`You selected: ${breedName}\n\nCheck back soon for detailed breed information!`);
    });
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value;

    if(email) {
        alert(`Thank you for subscribing with ${email}!\nCheck your email for confirmation.`);
        emailInput.value = '';
    }
});

// Smooth scroll for all navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animation to cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply observer to all cards
document.querySelectorAll('.feature-card, .breed-card, .tip-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(card);
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if(pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinkItems.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add hover effect to buttons
const allButtons = document.querySelectorAll('button');
allButtons.forEach(button => {
    button.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
    });

    button.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});
