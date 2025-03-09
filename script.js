// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

const themes = ['dark', 'light', 'ironman'];
let currentThemeIndex = 0;

themeToggle.addEventListener('click', () => {
  // Remove all theme classes
  body.classList.remove('light-mode', 'ironman-mode');

  // Apply the next theme
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  const nextTheme = themes[currentThemeIndex];

  if (nextTheme === 'light') {
    body.classList.add('light-mode');
  } else if (nextTheme === 'ironman') {
    body.classList.add('ironman-mode');
  }

  // Update the toggle icon
  const icons = ['fa-moon', 'fa-sun', 'fa-robot']; // Moon for dark, Sun for light, Robot for Ironman
  themeToggle.querySelector('i').className = `fas ${icons[currentThemeIndex]}`;
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Particle Animation (Persistent Particles)
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
  constructor(x, y, size, color, velocity) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // Bounce particles off the edges
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.velocity.y = -this.velocity.y;
    }
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < 100; i++) {
    const size = Math.random() * 5 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const color = '#ff5722'; // Ironman Red
    const velocity = {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
    };
    particlesArray.push(new Particle(x, y, size, color, velocity));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((particle) => {
    particle.draw();
    particle.update();
  });
  requestAnimationFrame(animate);
}

init();
animate();

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});