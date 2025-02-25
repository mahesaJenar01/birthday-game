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
   * Menampilkan bubble pesan dengan teks yang diberikan dan mengembalikan Promise
   * yang resolve setelah pesan selesai fade out dan dihapus.
   *
   * @param {string} message - Teks pesan (bisa multi-baris)
   * @param {number} headX - Koordinat X dari kepala stickwoman (relative terhadap container)
   * @param {number} headY - Koordinat Y dari kepala stickwoman (relative terhadap container)
   * @param {number} totalTime - Total waktu tampilan pesan (dalam detik)
   * @returns {Promise} Promise yang resolve setelah bubble selesai dihapus.
   */
  start(message, headX, headY, totalTime) {
    return new Promise(resolve => {
      const totalTimeMs = totalTime * 1000;
      const delayTime = totalTimeMs * 0.9; // 90% waktu tampil penuh
      const fadeTime = totalTimeMs * 0.1;  // 10% untuk fade out

      // Format message with 5-word limit per line
      const formattedMessage = this.formatMessageWith5WordLimit(message);

      const bubble = document.createElement("div");
      bubble.className = "message-bubble";
      bubble.style.position = "absolute";
      // Posisi awal: bubble muncul tepat di atas kepala
      bubble.style.top = headY - 10 + "px";
      bubble.style.background = "white";
      bubble.style.border = "1px solid #000";
      bubble.style.borderRadius = "10px";
      bubble.style.padding = "10px";
      bubble.style.whiteSpace = "pre-wrap";
      bubble.style.opacity = "1";
      bubble.style.transition = `opacity ${fadeTime / 1000}s ease`;

      bubble.innerText = formattedMessage;
      this.container.appendChild(bubble);

      // Penyesuaian posisi agar tidak menutupi kepala stickwoman
      const bubbleRect = bubble.getBoundingClientRect();
      const containerRect = this.container.getBoundingClientRect();
      const bubbleBottom = bubbleRect.bottom - containerRect.top;
      if (bubbleBottom > headY - 35) {
        bubble.style.top = (headY - 35 - bubbleRect.height) + "px";
      }

      // Setelah delayTime, mulai proses fade out
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