import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { SyllableData } from '../types';

interface SyllableModeProps {
  data: SyllableData;
}

export const SyllableMode: React.FC<SyllableModeProps> = ({ data }) => {
  const [selectedSyllable, setSelectedSyllable] = useState<string | null>(null);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text.toLowerCase());
    utterance.lang = 'pt-BR';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center pt-24 pb-8 px-4 h-full">
      {/* Header Card */}
      <div className="clay-card mb-8 px-8 py-4 bg-white flex items-center gap-4 animate-float">
        <span className="text-6xl font-black text-purple-600">{data.consonant}</span>
        <span className="text-2xl text-slate-400 font-bold">+ Vogais</span>
      </div>

      {/* Syllable Grid */}
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-md mb-10">
        {data.family.map((syllable, index) => (
          <button
            key={syllable}
            onClick={() => {
              setSelectedSyllable(syllable);
              speak(syllable);
            }}
            className={`
              w-20 h-24 rounded-2xl flex items-center justify-center transition-all duration-300
              ${selectedSyllable === syllable 
                ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white scale-110 shadow-xl shadow-purple-500/40 ring-4 ring-white' 
                : 'clay-card bg-white hover:bg-purple-50 text-slate-700 active:scale-95'}
            `}
          >
            <span className="text-2xl font-black">{syllable}</span>
          </button>
        ))}
      </div>

      {/* Example Context */}
      <div className="glass-panel w-full max-w-sm rounded-[30px] p-6 flex flex-col items-center animate-in fade-in slide-in-from-bottom-10">
        <div className="text-[6rem] mb-2 drop-shadow-xl animate-bounce-slow">
            {data.emoji}
        </div>
        <div 
          className="flex items-center gap-3 bg-white/20 px-6 py-2 rounded-full cursor-pointer hover:bg-white/40 transition-colors"
          onClick={() => speak(data.example)}
        >
          <span className="text-3xl font-black text-white tracking-widest">{data.example}</span>
          <Volume2 className="text-white" />
        </div>
      </div>
    </div>
  );
};