// 10 Highly Motivating GIFs
const steps = [
    { q: "🏆 Are you winning, son?", quote: `"Victory is reserved for those who are willing to pay its price."`, gif: "https://media.giphy.com/media/11F0d1IkSKiOwe/giphy.gif" }, // Rocky
    { q: "Are you willing to win and work hard, son? 💪", quote: `"Hard work beats talent when talent doesn't work hard."`, gif: "https://media.giphy.com/media/87xihBthJ1DkA/giphy.gif" }, // Let's go
    { q: "Will you sacrifice comfort for greatness? 😤", quote: `"Greatness is on the other side of your comfort zone."`, gif: "https://media.giphy.com/media/84Xo4FrFLweYM/giphy.gif" }, // Goku Training
    { q: "Will future you be proud of today's actions? 🕰️", quote: `"Don't trade what you want most for what you want right now."`, gif: "https://media.giphy.com/media/xT1XGT9ersCCKjcIGs/giphy.gif" }, // Kobe Bryant
    { q: "Are you ready to eliminate distractions? 📵", quote: `"Starve your distractions, feed your focus."`, gif: "https://media.giphy.com/media/Jp4dchTKX6BzGkZ5Cz/giphy.gif" }, // Naruto typing/working
    { q: "Will you push past being 'just average'? 📈", quote: `"Average is a failing formula."`, gif: "https://media.giphy.com/media/3o7TKr3nzbh5WgCFxe/giphy.gif" }, // Lifting
    { q: "Do you have the discipline to stay consistent? 🧱", quote: `"Consistency is what transforms average into excellence."`, gif: "https://media.giphy.com/media/3oKIPcfX631trLEyCQ/giphy.gif" }, // Hype/Grind
    { q: "Will you keep going when it gets hard? ⛈️", quote: `"If you're going through hell, keep going."`, gif: "https://media.giphy.com/media/2bUpP71bbVnZ3x7lgQ/giphy.gif" }, // Running hard
    { q: "Are you ready to unlock your true potential? 🔓", quote: `"Your only limit is your mind."`, gif: "https://media.giphy.com/media/3oEduQ3OiH7kZQj3a0/giphy.gif" }, // Muhammad Ali
    { q: "Last chance. Are you choosing greatness? 👑", quote: `"It's now or never."`, gif: "https://media.giphy.com/media/3o7TKWe6iA09rK0vC0/giphy.gif" } // Clock grinding/Time
];

// State Variables
let currentStep = parseInt(localStorage.getItem('motivate_step')) || 0;
let isSuccess = localStorage.getItem('motivate_success') === 'true';

// DOM Elements
const journeyScreen = document.getElementById('journey-screen');
const successScreen = document.getElementById('success-screen');
const questionEl = document.getElementById('question');
const quoteEl = document.getElementById('quote');
const gifEl = document.getElementById('main-gif');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');

// Initialization
function init() {
    if (isSuccess) {
        showSuccess();
    } else {
        renderStep();
    }
}

// Render current question
function renderStep() {
    const data = steps[currentStep];
    
    // Fade effect for smooth transition
    journeyScreen.style.opacity = 0;
    setTimeout(() => {
        questionEl.innerText = data.q;
        quoteEl.innerText = data.quote;
        gifEl.src = data.gif;

        // Dynamic Sizing Logic (No CSS scale to avoid overlap)
        const baseYesSize = 24;
        const baseYesPadV = 15;
        const baseYesPadH = 40;

        const baseNoSize = 24;
        const baseNoPadV = 15;
        const baseNoPadH = 40;

        // YES gets bigger
        btnYes.style.fontSize = `${baseYesSize + (currentStep * 4)}px`;
        btnYes.style.padding = `${baseYesPadV + (currentStep * 2)}px ${baseYesPadH + (currentStep * 5)}px`;

        // NO shrinks slowly (stays clickable longer)
        const newNoSize = Math.max(12, baseNoSize - (currentStep * 1.5));
        const newNoPadV = Math.max(8, baseNoPadV - (currentStep * 1));
        const newNoPadH = Math.max(15, baseNoPadH - (currentStep * 3));
        
        btnNo.style.fontSize = `${newNoSize}px`;
        btnNo.style.padding = `${newNoPadV}px ${newNoPadH}px`;

        // Reset No button position if it was absolute
        if (currentStep < steps.length - 1) {
            btnNo.style.position = 'relative';
            btnNo.style.left = 'auto';
            btnNo.style.top = 'auto';
        }

        journeyScreen.style.opacity = 1;
    }, 300);
}

// Handle "NO" Click
function handleNo() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        localStorage.setItem('motivate_step', currentStep);
        renderStep();
    }
}

// Evasion logic for the final screen
btnNo.addEventListener('mouseover', () => {
    if (currentStep === steps.length - 1) {
        btnNo.style.position = 'fixed';
        const maxX = window.innerWidth - btnNo.clientWidth - 20;
        const maxY = window.innerHeight - btnNo.clientHeight - 20;
        
        const randomX = Math.max(20, Math.floor(Math.random() * maxX));
        const randomY = Math.max(20, Math.floor(Math.random() * maxY));
        
        btnNo.style.left = randomX + 'px';
        btnNo.style.top = randomY + 'px';
    }
});

// Click fallback for mobile (where hover doesn't exist)
btnNo.addEventListener('touchstart', (e) => {
    if (currentStep === steps.length - 1) {
        e.preventDefault(); 
        btnNo.style.position = 'fixed';
        const maxX = window.innerWidth - btnNo.clientWidth - 20;
        const maxY = window.innerHeight - btnNo.clientHeight - 20;
        
        btnNo.style.left = Math.max(20, Math.floor(Math.random() * maxX)) + 'px';
        btnNo.style.top = Math.max(20, Math.floor(Math.random() * maxY)) + 'px';
    }
});

btnNo.addEventListener('click', () => {
    if (currentStep < steps.length - 1) handleNo();
});

// Handle "YES" Click
function handleYes() {
    localStorage.setItem('motivate_success', 'true');
    showSuccess();
    startFireParticles();
}

function showSuccess() {
    journeyScreen.style.display = 'none';
    successScreen.style.display = 'flex';
}

function resetJourney() {
    localStorage.removeItem('motivate_step');
    localStorage.removeItem('motivate_success');
    currentStep = 0;
    isSuccess = false;
    stopParticles();
    successScreen.style.display = 'none';
    journeyScreen.style.display = 'flex';
    renderStep();
}

// Particle System (Sparks/Fire)
const canvas = document.getElementById('sparks');
const ctx = canvas.getContext('2d');
let particles = [];
let animationFrameId;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 4 + 1;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = (Math.random() - 0.5) * 2;
        const colors = ['#ff0055', '#ffaa00', '#ffea00'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.life = 1;
        this.decay = Math.random() * 0.005 + 0.002;
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.life -= this.decay;
    }
    draw() {
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (Math.random() < 0.3) particles.push(new Particle());
    particles.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.life <= 0 || p.y > canvas.height) particles.splice(index, 1);
    });
    animationFrameId = requestAnimationFrame(animateParticles);
}

function startFireParticles() {
    particles = [];
    for(let i=0; i<50; i++) particles.push(new Particle());
    animateParticles();
}

function stopParticles() {
    cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Run on load
if (isSuccess) startFireParticles();
init();