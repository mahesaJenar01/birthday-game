// Define a class for the dynamic stickwoman
class StickWoman {
    constructor(ctx, x, y) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
  
      // Define default dimensions
      this.headRadius = 20;
      this.torsoLength = 60;
      this.armLength = 30;
      this.legLength = 40;
  
      // Define default angles (in radians) for limbs relative to their pivots
      this.leftArmAngle = -Math.PI / 6;
      this.rightArmAngle = Math.PI / 6;
      this.leftLegAngle = -Math.PI / 12;
      this.rightLegAngle = Math.PI / 12;
  
      // Additional pose properties can be added as needed.
    }
  
    // Optional: a method to update pose angles, useful for animation.
    setPose({ leftArmAngle, rightArmAngle, leftLegAngle, rightLegAngle }) {
      if (leftArmAngle !== undefined) this.leftArmAngle = leftArmAngle;
      if (rightArmAngle !== undefined) this.rightArmAngle = rightArmAngle;
      if (leftLegAngle !== undefined) this.leftLegAngle = leftLegAngle;
      if (rightLegAngle !== undefined) this.rightLegAngle = rightLegAngle;
    }
  
    draw() {
      const ctx = this.ctx;
      ctx.save();
      // Translate to the stickwoman's head center
      ctx.translate(this.x, this.y);
  
      // Draw Head
      ctx.beginPath();
      ctx.arc(0, 0, this.headRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'peachpuff';
      ctx.fill();
      ctx.stroke();
  
      // Draw Hair around head using curves
      ctx.beginPath();
      // Left hair curve
      ctx.moveTo(0, -this.headRadius);
      ctx.quadraticCurveTo(-this.headRadius, -this.headRadius * 1.5, -this.headRadius, 0);
      // Right hair curve
      ctx.moveTo(0, -this.headRadius);
      ctx.quadraticCurveTo(this.headRadius, -this.headRadius * 1.5, this.headRadius, 0);
      ctx.stroke();
  
      // Draw Torso from bottom of head to end of torso
      ctx.beginPath();
      ctx.moveTo(0, this.headRadius);
      ctx.lineTo(0, this.headRadius + this.torsoLength);
      ctx.stroke();
  
      // Draw Arms
      // Arms pivot from a shoulder position slightly below the head.
      // Left Arm
      ctx.save();
      ctx.translate(0, this.headRadius + 10); // shoulder position
      ctx.rotate(this.leftArmAngle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, this.armLength);
      ctx.stroke();
      ctx.restore();
  
      // Right Arm
      ctx.save();
      ctx.translate(0, this.headRadius + 10); // shoulder position
      ctx.rotate(this.rightArmAngle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, this.armLength);
      ctx.stroke();
      ctx.restore();
  
      // Draw Dress on the upper torso.
      ctx.beginPath();
      let dressTop = this.headRadius + 40;
      let dressBottom = this.headRadius + 60;
      ctx.moveTo(-20, dressTop);
      ctx.lineTo(20, dressTop);
      ctx.lineTo(20, dressBottom);
      ctx.lineTo(-20, dressBottom);
      ctx.closePath();
      ctx.fillStyle = 'pink';
      ctx.fill();
      ctx.stroke();
  
      // Draw Legs
      // Legs pivot from the bottom of the torso.
      // Left Leg
      ctx.save();
      ctx.translate(0, this.headRadius + this.torsoLength);
      ctx.rotate(this.leftLegAngle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, this.legLength);
      ctx.stroke();
      ctx.restore();
  
      // Right Leg
      ctx.save();
      ctx.translate(0, this.headRadius + this.torsoLength);
      ctx.rotate(this.rightLegAngle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, this.legLength);
      ctx.stroke();
      ctx.restore();
  
      ctx.restore();
    }
  }