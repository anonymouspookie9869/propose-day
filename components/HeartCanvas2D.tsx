import React, { useEffect, useRef } from 'react';

const HeartCanvas2D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const mobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      (navigator.userAgent || navigator.vendor || (window as any).opera || "").toLowerCase()
    );
    
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const heartPosition = (rad: number) => [
      Math.pow(Math.sin(rad), 3),
      -(15 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad)),
    ];

    const scaleAndTranslate = (pos: number[], sx: number, sy: number, dx: number, dy: number) => [dx + pos[0] * sx, dy + pos[1] * sy];

    const pointsOrigin: number[][] = [];
    // Restored to original high density values
    const traceCount = mobile ? 20 : 50; 
    const rand = Math.random;
    const dr = mobile ? 0.2 : 0.1; 

    for (let i = 0; i < Math.PI * 2; i += dr) {
      pointsOrigin.push(scaleAndTranslate(heartPosition(i), 180, 11, 0, 0));
      pointsOrigin.push(scaleAndTranslate(heartPosition(i), 110, 7, 0, 0));
      pointsOrigin.push(scaleAndTranslate(heartPosition(i), 50, 3, 0, 0));
    }

    const heartPointsCount = pointsOrigin.length;
    const targetPoints: number[][] = [];

    const pulse = (kx: number, ky: number) => {
      for (let i = 0; i < heartPointsCount; i++) {
        targetPoints[i] = [
          kx * pointsOrigin[i][0] + width / 2,
          ky * pointsOrigin[i][1] + height / 2,
        ];
      }
    };

    // Restored to original lush particle count
    const particleCount = mobile ? 60 : 120; 
    const particles = Array.from({ length: particleCount }, () => {
      const x = rand() * width;
      const y = rand() * height;
      const trace = Array.from({ length: traceCount }, () => ({ x, y }));

      return {
        vx: 0,
        vy: 0,
        speed: rand() * 2 + 3,
        q: ~~(rand() * heartPointsCount),
        D: 2 * (~~(rand() * 2)) - 1,
        force: 0.1 * rand() + 0.8,
        // Slightly more vibrant color for light backgrounds
        f: 'rgba(225, 29, 72, 0.45)',
        trace,
      };
    });

    const config = { traceK: 0.4, timeDelta: 0.05 };
    let time = 0;

    const loop = () => {
      const n = -Math.cos(time);
      pulse((1 + n) * 0.5, (1 + n) * 0.5);
      time += config.timeDelta;
      
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        const q = targetPoints[particle.q];
        if (!q) return;
        const dx = particle.trace[0].x - q[0];
        const dy = particle.trace[0].y - q[1];
        const length = Math.sqrt(dx * dx + dy * dy);

        if (length < 10) {
          if (rand() > 0.95) {
            particle.q = ~~(rand() * heartPointsCount);
          }
          particle.q = (particle.q + particle.D) % heartPointsCount;
          if (particle.q < 0) particle.q += heartPointsCount;
        }

        particle.vx += (-dx / length) * particle.speed * 0.12;
        particle.vy += (-dy / length) * particle.speed * 0.12;
        particle.trace[0].x += particle.vx;
        particle.trace[0].y += particle.vy;
        particle.vx *= particle.force;
        particle.vy *= particle.force;

        for (let i = 1; i < traceCount; i++) {
          const prev = particle.trace[i - 1];
          const curr = particle.trace[i];
          curr.x -= config.traceK * (curr.x - prev.x);
          curr.y -= config.traceK * (curr.y - prev.y);
        }

        ctx.fillStyle = particle.f;
        for (let i = 0; i < traceCount; i++) {
           ctx.fillRect(particle.trace[i].x, particle.trace[i].y, 1.8, 1.8);
        }
      });

      window.requestAnimationFrame(loop);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    loop();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
};

export default HeartCanvas2D;