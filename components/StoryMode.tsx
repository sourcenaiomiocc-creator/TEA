import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Sparkles, Loader2, RotateCcw } from 'lucide-react';
import { generateStoryAndAudio } from '../services/geminiService';
import { LetterData } from '../types';

interface StoryModeProps {
  data: LetterData;
}

export const StoryMode: React.FC<StoryModeProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState<string | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    return () => {
      if (sourceNodeRef.current) {
        try { sourceNodeRef.current.stop(); } catch (e) { /* ignore */ }
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateStoryAndAudio(data.char, data.word);
      setText(result.text);
      setAudioBuffer(result.audioBuffer);
      playAudio(result.audioBuffer);
    } catch (err) {
      setError("Ops! Não consegui criar a história agora.");
    } finally {
      setLoading(false);
    }
  };

  const playAudio = (buffer: AudioBuffer | null) => {
    const buf = buffer || audioBuffer;
    if (!buf) return;

    if (sourceNodeRef.current) {
        try { sourceNodeRef.current.stop(); } catch(e) {}
    }
    
    if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
       audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const ctx = audioContextRef.current;
    const source = ctx.createBufferSource();
    source.buffer = buf;
    source.connect(ctx.destination);
    
    source.onended = () => setIsPlaying(false);
    
    source.start();
    sourceNodeRef.current = source;
    setIsPlaying(true);
  };

  const stopAudio = () => {
    if (sourceNodeRef.current) {
      try { sourceNodeRef.current.stop(); } catch (e) {}
      setIsPlaying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-80 text-white">
        <div className="relative">
          <div className="absolute inset-0 bg-white/30 rounded-full blur-xl animate-pulse"></div>
          <Loader2 size={80} className="animate-spin relative z-10" />
        </div>
        <p className="text-2xl font-bold animate-pulse mt-8 drop-shadow-md">A Mágica está acontecendo...</p>
      </div>
    );
  }

  if (text && audioBuffer) {
    return (
      <div className="flex flex-col items-center w-full max-w-lg mx-auto p-4 animate-in fade-in slide-in-from-bottom-10 duration-500">
        <div className="glass-panel p-8 rounded-[40px] w-full mb-8 relative overflow-hidden">
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
           <p className="text-2xl text-white font-medium leading-relaxed font-sans text-center drop-shadow-md relative z-10">
            "{text}"
          </p>
        </div>

        <div className="flex gap-6">
          <button
            onClick={() => isPlaying ? stopAudio() : playAudio(null)}
            className="flex items-center gap-3 bg-gradient-to-br from-green-400 to-emerald-600 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg shadow-green-400/30 active:scale-95 transition-transform"
          >
            {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
            {isPlaying ? "Parar" : "Ouvir"}
          </button>
          
          <button
            onClick={handleGenerate}
            className="flex items-center justify-center bg-white/20 hover:bg-white/30 text-white p-4 rounded-full backdrop-blur-md active:scale-95 transition-transform border border-white/30"
            title="Nova História"
          >
            <RotateCcw size={28} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full pt-12">
      <div className="text-[10rem] mb-4 animate-float drop-shadow-2xl filter brightness-110">
        {data.emoji}
      </div>
      
      <div className="glass-panel px-6 py-4 rounded-2xl mb-10 max-w-xs text-center">
        <p className="text-white text-lg font-medium">
          Vamos ouvir uma história sobre o <span className="font-bold text-yellow-300">{data.word}</span>?
        </p>
      </div>
      
      {error && (
        <div className="bg-red-500/80 backdrop-blur text-white px-6 py-3 rounded-xl mb-4 font-bold animate-bounce">
          {error}
        </div>
      )}

      <button
        onClick={handleGenerate}
        className="group relative flex items-center gap-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-10 py-6 rounded-full font-extrabold text-2xl shadow-[0_10px_40px_-10px_rgba(167,139,250,0.6)] active:scale-95 transition-all overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 -skew-x-12"></div>
        <Sparkles className="animate-pulse w-8 h-8" />
        <span className="relative z-10">Criar Mágica</span>
      </button>
    </div>
  );
};