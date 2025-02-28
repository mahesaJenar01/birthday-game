// sun.js
class Sun {
    constructor(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;
    }
  
    draw(ctx) {
      ctx.save();
  
      // --- Draw Sun Body ---
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      // Use a radial gradient for a warm effect
      let gradient = ctx.createRadialGradient(this.x, this.y, this.radius * 0.1, this.x, this.y, this.radius);
      gradient.addColorStop(0, "yellow");
      gradient.addColorStop(1, "orange");
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "orange";
      ctx.stroke();
  
      // --- Draw Eyes ---
      const eyeRadius = this.radius * 0.1;
      const eyeOffsetX = this.radius * 0.4;
      const eyeOffsetY = this.radius * 0.3;
      ctx.beginPath();
      // Left eye
      ctx.arc(this.x - eyeOffsetX, this.y - eyeOffsetY, eyeRadius, 0, Math.PI * 2);
      // Right eye
      ctx.arc(this.x + eyeOffsetX, this.y - eyeOffsetY, eyeRadius, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();
  
      // --- Draw Mouth (Smile) ---
      ctx.beginPath();
      // Draw an arc for a smiling mouth. Adjust the radius and position as needed.
      const mouthRadius = this.radius * 0.6;
      ctx.arc(this.x, this.y, mouthRadius, 0, Math.PI, false);
      ctx.stroke();
  
      ctx.restore();
    }
  }
  