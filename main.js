// Set up the canvas and adjust its size to the container dimensions
const canvas = document.getElementById('stickwoman');
const ctx = canvas.getContext('2d');
const container = document.getElementById('container');

canvas.width = container.clientWidth;
canvas.height = container.clientHeight;

// Determine the grass position relative to the container.
// This ensures that the stickwoman’s legs (from y + torsoLength) align with the top of the grass.
const grass = document.getElementById('grass');
const grassRect = grass.getBoundingClientRect();
const containerRect = container.getBoundingClientRect();
const grassTopRelative = grassRect.top - containerRect.top;

// Calculate the initial y-coordinate for the stickwoman so her legs land on the grass.
const initialY = grassTopRelative - 120; // adjust as needed based on leg length
const initialX = 50; // initial horizontal position; adjust as needed

async function mainLoop(){
    const stickWoman = new StickWoman(ctx, initialX, initialY);
    stickWoman.draw();

    const waveAnimation = new WaveAnimation(stickWoman, ctx, canvas, 3);
    waveAnimation.start();

    const msg = new MessageBubble();
    // Pesan pertama tampil selama 10 detik
    await msg.start(
      "Hallo!\nGuten Morgen (?)\nHow was your day going?\nI wish its going good!\nLet's play a game!", 
      stickWoman.x, 
      stickWoman.y, 
      6
    );
    // Pesan kedua tampil selama 8 detik (misalnya)
    await msg.start(
      "Jadi, kamu harus ngumpulin bunga tulip sebanyak-banyaknya.\nMenghindari rintangan juga, kalau mati nanti dari ulang hehe.", 
      stickWoman.x, 
      stickWoman.y, 
      7
    );
}

mainLoop();