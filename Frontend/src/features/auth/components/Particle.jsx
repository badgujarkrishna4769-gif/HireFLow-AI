import React, { useEffect, useRef } from "react";

const Particle = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;

    let particles = [];
    let animationId;

    const mouse = {
      x: null,
      y: null,
      radius: 400,
    };

    // Canvas dimensions
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;

      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;

      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createParticles();
    };

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;

        this.size = Math.random() * 2 + 1;

        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce from canvas boundaries
        if (this.x < 0 || this.x > canvasWidth) {
          this.speedX *= -1;
        }

        if (this.y < 0 || this.y > canvasHeight) {
          this.speedY *= -1;
        }

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const opacity = 1 - distance / 120;

            ctx.strokeStyle = `rgb(213, 82, 163, ${opacity * 0.5})`;
            ctx.lineWidth = 1.2;

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      draw() {
        ctx.fillStyle = "#FFE4F6";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const createParticles = () => {
      particles = [];

      const particleCount = Math.min(
        Math.floor((canvasWidth * canvasHeight) / (canvasWidth > 500 ? 12000 : 5000)),
        150,
      );

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 300) {
            const opacity = 1 - distance / 120;

            ctx.strokeStyle = `rgb(213, 82, 163, ${opacity * 0.5})`;
            ctx.lineWidth = 0.8;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      connectParticles();

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);

      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="inset-0 w-full h-full pointer-events-none -z-10"
    />
  );
};

export default Particle;
