// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Initialize Feather Icons
feather.replace();

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// URL Shortener Form Handler
document.querySelector('.url-shortener-form button').addEventListener('click', function() {
    const input = document.querySelector('.url-shortener-form input');
    const url = input.value.trim();
    
    if (!url) {
        showToast('Please enter a URL', 'error');
        return;
    }
    
    if (!isValidURL(url)) {
        showToast('Please enter a valid URL', 'error');
        return;
    }
    
    // Mock URL shortening
    this.classList.add('loading');
    setTimeout(() => {
        this.classList.remove('loading');
        input.value = 'https://urlprofit.co/abc123';
        showToast('URL shortened successfully!', 'success');
    }, 1500);
});

// Newsletter Form Handler
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value.trim();
    
    if (!email || !isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    const button = this.querySelector('button');
    button.classList.add('loading');
    
    setTimeout(() => {
        button.classList.remove('loading');
        this.reset();
        showToast('Thank you for subscribing!', 'success');
    }, 1500);
});

// Toast Notification System
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type === 'error' ? 'danger' : 'success'} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    document.body.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

// Utility Functions
function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Statistics Counter Animation
const stats = document.querySelectorAll('.stats-counter');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            observer.unobserve(entry.target);
        }
    });
});

stats.forEach(stat => observer.observe(stat));

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current).toLocaleString();
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        }
    }, 20);
}
