import { LetterData, SyllableData, WordGameLevel } from './types';

export const ALPHABET_DATA: LetterData[] = [
  { char: 'A', word: 'Abelha', emoji: '🐝', color: 'text-yellow-600', bg: 'bg-yellow-100' },
  { char: 'B', word: 'Bola', emoji: '⚽', color: 'text-blue-600', bg: 'bg-blue-100' },
  { char: 'C', word: 'Casa', emoji: '🏠', color: 'text-orange-600', bg: 'bg-orange-100' },
  { char: 'D', word: 'Dado', emoji: '🎲', color: 'text-purple-600', bg: 'bg-purple-100' },
  { char: 'E', word: 'Elefante', emoji: '🐘', color: 'text-gray-600', bg: 'bg-gray-200' },
  { char: 'F', word: 'Flor', emoji: '🌸', color: 'text-pink-600', bg: 'bg-pink-100' },
  { char: 'G', word: 'Gato', emoji: '🐱', color: 'text-orange-500', bg: 'bg-orange-50' },
  { char: 'H', word: 'Hipopótamo', emoji: '🦛', color: 'text-gray-500', bg: 'bg-gray-100' },
  { char: 'I', word: 'Ilha', emoji: '🏝️', color: 'text-green-600', bg: 'bg-green-100' },
  { char: 'J', word: 'Jacaré', emoji: '🐊', color: 'text-green-700', bg: 'bg-green-200' },
  { char: 'K', word: 'Kiwi', emoji: '🥝', color: 'text-brown-600', bg: 'bg-green-50' },
  { char: 'L', word: 'Leão', emoji: '🦁', color: 'text-yellow-700', bg: 'bg-yellow-200' },
  { char: 'M', word: 'Macaco', emoji: '🐵', color: 'text-brown-700', bg: 'bg-orange-100' },
  { char: 'N', word: 'Navio', emoji: '🚢', color: 'text-blue-700', bg: 'bg-blue-200' },
  { char: 'O', word: 'Ovo', emoji: '🥚', color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { char: 'P', word: 'Pato', emoji: '🦆', color: 'text-green-800', bg: 'bg-green-100' },
  { char: 'Q', word: 'Queijo', emoji: '🧀', color: 'text-yellow-400', bg: 'bg-yellow-100' },
  { char: 'R', word: 'Robô', emoji: '🤖', color: 'text-gray-700', bg: 'bg-gray-300' },
  { char: 'S', word: 'Sol', emoji: '☀️', color: 'text-orange-400', bg: 'bg-orange-50' },
  { char: 'T', word: 'Trem', emoji: '🚂', color: 'text-red-600', bg: 'bg-red-100' },
  { char: 'U', word: 'Uva', emoji: '🍇', color: 'text-purple-700', bg: 'bg-purple-200' },
  { char: 'V', word: 'Vaca', emoji: '🐮', color: 'text-black', bg: 'bg-white' },
  { char: 'W', word: 'Wafer', emoji: '🍪', color: 'text-brown-500', bg: 'bg-orange-50' },
  { char: 'X', word: 'Xícara', emoji: '☕', color: 'text-blue-800', bg: 'bg-blue-50' },
  { char: 'Y', word: 'Yoga', emoji: '🧘', color: 'text-purple-500', bg: 'bg-purple-50' },
  { char: 'Z', word: 'Zebra', emoji: '🦓', color: 'text-black', bg: 'bg-gray-100' },
];

export const VOWELS = ['A', 'E', 'I', 'O', 'U'];

export const SYLLABLES_DATA: SyllableData[] = [
  { consonant: 'B', family: ['BA', 'BE', 'BI', 'BO', 'BU'], example: 'BOLA', emoji: '⚽' },
  { consonant: 'C', family: ['CA', 'CE', 'CI', 'CO', 'CU'], example: 'CASA', emoji: '🏠' },
  { consonant: 'D', family: ['DA', 'DE', 'DI', 'DO', 'DU'], example: 'DADO', emoji: '🎲' },
  { consonant: 'F', family: ['FA', 'FE', 'FI', 'FO', 'FU'], example: 'FACA', emoji: '🔪' },
  { consonant: 'G', family: ['GA', 'GE', 'GI', 'GO', 'GU'], example: 'GATO', emoji: '🐱' },
  { consonant: 'J', family: ['JA', 'JE', 'JI', 'JO', 'JU'], example: 'JIPE', emoji: '🚙' },
  { consonant: 'L', family: ['LA', 'LE', 'LI', 'LO', 'LU'], example: 'LUA', emoji: '🌙' },
  { consonant: 'M', family: ['MA', 'ME', 'MI', 'MO', 'MU'], example: 'MALA', emoji: '💼' },
  { consonant: 'P', family: ['PA', 'PE', 'PI', 'PO', 'PU'], example: 'PATO', emoji: '🦆' },
  { consonant: 'T', family: ['TA', 'TE', 'TI', 'TO', 'TU'], example: 'TATU', emoji: '🦔' },
  { consonant: 'V', family: ['VA', 'VE', 'VI', 'VO', 'VU'], example: 'VELA', emoji: '🕯️' },
];

export const WORD_GAME_LEVELS: WordGameLevel[] = [
  { id: 1, word: 'BOLA', image: '⚽', shuffled: ['L', 'A', 'B', 'O'] },
  { id: 2, word: 'UVA', image: '🍇', shuffled: ['A', 'V', 'U'] },
  { id: 3, word: 'CASA', image: '🏠', shuffled: ['S', 'A', 'C', 'A'] },
  { id: 4, word: 'DADO', image: '🎲', shuffled: ['D', 'O', 'A', 'D'] },
  { id: 5, word: 'SOL', image: '☀️', shuffled: ['L', 'O', 'S'] },
  { id: 6, word: 'OVO', image: '🥚', shuffled: ['O', 'V', 'O'] },
  { id: 7, word: 'GATO', image: '🐱', shuffled: ['T', 'O', 'G', 'A'] },
  { id: 8, word: 'PATO', image: '🦆', shuffled: ['T', 'O', 'P', 'A'] },
];