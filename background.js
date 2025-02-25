// background.js
class Background {
    constructor(ctx, canvas) {
      this.ctx = ctx;
      this.canvas = canvas;
    }
  
    draw() {
      const ctx = this.ctx;
      const canvas = this.canvas;
      
      // --- Draw Sky ---
      ctx.fillStyle = "#e4eefb"; // Sky color from CSS (#e4eefb)
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
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
  