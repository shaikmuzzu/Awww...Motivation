// 10 Highly Motivating GIFs (with built-in high-reliability fallback images)
const steps = [
    { 
        q: "🏆 Are you winning, son?", 
        quote: `"Victory is reserved for those who are willing to pay its price."`, 
        gif: "https://i.imgur.com/75N7pda.gif", // Rocky Training
        fallback: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&q=80" 
    }, 
    { 
        q: "Are you willing to win and work hard, son? 💪", 
        quote: `"Hard work beats talent when talent doesn't work hard."`, 
        gif: "https://i.imgur.com/bH84nZC.gif", // Gym Motivation
        fallback: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=500&q=80" 
    }, 
    { 
        q: "Will you sacrifice comfort for greatness? 😤", 
        quote: `"Greatness is on the other side of your comfort zone."`, 
        gif: "https://i.imgur.com/K6Yw780.gif", // Anime Training / Goku
        fallback: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80" 
    }, 
    { 
        q: "Will future you be proud of today's actions? 🕰️", 
        quote: `"Don't trade what you want most for what you want right now."`, 
        gif: "https://i.imgur.com/AxwN0g9.gif", // Kobe Bryant Mamba Mentality
        fallback: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=500&q=80" 
    }, 
    { 
        q: "Are you ready to eliminate distractions? 📵", 
        quote: `"Starve your distractions, feed your focus."`, 
        gif: "https://i.imgur.com/39wH8bL.gif", // Late night study/work
        fallback: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80" 
    }, 
    { 
        q: "Will you push past being 'just average'? 📈", 
        quote: `"Average is a failing formula."`, 
        gif: "https://i.imgur.com/XqN8m72.gif", // Heavy lifting Focus
        fallback: "https://images.unsplash.com/photo-1517838495310-cae650085d77?w=500&q=80" 
    }, 
    { 
        q: "Do you have the discipline to stay consistent? 🧱", 
        quote: `"Consistency is what transforms average into excellence."`, 
        gif: "https://i.imgur.com/6S6M9Z4.gif", // Running/Grinding
        fallback: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=500&q=80" 
    }, 
    { 
        q: "Will you keep going when it gets hard? ⛈️", 
        quote: `"If you're going through hell, keep going."`, 
        gif: "https://i.imgur.com/v8tT9K0.gif", // Boxing Focus
        fallback: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500&q=80" 
    }, 
    { 
        q: "Are you ready to unlock your true potential? 🔓", 
        quote: `"Your only limit is your mind."`, 
        gif: "https://i.imgur.com/AhX7M1w.gif", // Muhammad Ali
        fallback: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=500&q=80" 
    }, 
    { 
        q: "Last chance. Are you choosing greatness? 👑", 
        quote: `"It's now or never."`, 
        gif: "https://i.imgur.com/YwN9zP2.gif", // Success/Clock ticking
        fallback: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&q=80" 
    }
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
        
        // Load the primary GIF
        gifEl.src = data.gif;

        // AUTOMATIC FALLBACK SYSTEM: If the GIF blocks or fails, load the bulletproof backup image
        gifEl.onerror = function() {
            this.src = data.fallback;
            this.onerror = null; // Prevent infinite loops if fallback fails too
        };

        // Dynamic Sizing Logic (No layout overlapping)
        const baseYesSize = 24;
        const baseYesPadV = 15;
        const baseYesPadH = 40;

        const baseNoSize = 24;
        const baseNoPadV = 15;
        const baseNoPadH = 40;

        // YES gets bigger gradually
        btnYes.style.fontSize = `${baseYesSize + (currentStep * 4)}px`;
        btnYes.style.padding = `${baseYesPadV + (currentStep * 2)}px ${baseYesPadH + (currentStep * 5)}px`;

        // NO shrinks slowly (stays perfectly clickable and clear until the last page)
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
