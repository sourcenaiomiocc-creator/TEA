export interface LetterData {
  char: string;
  word: string;
  emoji: string;
  color: string;
  bg: string;
}

export interface SyllableData {
  consonant: string;
  family: string[]; // ['BA', 'BE', 'BI', 'BO', 'BU']
  example: string;
  emoji: string;
}

export interface WordGameLevel {
  id: number;
  word: string; // "BOLA"
  image: string; // Emoji
  shuffled: string[]; // ['L', 'A', 'B', 'O']
}

export enum AppRoute {
  MENU = 'MENU',         // New Main Menu
  ALPHABET = 'ALPHABET', // A-Z Grid
  VOWELS = 'VOWELS',     // A,E,I,O,U Grid
  SYLLABLES_MENU = 'SYLLABLES_MENU', // Pick a consonant
  SYLLABLES_VIEW = 'SYLLABLES_VIEW', // View family
  WORDS_GAME = 'WORDS_GAME', // Spelling game
  
  // Existing specific flows
  LEARN = 'LEARN',
  TRACE = 'TRACE',
  STORY = 'STORY',
}

export interface StoryState {
  isLoading: boolean;
  isPlaying: boolean;
  text: string | null;
  error: string | null;
}