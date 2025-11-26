import React, { useState, useEffect } from 'react';
import { WORD_GAME_LEVELS } from '../constants';
import { WordGameLevel } from '../types';
import { Check, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const WordGame: React.FC = () => {
  const [levelIndex, setLevelIndex] = useState(0);
  const [currentSlots, setCurrentSlots] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<{char: string, id: number}[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const currentLevel: WordGameLevel = WORD_GAME_LEVELS[levelIndex];

  useEffect(() => {
    resetLevel();
  }, [levelIndex]);

  const resetLevel = () => {
    setIsSuccess(false);
    setCurrentSlots(new Array(currentLevel.word.length).fill(''));
    setAvailableLetters(
      currentLevel.shuffled.map((char, i) => ({ char, id: i }))
    );
  };

  const handleLetterClick = (char: string, id: number) => {
    // Find first empty slot
    const emptyIndex = currentSlots.findIndex(s => s === '');
    if (emptyIndex === -1) return;

    const newSlots = [...currentSlots];
    newSlots[emptyIndex] = char;
    setCurrentSlots(newSlots);

    // Remove from available
    setAvailableLetters(prev => prev.filter(l => l.id !== id));

    // Check win condition
    if (newSlots.join('') === currentLevel.word) {
      handleWin();
    }
  };

  const handleSlotClick = (index: number) => {
    const char = currentSlots[index];
    if (!char) return;

    // Return letter to available pool
    // We need a unique ID, simpler to just re-generate one that doesn't conflict or just push
    // Since simple game, let's just create a new ID based on timestamp
    setAvailableLetters(prev => [...prev, { char, id: Date.now() }]);
    
    const newSlots = [...currentSlots];
    newSlots[index] = '';
    setCurrentSlots(newSlots);
  };

  const handleWin = () => {
    setIsSuccess(true);
    const audio = new Audio('https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg'); // Fallback SFX or simple beep
    audio.play().catch(() => {});
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    const utter = new SpeechSynthesisUtterance(`Muito bem! ${currentLevel.word}`);
    utter.lang = 'pt-BR';
    window.speechSynthesis.speak(utter);
  };

  const nextLevel = () => {
    if (levelIndex < WORD_GAME_LEVELS.length - 1) {
      setLevelIndex(prev => prev + 1);
    } else {
      setLevelIndex(0); // Loop back
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-24 px-4 h-full w-full max-w-lg mx-auto">
      
      {/* Target Image */}
      <div className="mb-8 relative group">
        <div className="absolute inset-0 bg-white/30 rounded-full blur-xl group-hover:bg-yellow-400/30 transition-colors"></div>
        <div className="text-[9rem] drop-shadow-2xl animate-float relative z-10 transition-transform transform group-hover:scale-110 duration-300">
          {currentLevel.image}
        </div>
      </div>

      {/* Slots Area */}
      <div className="flex gap-2 mb-12">
        {currentSlots.map((char, i) => (
          <button
            key={i}
            onClick={() => !isSuccess && handleSlotClick(i)}
            className={`
              w-14 h-16 md:w-16 md:h-20 rounded-xl border-b-4 text-3xl font-black transition-all
              flex items-center justify-center
              ${char 
                ? 'bg-white border-purple-200 text-purple-600 shadow-lg translate-y-0' 
                : 'bg-black/20 border-transparent shadow-inner'}
              ${isSuccess ? 'bg-green-100 text-green-600 border-green-300 scale-110' : ''}
            `}
          >
            {char}
          </button>
        ))}
      </div>

      {/* Available Letters */}
      {!isSuccess ? (
        <div className="flex flex-wrap justify-center gap-3">
          {availableLetters.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLetterClick(item.char, item.id)}
              className="clay-card w-14 h-14 md:w-16 md:h-16 flex items-center justify-center text-2xl font-bold text-slate-700 active:scale-90 transition-transform hover:-translate-y-1"
            >
              {item.char}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center animate-in zoom-in duration-300">
          <div className="text-white text-2xl font-bold mb-4 drop-shadow-md">Incrível!</div>
          <button 
            onClick={nextLevel}
            className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg border-b-4 border-green-700 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2"
          >
            <span>Próxima</span>
            <Check size={24} strokeWidth={4} />
          </button>
        </div>
      )}

      {/* Reset Button */}
      <div className="fixed bottom-8 right-4">
        <button 
          onClick={resetLevel}
          className="bg-white/20 p-3 rounded-full text-white hover:bg-white/40 backdrop-blur-md transition-colors"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
};