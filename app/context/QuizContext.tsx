
'use client';

import React, { createContext, useState, useContext } from 'react';

interface Card {
  uId:string;
  question: string;
  answers: string[];
  correctAnswer: number | null;
}

interface Quiz {
  id: string;
  db_doc_id: string;
  quizName: string;
  card: Card[];
}

interface QuizContextType {
  quiz: Quiz;
  setQuiz: React.Dispatch<React.SetStateAction<Quiz>>;
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
  const [quiz, setQuiz] = useState<Quiz>({
    id: '',
    db_doc_id: '',
    quizName: '',
    card: [{ uId: '0', question: '', answers: ['', '', '', ''], correctAnswer: null }],
  }); 
  const [gameCode, setGameCode] = useState<string>('');
  const [currentGameCodes, setCurrentGameCodes] = useState<string[]>([]);

  const addGameCode = (code: string) => {
    setCurrentGameCodes((prevCodes) => [...prevCodes, code]);
  };

  const validateGameCode = (code: string): boolean => {
    return currentGameCodes.includes(code);
  };

  return (
    <QuizContext.Provider value={{ quiz, setQuiz, gameCode, setGameCode, currentGameCodes, addGameCode, validateGameCode }}>
      {children}
    </QuizContext.Provider>
  );
};
