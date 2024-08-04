
'use client';

import React, { createContext, useState, useContext } from 'react';

interface Card {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: number | null;
}

interface QuizContextType {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  gameCode: string;
  setGameCode: React.Dispatch<React.SetStateAction<string>>;
  currentGameCodes: string[];
  addGameCode: (code: string) => void;
  validateGameCode: (code: string) => boolean;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [gameCode, setGameCode] = useState<string>('');
  const [currentGameCodes, setCurrentGameCodes] = useState<string[]>([]);

  const addGameCode = (code: string) => {
    setCurrentGameCodes((prevCodes) => [...prevCodes, code]);
  };

  const validateGameCode = (code: string): boolean => {
    return currentGameCodes.includes(code);
  };

  return (
    <QuizContext.Provider value={{ cards, setCards, gameCode, setGameCode, currentGameCodes, addGameCode, validateGameCode }}>
      {children}
    </QuizContext.Provider>
  );
};

