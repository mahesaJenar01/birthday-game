// background.js
class Background {
  /**
   * @param {CanvasRenderingContext2D} ctx - The drawing context.
   * @param {HTMLCanvasElement} canvas - The canvas element.
   * @param {number} averageCloudSpeed - Average speed for cloud movement.
   * @param {number} cloudCount - Number of clouds on the screen.
   */
  constructor(ctx, canvas, averageCloudSpeed = 1, cloudCount = 5) {
    this.ctx = ctx;
    this.canvas = canvas;
    // Create a Sun instance positioned in the top-right area of the sky.
    this.sun = new Sun(canvas.width * 0.9, canvas.height * 0.125, 50);
    // Create a Clouds instance with the given average speed and number of clouds.
    this.clouds = new Clouds(canvas, averageCloudSpeed, cloudCount);
  }

  draw() {
    const ctx = this.ctx;
    const canvas = this.canvas;

    // --- Draw Sky ---
    ctx.fillStyle = "#e4eefb"; // Sky color from CSS (#e4eefb)
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // --- Update and Draw Clouds ---
    this.clouds.update();
    this.clouds.draw(ctx);

    // --- Draw the Sun ---
    this.sun.draw(ctx);

    // --- Draw Ground ---
    const groundY = canvas.height * 0.8; // Ground starts at 80% of canvas height
    const groundHeight = canvas.height - groundY;

    // --- Draw Grass ---
    const grassHeight = groundHeight * 0.4; // Grass occupies 40% of the ground height
    const grassGradient = ctx.createLinearGradient(0, groundY, 0, groundY + grassHeight);
    grassGradient.addColorStop(0, "#425517"); // Lighter green
    grassGradient.addColorStop(1, "#394a13"); // Darker green
    ctx.fillStyle = grassGradient;
    ctx.fillRect(0, groundY, canvas.width, grassHeight);

    // --- Draw Dirt ---
    const dirtY = groundY + grassHeight;
    const dirtHeight = groundHeight - grassHeight;
    ctx.fillStyle = "#5a4630"; // Dirt color from CSS
    ctx.fillRect(0, dirtY, canvas.width, dirtHeight);

    // --- Draw Inset Shadow on Dirt ---
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "black";
    // Simulate the inset shadow effect (like box-shadow in CSS)
    ctx.fillRect(0, dirtY, canvas.width, 10);
    ctx.restore();
  }
}
