// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });
}

// Smooth Scrolling for Navigation Links with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Here you would typically send the form data to a server
        // For now, we'll just log it and show a success message
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// Scroll Animation
const sections = document.querySelectorAll('section');
// const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Project Card Animation
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Helper to load HTML into a container
function loadHTML(url, containerId, callback) {
    fetch(url)
        .then(res => res.text())
        .then(html => {
            document.getElementById(containerId).innerHTML = html;
            if (callback) callback();
        });
}

// Load navbar, hero, and footer on page load
window.addEventListener('DOMContentLoaded', () => {
    loadHTML('navbar.html', 'navbar', setupNav);
    loadHTML('hero.html', 'hero');
    loadHTML('footer.html', 'footer');
});

function setupNav() {
    // Handle nav clicks
    document.querySelectorAll('.nav-links a, .logo').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            if (section === 'hero') {
                // Show only hero
                document.getElementById('hero').style.display = '';
                document.getElementById('section-content')?.remove();
            } else {
                // Hide hero, load section
                document.getElementById('hero').style.display = 'none';
                // Remove old section if exists
                document.getElementById('section-content')?.remove();
                // Create new section container
                const sectionDiv = document.createElement('div');
                sectionDiv.id = 'section-content';
                document.getElementById('main-content').appendChild(sectionDiv);
                loadHTML(section + '.html', 'section-content');
            }
        });
    });
} 