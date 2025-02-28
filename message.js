class MessageBubble {
  constructor() {
    this.container = document.getElementById("container");
  }

  /**
   * Formats the text so each line contains at most 5 words
   * @param {string} message - Original message text
   * @returns {string} - Formatted message with line breaks
   */
  formatMessageWith5WordLimit(message) {
    // Split the message into paragraphs (based on existing line breaks)
    const paragraphs = message.split("\n");
    
    // Format each paragraph to have max 5 words per line
    const formattedParagraphs = paragraphs.map(paragraph => {
      const words = paragraph.split(" ");
      let formattedText = "";
      let lineWordCount = 0;
      
      for (let i = 0; i < words.length; i++) {
        formattedText += words[i];
        lineWordCount++;
        
        // If we've added 5 words or reached the end of the paragraph
        if (lineWordCount >= 5 && i < words.length - 1) {
          formattedText += "\n"; // Add line break
          lineWordCount = 0; // Reset word counter
        } else if (i < words.length - 1) {
          formattedText += " "; // Add space between words
        }
      }
      
      return formattedText;
    });
    
    // Join the formatted paragraphs with line breaks
    return formattedParagraphs.join("\n");
  }

  /**
   * Displays a message bubble with the provided text and returns a Promise
   * that resolves after the message bubble has faded out and been removed.
   *
   * The total display time is automatically calculated based on the average reading speed.
   *
   * @param {string} message - The message text (can be multiline)
   * @param {number} headX - The X coordinate of the stickwoman's head (relative to container)
   * @param {number} headY - The Y coordinate of the stickwoman's head (relative to container)
   * @returns {Promise} A promise that resolves after the bubble is removed.
   */
  start(message, headX, headY) {
    return new Promise(resolve => {
      // Calculate total time based on average reading speed
      const words = message.split(/\s+/).filter(word => word.length > 0);
      const totalWords = words.length;
      const readingSpeed = 0.4; // seconds per word
      const totalTime = totalWords * readingSpeed; // total time in seconds
      const totalTimeMs = totalTime * 1000;
      const delayTime = totalTimeMs * 0.9; // 90% of the time fully visible
      const fadeTime = totalTimeMs * 0.1;  // 10% for fade out

      // Format message with 5-word limit per line
      const formattedMessage = this.formatMessageWith5WordLimit(message);

      const bubble = document.createElement("div");
      bubble.className = "message-bubble";
      // Initial position: bubble appears just above the head
      bubble.style.top = headY - 10 + "px";

      bubble.innerText = formattedMessage;
      this.container.appendChild(bubble);

      // Adjust position to avoid covering the stickwoman's head
      const bubbleRect = bubble.getBoundingClientRect();
      const containerRect = this.container.getBoundingClientRect();
      const bubbleBottom = bubbleRect.bottom - containerRect.top;
      if (bubbleBottom > headY - 35) {
        bubble.style.top = (headY - 35 - bubbleRect.height) + "px";
      }

      // After delayTime, start fade out
      setTimeout(() => {
        bubble.style.opacity = "0";
        setTimeout(() => {
          if (bubble.parentNode) {
            bubble.parentNode.removeChild(bubble);
          }
          resolve();
        }, fadeTime);
      }, delayTime);
    });
  }
}