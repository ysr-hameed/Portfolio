
const words = ["Web Developer", "Web Designer", "Frontend Developer", "Backend Developer", "Full Stack Developer"];
let index = 0;
let charIndex = 0;
const typingSpeed = 150;
const delayBetweenWords = 1500;

function typeEffect() {
  const typingElement = document.querySelector(".typing-text");
  if (charIndex < words[index].length) {
    typingElement.textContent += words[index][charIndex];
    charIndex++;
    setTimeout(typeEffect, typingSpeed);
  } else {
    setTimeout(() => {
      charIndex = 0;
      typingElement.textContent = "";
      index = (index + 1) % words.length;
      typeEffect();
    }, delayBetweenWords);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeEffect, 500);
});




// Theme Toggle
function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  body.setAttribute('data-theme', newTheme);

  // Update theme toggle icon
  const themeIcon = document.querySelector('.theme-toggle i');
  themeIcon.className = newTheme === 'dark' ? 'fa-regular fa-sun' : 'fa-regular fa-moon';
}

// Mobile Menu
function toggleNav() {
  document.querySelector('.nav-links').classList.toggle('active');
}
// Animate progress bars on scroll
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.parentElement.parentElement.querySelector('.percentage').textContent;
        entry.target.style.width = width;
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => observer.observe(bar));
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
  animateProgressBars();

  // Reset progress bars width for animation
  document.querySelectorAll('.progress').forEach(bar => {
    bar.style.width = '0%';
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute('href'));
    section.scrollIntoView({ behavior: 'smooth' });
  });
});




function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.parentElement.previousElementSibling.querySelector('.percentage').textContent;
        entry.target.style.width = width;
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => observer.observe(bar));
}



// Initialize all animations and interactions
document.addEventListener('DOMContentLoaded', () => {
  animateProgressBars();

  // Reset progress bars for animation
  document.querySelectorAll('.progress').forEach(bar => {
    bar.style.width = '0%';
  });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute('href'));
    section.scrollIntoView({ behavior: 'smooth' });
  });
});