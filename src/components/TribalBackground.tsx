
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TribalBackgroundProps {
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
}

const TribalBackground = ({ className, intensity = 'medium' }: TribalBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Intensity settings for opacity and pattern density
    const opacityMap = {
      light: 0.08,
      medium: 0.15,
      strong: 0.25
    };
    
    const patternDensityMap = {
      light: 20,
      medium: 32,
      strong: 48
    };
    
    // Tribal patterns - based on Taíno art
    const patterns = [
      // Spiral pattern
      (x: number, y: number, size: number, ctx: CanvasRenderingContext2D) => {
        ctx.beginPath();
        for (let i = 0; i < 2 * Math.PI; i += 0.1) {
          const radius = size * i / (2 * Math.PI);
          const xPos = x + radius * Math.cos(i * 5);
          const yPos = y + radius * Math.sin(i * 5);
          
          if (i === 0) {
            ctx.moveTo(xPos, yPos);
          } else {
            ctx.lineTo(xPos, yPos);
          }
        }
        ctx.stroke();
      },
      
      // Sun/star pattern
      (x: number, y: number, size: number, ctx: CanvasRenderingContext2D) => {
        const rays = 8;
        ctx.beginPath();
        for (let i = 0; i < rays; i++) {
          const angle = (i / rays) * 2 * Math.PI;
          ctx.moveTo(x, y);
          ctx.lineTo(
            x + size * Math.cos(angle),
            y + size * Math.sin(angle)
          );
        }
        ctx.stroke();
        
        // Inner circle
        ctx.beginPath();
        ctx.arc(x, y, size * 0.3, 0, 2 * Math.PI);
        ctx.stroke();
      },
      
      // Wave pattern
      (x: number, y: number, size: number, ctx: CanvasRenderingContext2D) => {
        ctx.beginPath();
        const width = size * 2;
        const height = size * 0.5;
        const startX = x - width / 2;
        
        for (let i = 0; i <= width; i += 1) {
          const xPos = startX + i;
          const yPos = y + Math.sin(i * 0.1) * height;
          
          if (i === 0) {
            ctx.moveTo(xPos, yPos);
          } else {
            ctx.lineTo(xPos, yPos);
          }
        }
        ctx.stroke();
      },
      
      // Face/mask pattern
      (x: number, y: number, size: number, ctx: CanvasRenderingContext2D) => {
        // Face outline
        ctx.beginPath();
        ctx.arc(x, y, size * 0.7, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Eyes
        ctx.beginPath();
        ctx.arc(x - size * 0.3, y - size * 0.2, size * 0.15, 0, 2 * Math.PI);
        ctx.arc(x + size * 0.3, y - size * 0.2, size * 0.15, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Mouth
        ctx.beginPath();
        ctx.arc(x, y + size * 0.2, size * 0.3, 0.1 * Math.PI, 0.9 * Math.PI);
        ctx.stroke();
      },
      
      // Zigzag pattern
      (x: number, y: number, size: number, ctx: CanvasRenderingContext2D) => {
        ctx.beginPath();
        const width = size * 2;
        const height = size * 0.5;
        const startX = x - width / 2;
        const segments = 8;
        const segmentWidth = width / segments;
        
        for (let i = 0; i <= segments; i++) {
          const xPos = startX + i * segmentWidth;
          const yPos = y + (i % 2 === 0 ? -height : height);
          
          if (i === 0) {
            ctx.moveTo(xPos, yPos);
          } else {
            ctx.lineTo(xPos, yPos);
          }
        }
        ctx.stroke();
      }
    ];
    
    // Pattern elements
    const elements: {
      x: number;
      y: number;
      size: number;
      pattern: number;
      alpha: number;
      targetAlpha: number;
      scrollY: number;
    }[] = [];
    
    // Initialize elements
    const initElements = () => {
      elements.length = 0;
      
      // Use pattern density based on intensity
      const numElements = patternDensityMap[intensity];
      for (let i = 0; i < numElements; i++) {
        elements.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 3, // Distributed across 3x the viewport height
          size: 20 + Math.random() * 40,
          pattern: Math.floor(Math.random() * patterns.length),
          alpha: 0,
          targetAlpha: opacityMap[intensity] + Math.random() * 0.1, // Random opacity for visual variety
          scrollY: 0
        });
      }
    };
    
    // Handle scroll
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      
      elements.forEach(element => {
        element.scrollY = window.scrollY;
        // Different parallax speeds
        element.y -= delta * (0.2 + Math.random() * 0.4);
        
        // Reset elements that go out of view
        if (element.y < -100) {
          element.y = canvas.height + 100;
          element.x = Math.random() * canvas.width;
        } else if (element.y > canvas.height + 100) {
          element.y = -100;
          element.x = Math.random() * canvas.width;
        }
      });
    };
    
    // Draw function
    const draw = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      elements.forEach(element => {
        // Calculate if the element is in view (with some buffer)
        const inView = element.y > -200 && element.y < canvas.height + 200;
        
        // Adjust opacity based on visibility
        element.alpha = inView 
          ? element.alpha + (element.targetAlpha - element.alpha) * 0.05 
          : element.alpha * 0.95;
        
        if (element.alpha > 0.01) {
          // Draw element
          ctx.save();
          ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--tribal-color') || '#ffd600';
          ctx.lineWidth = intensity === 'strong' ? 2 : 1;
          ctx.globalAlpha = element.alpha;
          
          const y = element.y - element.scrollY * 0.1; // Parallax effect
          patterns[element.pattern](element.x, y, element.size, ctx);
          
          ctx.restore();
        }
      });
      
      requestAnimationFrame(draw);
    };
    
    // Initialize
    resizeCanvas();
    initElements();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll);
    
    // Start animation
    draw();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [intensity]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={cn("fixed inset-0 pointer-events-none z-0", className)}
    />
  );
};

export default TribalBackground;
