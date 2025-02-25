// main.js

// Set up the canvas and adjust its size to the container dimensions
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const container = document.getElementById("container");

canvas.width = container.clientWidth;
canvas.height = container.clientHeight;

// Instantiate the Background (from background.js)
const background = new Background(ctx, canvas);

// Calculate the initial position for the stickwoman so her feet land on the grass
const initialX = 50;
const initialY = canvas.height * 0.8 - 120; // Adjust as needed based on stickwoman dimensions

// Create the stickwoman instance (from stickwoman.js)
const stickWoman = new StickWoman(ctx, initialX, initialY);

// Start the wave animation (from wave.js)
const waveAnimation = new WaveAnimation(stickWoman, ctx, canvas, 3);
waveAnimation.start();

// Unified game loop: clear the canvas, draw the background, then draw the stickwoman
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.draw();
  stickWoman.draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();

// Display message bubbles (from message.js) relative to the stickwoman's position
const msg = new MessageBubble();
msg.start(
  "Hallo!\nGuten Morgen (?)\nHow was your day going?\nI wish its going good!\nLet's play a game!",
  stickWoman.x,
  stickWoman.y,
  6
).then(() => {
  return msg.start(
    "Jadi, kamu harus ngumpulin bunga tulip sebanyak-banyaknya.\nMenghindari rintangan juga, kalau mati nanti dari ulang hehe.",
    stickWoman.x,
    stickWoman.y,
    7
  );
});
