import React, { useRef, useEffect, useState } from 'react';
import { Eraser } from 'lucide-react';

interface TracingCanvasProps {
  letter: string;
}

export const TracingCanvas: React.FC<TracingCanvasProps> = ({ letter }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Set resolution for high DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 25; // Thicker for kids
      
      // Neon Effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00ffff';
      ctx.strokeStyle = '#00ffff'; 
      
      // Draw the guide letter
      drawGuide(ctx, rect.width, rect.height);
    }
  };

  const drawGuide = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.save();
    ctx.shadowBlur = 0; // No glow for the guide
    ctx.font = `900 ${height * 0.7}px "M PLUS Rounded 1c", sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, width / 2, height / 2 + (height * 0.05));
    
    // Dashed outline for guide
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.strokeText(letter, width / 2, height / 2 + (height * 0.05));
    ctx.restore();
  };

  useEffect(() => {
    setupCanvas();
    window.addEventListener('resize', setupCanvas);
    return () => window.removeEventListener('resize', setupCanvas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letter]);

  const getCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = (event as React.MouseEvent).clientX;
      clientY = (event as React.MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault(); // Prevent scrolling on touch
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) ctx.closePath();
  };

  const clearCanvas = () => {
    setupCanvas();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <div className="relative w-full">
        {/* Futuristic Tablet Frame */}
        <div 
          ref={containerRef} 
          className="w-full h-80 bg-[#1e293b] rounded-[40px] shadow-2xl border-4 border-[#334155] relative overflow-hidden touch-none"
          style={{
             boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 60px rgba(0,0,0,0.5)'
          }}
        >
          {/* Grid Background Effect */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ 
                 backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)',
                 backgroundSize: '40px 40px'
               }}>
          </div>

          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="cursor-crosshair w-full h-full relative z-10"
          />
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={clearCanvas}
          className="clay-card flex items-center gap-2 bg-red-500 text-white px-8 py-3 rounded-full font-bold text-lg active:scale-95 transition-transform"
          style={{ background: '#ef4444', borderColor: '#f87171' }}
        >
          <Eraser className="w-6 h-6" /> 
          <span className="drop-shadow-sm">Limpar</span>
        </button>
      </div>
    </div>
  );
};