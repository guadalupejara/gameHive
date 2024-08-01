// QuizContext.tsx
'use client';

import React, { createContext, useState, useContext } from 'react';

interface Card {
  id: number;
  quizName: string;
  question: string;
  answers: string[];
  correctAnswer: number | null;
}

interface QuizContextType {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
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

  return (
    <QuizContext.Provider value={{ cards, setCards }}>
      {children}
    </QuizContext.Provider>
  );
};
