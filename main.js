// main.js

// Update CSS scale variable based on window size (using 1920 as a base width)
function updateScale() {
    const scale = window.innerWidth / 1920; // adjust base resolution as needed
    document.documentElement.style.setProperty('--scale', scale);
  }
  
  // Initial update of the scale variable
  updateScale();
  
  // Create an instance of StickFigure and Walker
  const stickfigure = new StickFigure('stickfigure');
  const walker = new Walker(
      stickfigure, 
      window.innerWidth * 0.01, 
      20, 
      window.innerWidth - stickfigure.width - 20
  );
  
  // Resize event listener to adjust all dynamic elements
  window.addEventListener('resize', () => {
      updateScale();
      stickfigure.resize();
      walker.moveAmount = window.innerWidth * 0.01;
      walker.maxX = window.innerWidth - stickfigure.width - 20;
  });
  
  // Set up event listeners for continuous movement
  const leftButton = document.getElementById('left-button');
  const rightButton = document.getElementById('right-button');
  
  leftButton.addEventListener('mousedown', () => walker.startMovingLeft());
  leftButton.addEventListener('mouseup', () => walker.stopMovingLeft());
  
  rightButton.addEventListener('mousedown', () => walker.startMovingRight());
  rightButton.addEventListener('mouseup', () => walker.stopMovingRight());
  
  // Animation loop to continuously update position
  function animate() {
      walker.updatePosition();
      requestAnimationFrame(animate);
  }
  
  // Start the animation
  animate();
  