// walker.js

class Walker {
    constructor(character, moveAmount = window.innerWidth * 0.01, minX, maxX) {
        this.character = character; // Reference to StickFigure instance
        this.positionX = minX; // Initial position
        this.minX = minX;
        this.maxX = maxX;

        // Movement properties
        this._moveAmount = (moveAmount / 100) * window.innerWidth;
        this.velocity = 0; // Movement speed

        // Movement flags
        this.isMovingLeft = false;
        this.isMovingRight = false;
    }

    // Getter and Setter for moveAmount
    get moveAmount() {
        return this._moveAmount;
    }

    set moveAmount(value) {
        this._moveAmount = value;
        this.maxX = window.innerWidth - this.character.width - this.minX;
    }

    // Update position based on movement flags
    updatePosition() {
        if (this.isMovingLeft) {
            this.velocity = -this.moveAmount;
        } else if (this.isMovingRight) {
            this.velocity = this.moveAmount;
        } else {
            this.velocity = 0;
        }

        // Update position within limits
        this.positionX += this.velocity;
        this.positionX = Math.max(this.minX, Math.min(this.maxX, this.positionX));

        // Apply position update to character
        this.character.draw(this.positionX);
    }

    // Movement control methods
    startMovingLeft() {
        this.isMovingLeft = true;
    }

    stopMovingLeft() {
        this.isMovingLeft = false;
    }

    startMovingRight() {
        this.isMovingRight = true;
    }

    stopMovingRight() {
        this.isMovingRight = false;
    }
}
