import React, { useEffect, useRef, useState } from "react";

const InterviewReportBackground = () => {
    const canvasRef = useRef(null);

    const columns = 15;

    const [screenWidth, setScreenWidth] = useState({
        tileSize: 0,
        rowCount: 0,
        gap: 3,
    });

    const { tileSize, rowCount, gap } = screenWidth;
    const tileCount = rowCount * columns;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        let canvasWidth = window.innerWidth;
        let canvasHeight = window.innerHeight;
        let particles = [];
        let animationId;

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

        class Particle {
            constructor() {
                this.x = canvasWidth / 2;
                this.y = canvasHeight / 2;

                const minSize = canvasWidth <= 480 ? 50 : canvasWidth <= 768 ? 70 : 120;
                const maxSize = canvasWidth <= 480 ? 100 : canvasWidth <= 768 ? 140 : 220;

                this.size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;

                this.speedX = (Math.random() - 0.5) * 4;
                this.speedY = (Math.random() - 0.5) * 4;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if(this.x < this.size || this.x > canvasWidth - this.size) {
                    this.speedX *= -1;
                }

                if(this.y < this.size || this.y > canvasHeight - this.size) {
                    this.speedY *= -1;
                }
            }

            draw() {
                ctx.save();

                ctx.shadowBlur = 180;
                ctx.shadowColor = "#8E1EA2";
                ctx.fillStyle = "#8E1EA2";

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            }
        }

        const createParticles = () => {
            particles = [];

            const particleCount = 3;

            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            animationId = requestAnimationFrame(animate);
        };

        resizeCanvas();
        animate();

        window.addEventListener("resize", resizeCanvas);

        return () => {
            cancelAnimationFrame(animationId);

            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    useEffect(() => {
        const updateDimensions = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            const currentGap = width <= 500 ? 2 : 3;

            const size = (width - (columns - 1) * currentGap) / columns;

            const rows = Math.ceil((height + currentGap) / (size + currentGap));

            setScreenWidth({
                tileSize: size,
                rowCount: rows,
                gap: currentGap,
            });
        };

        updateDimensions();

        window.addEventListener("resize", updateDimensions);

        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 filter-[blur(40px)_contrast(100%)]"
            />
            <div
                className="h-screen w-screen backdrop-blur-[5px] grid absolute top-0 left-0 z-20 overflow-hidden"
                style={{
                    gap: `${gap}px`,
                    gridTemplateColumns: `repeat(${columns}, ${tileSize}px)`,
                    gridAutoRows: `${tileSize}px`,
                }}
            >
                {Array.from({ length: tileCount }, (_, i) => (
                    <div
                        key={i}
                        className="tile bg-[#0e0c11]"
                    />
                ))}
            </div>
        </>
    );
};

export default InterviewReportBackground;