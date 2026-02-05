import { useEffect, useRef } from "react";

function Scene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationId: number;
    let rotation = 0;

    // Particle system for the glowing core
    const particles: Array<{ x: number; y: number; z: number; size: number; alpha: number }> = [];
    for (let i = 0; i < 50; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = Math.random() * 80 + 40;
      particles.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.5,
      });
    }

    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Clear canvas with dark background
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      rotation += 0.005;

      // Draw outer cube wireframe
      const cubeSize = 150;
      const cubePoints = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
      ];

      const rotatedCube = cubePoints.map(([x, y, z]) => {
        // Rotate around Y axis
        let newX = x * Math.cos(rotation) - z * Math.sin(rotation);
        let newZ = x * Math.sin(rotation) + z * Math.cos(rotation);
        // Rotate around X axis
        let newY = y * Math.cos(rotation * 0.7) - newZ * Math.sin(rotation * 0.7);
        newZ = y * Math.sin(rotation * 0.7) + newZ * Math.cos(rotation * 0.7);

        const scale = 1 / (1 + newZ * 0.001);
        return {
          x: centerX + newX * cubeSize * scale,
          y: centerY + newY * cubeSize * scale,
          z: newZ,
          scale,
        };
      });

      // Draw cube edges
      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
      ];

      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 2;
      edges.forEach(([start, end]) => {
        const p1 = rotatedCube[start];
        const p2 = rotatedCube[end];
        
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw inner sphere void (darker circle)
      const sphereRadius = 80;
      const gradient1 = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, sphereRadius);
      gradient1.addColorStop(0, "rgba(0, 0, 0, 0.9)");
      gradient1.addColorStop(1, "rgba(0, 0, 0, 0.3)");
      
      ctx.fillStyle = gradient1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sphereRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw glowing particles in the core
      particles.forEach((particle, i) => {
        // Rotate particles
        const theta = rotation * 0.5 + (i * Math.PI * 2) / particles.length;
        const phi = rotation * 0.3 + (i * Math.PI) / particles.length;
        
        const x = particle.x * Math.cos(theta) - particle.z * Math.sin(theta);
        const z = particle.x * Math.sin(theta) + particle.z * Math.cos(theta);
        const y = particle.y * Math.cos(phi) - z * Math.sin(phi);

        const scale = 1 / (1 + z * 0.005);
        const screenX = centerX + x * scale;
        const screenY = centerY + y * scale;

        const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, particle.size * scale * 3);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.alpha * scale})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(screenX, screenY, particle.size * scale * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw central glow
      const glowGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 60);
      glowGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
      glowGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.3)");
      glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}

function Navbar({ links }: { links: Array<{ name: string; href: string }> }) {

  return (
    <nav className="absolute top-4 left-4 right-4 md:top-10 md:left-10 md:right-10 z-30">
      <ul className="hidden md:flex gap-8 lg:gap-12">
        {links.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="text-sm font-light tracking-[0.2em] mix-blend-difference text-white hover:opacity-70 transition-opacity duration-300"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
      
      <ul className="md:hidden flex flex-col gap-3 items-end">
        {links.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="text-xs font-light tracking-[0.15em] mix-blend-difference text-white hover:opacity-70 transition-opacity duration-300"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface HeroProps {
  title: string;
  description: string;
  links: Array<{ name: string; href: string }>;
}

export const Hero: React.FC<HeroProps> = ({ title, description, links }) => {
  return (
    <div className="h-svh w-screen relative bg-[#0A0A0A]">
      <Navbar links={links} />
      <div className="absolute inset-0">
        <Scene />
      </div>
      <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 z-20 max-w-md">
        <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-3 text-white">
            {title}
        </h1>
        <p className="font-mono text-xs md:text-sm leading-relaxed font-light tracking-tight text-white/50">
            {description}
        </p>
      </div>
    </div>
  );
}
