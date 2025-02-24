class WaveAnimation {
    /**
     * @param {StickWoman} stickWoman - the stickWoman instance to animate.
     * @param {CanvasRenderingContext2D} ctx - the canvas drawing context.
     * @param {HTMLCanvasElement} canvas - the canvas element.
     * @param {number} waveDuration - duration of the waving phase in seconds.
     */
    constructor(stickWoman, ctx, canvas, waveDuration) {
      this.stickWoman = stickWoman;
      this.ctx = ctx;
      this.canvas = canvas;
      // Target angle untuk tangan kanan di posisi terangkat.
      // Di drawing, tangan dibuat dari (0,0) ke (0, armLength) yang awalnya mengarah ke bawah.
      // Dengan set rotation ke Math.PI - 1.2, tangan akan mengarah ke atas.
      this.raiseTargetAngle = Math.PI - 1.2;
      this.phase = 'raising'; // Mulai dengan menaikkan tangan.
      this.oscillationStartTime = null;
      this.waveDuration = waveDuration; // dalam detik
  
      // Konfigurasi untuk osilasi (waving)
      this.amplitude = 0.5;  // radian; dapat diubah untuk variasi gerakan
      this.frequency = 5;    // mengontrol kecepatan osilasi
      // Kecepatan menaikkan tangan (dalam radian per frame)
      this.raiseSpeed = 0.05;
  
      // Simpan sudut awal tangan kanan agar bisa dikembalikan
      this.initialAngle = this.stickWoman.rightArmAngle;
    }
  
    animate(timestamp) {
      // Bersihkan canvas untuk frame baru.
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
      if (this.phase === 'raising') {
        // Naikkan sudut tangan kanan sampai mencapai target.
        if (this.stickWoman.rightArmAngle < this.raiseTargetAngle) {
          this.stickWoman.rightArmAngle += this.raiseSpeed;
          if (this.stickWoman.rightArmAngle > this.raiseTargetAngle) {
            this.stickWoman.rightArmAngle = this.raiseTargetAngle;
          }
        } else {
          // Setelah tangan terangkat, pindah ke fase waving.
          this.phase = 'waving';
          this.oscillationStartTime = timestamp;
        }
      } else if (this.phase === 'waving') {
        const elapsed = (timestamp - this.oscillationStartTime) / 1000; // waktu dalam detik
        if (elapsed < this.waveDuration) {
          // Osilasi sudut tangan di sekitar target yang sudah terangkat.
          const offset = this.amplitude * Math.sin(this.frequency * elapsed);
          this.stickWoman.rightArmAngle = this.raiseTargetAngle + offset;
        } else {
          // Setelah durasi waving selesai, set tangan ke target dan pindah ke fase lowering.
          this.stickWoman.rightArmAngle = this.raiseTargetAngle;
          this.phase = 'lowering';
        }
      } else if (this.phase === 'lowering') {
        // Turunkan tangan secara bertahap kembali ke posisi awal.
        if (this.stickWoman.rightArmAngle > this.initialAngle) {
          this.stickWoman.rightArmAngle -= this.raiseSpeed;
          if (this.stickWoman.rightArmAngle < this.initialAngle) {
            this.stickWoman.rightArmAngle = this.initialAngle;
            this.phase = 'finished';
          }
        } else {
          this.stickWoman.rightArmAngle = this.initialAngle;
          this.phase = 'finished';
        }
      }
  
      // Gambar ulang stickWoman dengan posisi tangan yang baru.
      this.stickWoman.draw();
  
      // Lanjutkan animasi jika belum selesai.
      if (this.phase !== 'finished') {
        requestAnimationFrame(this.animate.bind(this));
      }
    }
  
    start() {
      requestAnimationFrame(this.animate.bind(this));
    }
  }  