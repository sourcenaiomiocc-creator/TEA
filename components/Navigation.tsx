import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';

interface NavigationProps {
  onBack?: () => void;
  onHome: () => void;
  title?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ onBack, onHome, title }) => {
  return (
    <div className="fixed top-6 left-0 w-full flex justify-center z-50 pointer-events-none">
      <div className="glass-panel rounded-full px-2 py-2 flex items-center justify-between pointer-events-auto min-w-[90%] max-w-md shadow-2xl border border-white/40">
        <div className="flex items-center gap-2">
          {onBack ? (
            <button
              onClick={onBack}
              className="bg-white/80 hover:bg-white text-blue-500 w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90 shadow-md"
              aria-label="Voltar"
            >
              <ArrowLeft size={24} strokeWidth={3} />
            </button>
          ) : (
            <div className="w-12 h-12" /> /* Spacer */
          )}
        </div>

        <h1 className="text-xl font-extrabold text-white drop-shadow-md tracking-wider uppercase">
            {title || "Alfabeto 3D"}
        </h1>

        <button
          onClick={onHome}
          className="bg-white/80 hover:bg-white text-purple-500 w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90 shadow-md"
          aria-label="Início"
        >
          <Home size={24} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};