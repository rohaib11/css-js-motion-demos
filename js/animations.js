// CSS Animation Demo
const animationBox = document.querySelector('.css-animation-box .animated-element');
const animationControls = document.querySelectorAll('.animation-controls .control-btn[data-animation]');

animationControls.forEach(control => {
    control.addEventListener('click', () => {
        const animationType = control.getAttribute('data-animation');
        
        // Remove all animation classes
        animationBox.className = 'animated-element';
        
        // Add the selected animation class
        switch(animationType) {
            case 'bounce':
                animationBox.classList.add('animate-bounce');
                break;
            case 'pulse':
                animationBox.classList.add('animate-pulse');
                break;
            case 'rotate':
                animationBox.classList.add('animate-rotate');
                break;
            case 'flip':
                animationBox.classList.add('animate-flip');
                break;
            case 'shake':
                animationBox.classList.add('animate-shake');
                break;
        }
    });
});

// JavaScript Animation Demo
const jsCanvas = document.getElementById('jsAnimationCanvas');
const jsCtx = jsCanvas.getContext('2d');
let x = 50;
let y = 150;
let dx = 2;
let dy = 2;
let radius = 30;
let animationId;
let isAnimating = false;

function drawBall() {
    jsCtx.clearRect(0, 0, jsCanvas.width, jsCanvas.height);
    jsCtx.beginPath();
    jsCtx.arc(x, y, radius, 0, Math.PI * 2);
    jsCtx.fillStyle = '#4a6bff';
    jsCtx.fill();
    
    // Boundary collision
    if (x + radius > jsCanvas.width || x - radius < 0) dx = -dx;
    if (y + radius > jsCanvas.height || y - radius < 0) dy = -dy;
    
    x += dx;
    y += dy;
    
    animationId = requestAnimationFrame(drawBall);
}

const jsControls = document.querySelectorAll('#js-demo .control-btn[data-action]');

jsControls.forEach(control => {
    control.addEventListener('click', () => {
        const action = control.getAttribute('data-action');
        
        switch(action) {
            case 'start':
                if (!isAnimating) {
                    drawBall();
                    isAnimating = true;
                }
                break;
            case 'stop':
                cancelAnimationFrame(animationId);
                isAnimating = false;
                break;
            case 'reset':
                cancelAnimationFrame(animationId);
                isAnimating = false;
                x = 50;
                y = 150;
                dx = 2;
                dy = 2;
                jsCtx.clearRect(0, 0, jsCanvas.width, jsCanvas.height);
                drawBall();
                break;
        }
    });
});

// Initialize with ball visible but not moving
drawBall();
cancelAnimationFrame(animationId);
isAnimating = false;

// Physics Animation Demo
const physicsBall = document.querySelector('.physics-ball');
const physicsContainer = document.querySelector('.physics-container');
const physicsControls = document.querySelectorAll('#physics-demo .control-btn[data-action]');

let yPos = 0;
let velocity = 0;
const gravity = 0.2;
const damping = 0.8;
let physicsAnimationId;
let physicsIsAnimating = false;

function applyGravity() {
    velocity += gravity;
    yPos += velocity;
    
    // Check for collision with bottom
    if (yPos >= physicsContainer.clientHeight - physicsBall.clientHeight) {
        yPos = physicsContainer.clientHeight - physicsBall.clientHeight;
        velocity = -velocity * damping;
        
        // Stop animation when velocity is very small
        if (Math.abs(velocity) < 0.5) {
            cancelAnimationFrame(physicsAnimationId);
            physicsIsAnimating = false;
            return;
        }
    }
    
    physicsBall.style.transform = `translateY(${yPos}px)`;
    physicsAnimationId = requestAnimationFrame(applyGravity);
}

function applyCollision() {
    velocity += gravity;
    yPos += velocity;
    
    // Check for collision with obstacle
    const obstacle = document.querySelector('.physics-obstacle');
    const obstacleTop = physicsContainer.clientHeight - obstacle.clientHeight - 30;
    const obstacleLeft = physicsContainer.clientWidth / 2 - obstacle.clientWidth / 2;
    const obstacleRight = obstacleLeft + obstacle.clientWidth;
    
    const ballLeft = physicsContainer.clientWidth / 2 - physicsBall.clientWidth / 2;
    const ballRight = ballLeft + physicsBall.clientWidth;
    
    if (yPos + physicsBall.clientHeight >= obstacleTop && 
        yPos <= obstacleTop + obstacle.clientHeight &&
        (ballRight > obstacleLeft && ballLeft < obstacleRight)) {
        
        yPos = obstacleTop - physicsBall.clientHeight;
        velocity = -velocity * damping;
        
        // Add horizontal movement
        if (ballLeft + physicsBall.clientWidth / 2 < physicsContainer.clientWidth / 2) {
            // Ball hits left side of obstacle
            physicsBall.style.transform = `translate(${-10}px, ${yPos}px)`;
        } else {
            // Ball hits right side of obstacle
            physicsBall.style.transform = `translate(${10}px, ${yPos}px)`;
        }
    }
    
    // Check for collision with bottom
    if (yPos >= physicsContainer.clientHeight - physicsBall.clientHeight) {
        yPos = physicsContainer.clientHeight - physicsBall.clientHeight;
        velocity = -velocity * damping;
    }
    
    if (!physicsBall.style.transform.includes('translate(')) {
        physicsBall.style.transform = `translateY(${yPos}px)`;
    }
    
    // Stop animation when velocity is very small
    if (Math.abs(velocity) < 0.2) {
        cancelAnimationFrame(physicsAnimationId);
        physicsIsAnimating = false;
        return;
    }
    
    physicsAnimationId = requestAnimationFrame(applyCollision);
}

function applySpring() {
    const centerY = physicsContainer.clientHeight / 2 - physicsBall.clientHeight / 2;
    const spring = 0.1;
    const friction = 0.95;
    
    const targetY = centerY;
    const force = (targetY - yPos) * spring;
    velocity += force;
    velocity *= friction;
    yPos += velocity;
    
    physicsBall.style.transform = `translateY(${yPos}px)`;
    
    if (Math.abs(velocity) > 0.01 || Math.abs(yPos - targetY) > 0.01) {
        physicsAnimationId = requestAnimationFrame(applySpring);
    } else {
        physicsIsAnimating = false;
    }
}

physicsControls.forEach(control => {
    control.addEventListener('click', () => {
        const action = control.getAttribute('data-action');
        
        // Reset position and stop any current animation
        yPos = 0;
        velocity = 0;
        physicsBall.style.transform = 'translateY(0)';
        cancelAnimationFrame(physicsAnimationId);
        physicsIsAnimating = false;
        
        switch(action) {
            case 'gravity':
                physicsIsAnimating = true;
                applyGravity();
                break;
            case 'collision':
                physicsIsAnimating = true;
                applyCollision();
                break;
            case 'spring':
                yPos = 0;
                velocity = 10;
                physicsIsAnimating = true;
                applySpring();
                break;
        }
    });
});