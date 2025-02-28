// clouds.js

// Class representing a single cloud
class Cloud {
    constructor(canvas, averageSpeed) {
      this.canvas = canvas;
      this.averageSpeed = averageSpeed;
      this.reset(true);
    }
    
    // Resets the cloud properties; if initial is true, start them anywhere on screen
    reset(initial = false) {
      // Start off-screen to the right (or anywhere if initial)
      this.x = initial 
        ? Math.random() * this.canvas.width 
        : this.canvas.width + Math.random() * this.canvas.width;
      // Y position in the upper portion of the canvas (adjust the multiplier as needed)
      this.y = Math.random() * this.canvas.height * 0.3;
      // Random scale between 0.5 and 1.5
      this.scale = 0.5 + Math.random();
      // Vary speed naturally around the average speed (factor between 0.5 and 1.5)
      this.speed = this.averageSpeed * (0.5 + Math.random());
      // Optionally add some variation in opacity (from 0.5 to 1)
      this.opacity = 0.5 + Math.random() * 0.5;
    }
    
    // Update cloud position based on its speed
    update() {
      // Move leftwards
      this.x -= this.speed;
      // Estimate cloud width (base width ~100 pixels scaled)
      const estimatedWidth = 100 * this.scale;
      // If cloud is completely off-screen to the left, reset its position to the right
      if (this.x < -estimatedWidth) {
        this.reset();
      }
    }
    
    // Draw the cloud using arcs to simulate a fluffy look
    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = "#fff"; // White cloud
      
      // Define a base position
      let baseX = this.x;
      let baseY = this.y;
      // Draw a cloud with three overlapping circles
      ctx.beginPath();
      // Left puff
      ctx.arc(baseX, baseY, 20 * this.scale, Math.PI * 0.5, Math.PI * 1.5);
      // Middle puff
      ctx.arc(baseX + 25 * this.scale, baseY - 15 * this.scale, 25 * this.scale, Math.PI, Math.PI * 2);
      // Right puff
      ctx.arc(baseX + 55 * this.scale, baseY - 5 * this.scale, 20 * this.scale, Math.PI * 1.2, Math.PI * 1.8);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }
  
  // Class to manage multiple clouds
  class Clouds {
    /**
     * @param {HTMLCanvasElement} canvas - the canvas to draw clouds on.
     * @param {number} averageSpeed - the average speed for the clouds.
     * @param {number} cloudCount - the number of clouds to display.
     */
    constructor(canvas, averageSpeed = 1, cloudCount = 5) {
      this.canvas = canvas;
      this.averageSpeed = averageSpeed;
      this.cloudCount = cloudCount;
      this.clouds = [];
      
      // Create the clouds
      for (let i = 0; i < cloudCount; i++) {
        this.clouds.push(new Cloud(canvas, averageSpeed));
      }
    }
    
    // Update all clouds
    update() {
      for (let cloud of this.clouds) {
        cloud.update();
      }
    }
    
    // Draw all clouds on the provided context
    draw(ctx) {
      for (let cloud of this.clouds) {
        cloud.draw(ctx);
      }
    }
  }
  