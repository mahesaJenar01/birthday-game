const canvas = document.getElementById('stickwoman');
const ctx = canvas.getContext('2d');

// Canvas dimensions
canvas.width = 150;
canvas.height = 200;
ctx.lineWidth = 2;

// Initial position from CSS
const initialPosition = 20;
let currentPosition = initialPosition;
canvas.style.left = `${initialPosition}px`;

// Movement constants
const MOVE_AMOUNT = 10;
const MIN_X = 20;
const MAX_X = window.innerWidth - canvas.width - MIN_X;

function drawStickwoman() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Position feet at the bottom of the canvas
    const baseX = 50;
    const baseY = canvas.height; // Directly at canvas bottom

    // Head
    ctx.beginPath();
    ctx.arc(baseX, baseY - 50, 10, 0, Math.PI * 2);
    ctx.stroke();

    // Body
    ctx.beginPath();
    ctx.moveTo(baseX, baseY - 40);
    ctx.lineTo(baseX, baseY - 20);
    ctx.stroke();

    // Arms (static)
    ctx.beginPath();
    ctx.moveTo(baseX, baseY - 35);
    ctx.lineTo(baseX - 15, baseY - 25); // Left arm
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(baseX, baseY - 35);
    ctx.lineTo(baseX + 15, baseY - 25); // Right arm
    ctx.stroke();

    // Legs (static)
    ctx.beginPath();
    ctx.moveTo(baseX, baseY - 20);
    ctx.lineTo(baseX - 10, baseY); // Left leg
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(baseX, baseY - 20);
    ctx.lineTo(baseX + 10, baseY); // Right leg
    ctx.stroke();
}

function updatePosition() {
    canvas.style.left = `${currentPosition}px`;
}

// Event Listeners
document.getElementById('left-button').addEventListener('click', () => {
    currentPosition = Math.max(MIN_X, currentPosition - MOVE_AMOUNT);
    updatePosition();
});

document.getElementById('right-button').addEventListener('click', () => {
    currentPosition = Math.min(MAX_X, currentPosition + MOVE_AMOUNT);
    updatePosition();
});

// Initial draw
drawStickwoman();
