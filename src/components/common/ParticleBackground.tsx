import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

// Max distance² for particle connections (80px → 80*80 = 6400).
// Keeping as squared avoids Math.sqrt for all pairs that don't connect.
const CONNECT_DIST = 80;
const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;

export function ParticleBackground() {
  // Respect the user's motion preference — skip the entire canvas when set.
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return null;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // `willReadFrequently: false` lets the browser optimize for write-only canvas.
    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      // Cap at 50 particles max — limits connection checks to 50*49/2 = 1225 per frame
      // (vs ~5000 for 100 particles on a 1080p screen).
      const density = Math.floor((canvas.width * canvas.height) / 22000);
      const count = Math.min(density, 50);
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = resolvedTheme === 'dark' ? '59, 130, 246' : '37, 99, 235';
      const pts = particlesRef.current;

      // Update positions
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]!;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
        ctx.fill();
      }

      // Draw connections using squared distance — sqrt only for connected pairs
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i]!;
          const b = pts[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < CONNECT_DIST_SQ) {
            // Only compute sqrt for pairs that will actually render
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${color}, ${0.08 * (1 - dist / CONNECT_DIST)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      resize();
      initParticles();
    };

    // Pause rendering when the tab is hidden — saves battery and CPU
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationRef.current);
      } else {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    resize();
    initParticles();
    draw();

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
