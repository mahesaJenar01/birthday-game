class StickFigure {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        // Base dimensions for the stick figure
        this.baseWidth = 150;
        this.baseHeight = 200;
        this.baseLineWidth = 2;

        // Compute dynamic scale factor (using 1920 as a base width)
        this.scale = window.innerWidth / 1920;
        this.width = this.baseWidth * this.scale;
        this.height = this.baseHeight * this.scale;
        this.lineWidth = this.baseLineWidth * this.scale;

        // Set up canvas dimensions and context
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx.lineWidth = this.lineWidth;
    }

    // Method to update the canvas dimensions and scale on window resize
    resize() {
        this.scale = window.innerWidth / 1920;
        this.width = this.baseWidth * this.scale;
        this.height = this.baseHeight * this.scale;
        this.lineWidth = this.baseLineWidth * this.scale;

        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx.lineWidth = this.lineWidth;
    }

    // Draw the stick figure at a specific horizontal position
    draw(positionX) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        const s = this.scale;
        const baseX = 50 * s;  // base horizontal offset (scaled)
        const baseY = this.height; // feet at the bottom

        // Head
        this.ctx.beginPath();
        this.ctx.arc(baseX, baseY - 50 * s, 10 * s, 0, Math.PI * 2);
        this.ctx.stroke();

        // Body
        this.ctx.beginPath();
        this.ctx.moveTo(baseX, baseY - 40 * s);
        this.ctx.lineTo(baseX, baseY - 20 * s);
        this.ctx.stroke();

        // Left Arm
        this.ctx.beginPath();
        this.ctx.moveTo(baseX, baseY - 35 * s);
        this.ctx.lineTo(baseX - 15 * s, baseY - 25 * s);
        this.ctx.stroke();

        // Right Arm
        this.ctx.beginPath();
        this.ctx.moveTo(baseX, baseY - 35 * s);
        this.ctx.lineTo(baseX + 15 * s, baseY - 25 * s);
        this.ctx.stroke();

        // Left Leg
        this.ctx.beginPath();
        this.ctx.moveTo(baseX, baseY - 20 * s);
        this.ctx.lineTo(baseX - 10 * s, baseY);
        this.ctx.stroke();

        // Right Leg
        this.ctx.beginPath();
        this.ctx.moveTo(baseX, baseY - 20 * s);
        this.ctx.lineTo(baseX + 10 * s, baseY);
        this.ctx.stroke();

        // Update canvas horizontal position
        this.canvas.style.left = `${positionX}px`;
    }
}
