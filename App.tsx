import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { ALPHABET_DATA, SYLLABLES_DATA, VOWELS } from './constants';
import { AppRoute, LetterData, SyllableData } from './types';
import { TracingCanvas } from './components/TracingCanvas';
import { StoryMode } from './components/StoryMode';
import { SyllableMode } from './components/SyllableMode';
import { WordGame } from './components/WordGame';
import { ChevronLeft, ChevronRight, Pencil, Sparkles, Volume2, Grid3X3, Type, Boxes, Gamepad2 } from 'lucide-react';

const App = () => {
  const [route, setRoute] = useState<AppRoute>(AppRoute.MENU);
  const [categoryType, setCategoryType] = useState<'ALPHABET' | 'VOWELS' | null>(null);
  
  // State for Alphabet/Vowel Navigation
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // State for Syllables
  const [currentSyllableData, setCurrentSyllableData] = useState<SyllableData>(SYLLABLES_DATA[0]);

  // Derived data based on category
  const activeDataList = categoryType === 'VOWELS' 
    ? ALPHABET_DATA.filter(l => VOWELS.includes(l.char))
    : ALPHABET_DATA;

  const currentLetter: LetterData = activeDataList[currentIndex] || activeDataList[0];

  const navigateToLetter = (index: number) => {
    setCurrentIndex(index);
    setRoute(AppRoute.LEARN);
  };

  const nextLetter = () => {
    setCurrentIndex((prev) => (prev + 1) % activeDataList.length);
  };

  const prevLetter = () => {
    setCurrentIndex((prev) => (prev - 1 + activeDataList.length) % activeDataList.length);
  };

  const speakWord = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // --- RENDERERS ---

  const renderMainMenu = () => (
    <div className="flex flex-col h-full pt-28 px-4 pb-8 overflow-y-auto no-scrollbar items-center">
      <div className="text-center mb-8 animate-float-delayed">
        <h2 className="text-4xl font-black text-white drop-shadow-md tracking-wide">Oi, Amiguinho!</h2>
        <p className="text-white/80 mt-2 font-medium">O que vamos aprender hoje?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <button 
          onClick={() => { setCategoryType('ALPHABET'); setRoute(AppRoute.ALPHABET); }}
          className="clay-card h-40 bg-blue-100 flex items-center justify-between px-8 hover:scale-[1.02] active:scale-95 transition-all group"
        >
          <div className="text-left">
            <span className="block text-3xl font-black text-blue-600 mb-1">Alfabeto</span>
            <span className="text-blue-400 font-bold">A - Z</span>
          </div>
          <Grid3X3 className="text-blue-500 w-16 h-16 group-hover:rotate-12 transition-transform" />
        </button>

        <button 
          onClick={() => { setCategoryType('VOWELS'); setRoute(AppRoute.VOWELS); }}
          className="clay-card h-40 bg-pink-100 flex items-center justify-between px-8 hover:scale-[1.02] active:scale-95 transition-all group"
        >
          <div className="text-left">
            <span className="block text-3xl font-black text-pink-600 mb-1">Vogais</span>
            <span className="text-pink-400 font-bold">A, E, I...</span>
          </div>
          <Type className="text-pink-500 w-16 h-16 group-hover:scale-110 transition-transform" />
        </button>

        <button 
          onClick={() => setRoute(AppRoute.SYLLABLES_MENU)}
          className="clay-card h-40 bg-purple-100 flex items-center justify-between px-8 hover:scale-[1.02] active:scale-95 transition-all group"
        >
          <div className="text-left">
            <span className="block text-3xl font-black text-purple-600 mb-1">Sílabas</span>
            <span className="text-purple-400 font-bold">BA, BE...</span>
          </div>
          <Boxes className="text-purple-500 w-16 h-16 group-hover:animate-bounce transition-transform" />
        </button>

        <button 
          onClick={() => setRoute(AppRoute.WORDS_GAME)}
          className="clay-card h-40 bg-green-100 flex items-center justify-between px-8 hover:scale-[1.02] active:scale-95 transition-all group"
        >
          <div className="text-left">
            <span className="block text-3xl font-black text-green-600 mb-1">Palavras</span>
            <span className="text-green-500 font-bold">Jogar</span>
          </div>
          <Gamepad2 className="text-green-500 w-16 h-16 group-hover:rotate-180 transition-transform duration-500" />
        </button>
      </div>
    </div>
  );

  const renderGrid = (data: LetterData[]) => (
    <div className="flex flex-col h-full pt-28 pb-4 px-4 overflow-y-auto no-scrollbar">
      <div className="grid grid-cols-2 gap-6 pb-32 max-w-2xl mx-auto w-full">
        {data.map((item, idx) => (
          <button
            key={item.char}
            onClick={() => navigateToLetter(idx)}
            className="clay-card relative h-40 flex flex-col items-center justify-center group overflow-hidden active:scale-95"
            style={{
              backgroundColor: item.bg.includes('white') ? '#ffffff' : undefined
            }}
          >
            <div className={`absolute top-0 left-0 w-full h-2 ${item.color.replace('text-', 'bg-')}`}></div>
            <span className={`text-6xl font-black mb-2 clay-text ${item.color}`}>{item.char}</span>
            <span className="text-4xl filter drop-shadow-md group-hover:scale-125 transition-transform duration-300">{item.emoji}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderLearnMode = () => (
    <div className="flex flex-col items-center justify-center h-full pt-24 px-4">
      {/* 3D Holographic Card */}
      <div className="relative w-full max-w-sm aspect-[3/4] clay-card flex flex-col items-center justify-center mb-10 animate-float border-4 border-white/50">
        
        <div className="flex justify-between w-full absolute top-1/2 -translate-y-1/2 left-0 px-2 pointer-events-none z-20">
          <button onClick={prevLetter} className="pointer-events-auto p-4 bg-white/40 backdrop-blur-sm rounded-full hover:bg-white text-slate-700 shadow-lg active:scale-90 transition-all">
            <ChevronLeft size={32} strokeWidth={3} />
          </button>
          <button onClick={nextLetter} className="pointer-events-auto p-4 bg-white/40 backdrop-blur-sm rounded-full hover:bg-white text-slate-700 shadow-lg active:scale-90 transition-all">
            <ChevronRight size={32} strokeWidth={3} />
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
            <h1 className={`text-[10rem] font-black ${currentLetter.color} leading-none filter drop-shadow-2xl`}>
            {currentLetter.char}
          </h1>
          
          <div 
            className="text-[8rem] my-2 cursor-pointer transform hover:scale-110 active:scale-95 transition-transform duration-200 filter drop-shadow-2xl"
            onClick={() => speakWord(currentLetter.word)}
          >
            {currentLetter.emoji}
          </div>

          <div 
            className="flex items-center gap-3 bg-white/50 px-6 py-2 rounded-full cursor-pointer hover:bg-white/80 transition-colors mt-4"
            onClick={() => speakWord(currentLetter.word)}
          >
            <h2 className="text-4xl font-bold text-slate-700">{currentLetter.word}</h2>
            <Volume2 className="text-slate-600" size={28} />
          </div>
        </div>

        {/* Background gradient blob for the card */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-[28px] pointer-events-none"></div>
      </div>

      {/* Floating Action Buttons */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-sm pb-8">
        <button
          onClick={() => setRoute(AppRoute.TRACE)}
          className="clay-card !bg-orange-400 !border-orange-300 flex flex-col items-center justify-center py-5 rounded-3xl active:scale-95 transition-transform"
        >
          <Pencil size={36} className="text-white mb-1" />
          <span className="font-extrabold text-white text-xl">Desenhar</span>
        </button>
        <button
          onClick={() => setRoute(AppRoute.STORY)}
          className="clay-card !bg-purple-500 !border-purple-400 flex flex-col items-center justify-center py-5 rounded-3xl active:scale-95 transition-transform"
        >
          <Sparkles size={36} className="text-white mb-1" />
          <span className="font-extrabold text-white text-xl">História</span>
        </button>
      </div>
    </div>
  );

  const renderSyllablesMenu = () => (
    <div className="flex flex-col h-full pt-28 px-4 pb-4 overflow-y-auto no-scrollbar">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-white">Escolha uma letra</h2>
      </div>
      <div className="grid grid-cols-3 gap-4 pb-20 max-w-2xl mx-auto w-full">
        {SYLLABLES_DATA.map((syl) => (
          <button
            key={syl.consonant}
            onClick={() => {
              setCurrentSyllableData(syl);
              setRoute(AppRoute.SYLLABLES_VIEW);
            }}
            className="clay-card h-24 flex flex-col items-center justify-center bg-white hover:bg-purple-50 active:scale-95 transition-all"
          >
            <span className="text-4xl font-black text-purple-600">{syl.consonant}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // Navigation Handler
  const handleBack = () => {
    switch (route) {
      case AppRoute.LEARN:
        if (categoryType === 'VOWELS') setRoute(AppRoute.VOWELS);
        else setRoute(AppRoute.ALPHABET);
        break;
      case AppRoute.TRACE:
      case AppRoute.STORY:
        setRoute(AppRoute.LEARN);
        break;
      case AppRoute.SYLLABLES_VIEW:
        setRoute(AppRoute.SYLLABLES_MENU);
        break;
      case AppRoute.MENU:
        // Already home
        break;
      default:
        setRoute(AppRoute.MENU);
        break;
    }
  };

  const getTitle = () => {
    if (route === AppRoute.VOWELS) return "Vogais";
    if (route === AppRoute.SYLLABLES_MENU) return "Sílabas";
    if (route === AppRoute.WORDS_GAME) return "Palavras";
    return undefined;
  };

  return (
    <div className="h-full w-full relative">
      <Navigation 
        onHome={() => setRoute(AppRoute.MENU)} 
        onBack={route !== AppRoute.MENU ? handleBack : undefined}
        title={getTitle()}
      />
      
      {route === AppRoute.MENU && renderMainMenu()}
      
      {route === AppRoute.ALPHABET && renderGrid(ALPHABET_DATA)}
      {route === AppRoute.VOWELS && renderGrid(activeDataList)}
      {route === AppRoute.LEARN && renderLearnMode()}
      
      {route === AppRoute.TRACE && (
        <div className="flex flex-col items-center h-full pt-32 px-4">
            <h2 className="text-3xl font-black text-white mb-8 drop-shadow-md text-center">
              Vamos escrever <br/>
              <span className="text-5xl text-yellow-300 inline-block mt-2 filter drop-shadow-lg">{currentLetter.char}</span> ?
            </h2>
            <TracingCanvas letter={currentLetter.char} />
        </div>
      )}
      
      {route === AppRoute.STORY && (
         <div className="flex flex-col items-center h-full pt-28 px-4">
             <StoryMode data={currentLetter} />
         </div>
      )}

      {route === AppRoute.SYLLABLES_MENU && renderSyllablesMenu()}
      {route === AppRoute.SYLLABLES_VIEW && <SyllableMode data={currentSyllableData} />}

      {route === AppRoute.WORDS_GAME && <WordGame />}
    </div>
  );
};

export default App;