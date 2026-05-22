import { useEffect, useRef } from 'react';

interface Particle {
  w: number;
  h: number;
  baseR: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  cycleDur: number;
  hue: number;
  opacity: number;
  noise: {
    t: number;
    a1: number;
    a2: number;
    f1: number;
    f2: number;
    f3: number;
  };
  update(dt: number): void;
  draw(ctx: CanvasRenderingContext2D, time: number): void;
}

class ParticleImpl implements Particle {
  w: number;
  h: number;
  baseR: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  cycleDur: number;
  hue: number;
  opacity: number;
  noise: { t: number; a1: number; a2: number; f1: number; f2: number; f3: number };

  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.baseR = w * (0.12 + Math.random() * 0.15);
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = 0.08 + Math.random() * 0.15;
    this.cycleDur = 8000 + Math.random() * 12000;
    const hues = [28, 340, 38, 18];
    this.hue = hues[Math.floor(Math.random() * hues.length)];
    this.opacity = 0.08 + Math.random() * 0.06;
    this.noise = {
      t: Math.random() * 1000,
      a1: Math.random() * Math.PI * 2,
      a2: Math.random() * Math.PI * 2,
      f1: 0.0007 + Math.random() * 0.0005,
      f2: 0.002 + Math.random() * 0.001,
      f3: 0.008 + Math.random() * 0.004,
    };
  }

  update(dt: number) {
    this.noise.t += dt;
    this.angle += (Math.random() - 0.5) * 0.02;
    const dx = Math.cos(this.angle) * this.speed;
    const dy = Math.sin(this.angle) * this.speed;
    const t = this.noise.t;
    const n1 = Math.sin(t * this.noise.f1 + this.noise.a1);
    const n2 = Math.sin(t * this.noise.f2 + this.noise.a2);
    const n3 = Math.sin(t * this.noise.f3);
    this.x += dx + n3 * 0.4;
    this.y += dy + n2 * 0.3;
    this.baseR += n1 * 0.05;
    if (this.x < -this.baseR) this.x = this.w + this.baseR;
    else if (this.x > this.w + this.baseR) this.x = -this.baseR;
    if (this.y < -this.baseR) this.y = this.h + this.baseR;
    else if (this.y > this.h + this.baseR) this.y = -this.baseR;
  }

  draw(ctx: CanvasRenderingContext2D, time: number) {
    const pulse = Math.sin(time / this.cycleDur * Math.PI * 2) * 0.08;
    const r = this.baseR * (1 + pulse);
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r);
    grad.addColorStop(0, `hsla(${this.hue}, 60%, 75%, ${this.opacity})`);
    grad.addColorStop(1, `hsla(${this.hue}, 60%, 75%, 0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let lastTime = 0;
    let animTime = 0;
    let rafId = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = width + 'px';
      canvas!.style.height = height + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < 3; i++) {
        particles.push(new ParticleImpl(width, height));
      }
    }

    function loop(timestamp: number) {
      if (!lastTime) lastTime = timestamp;
      const dt = Math.min(timestamp - lastTime, 50);
      lastTime = timestamp;
      animTime += dt;
      ctx!.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.update(dt);
        p.draw(ctx!, animTime);
      }
      rafId = requestAnimationFrame(loop);
    }

    function handleVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        lastTime = 0;
      } else {
        rafId = requestAnimationFrame(loop);
      }
    }

    resize();
    initParticles();
    rafId = requestAnimationFrame(loop);

    window.addEventListener('resize', () => {
      resize();
      initParticles();
    });
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  );
}
