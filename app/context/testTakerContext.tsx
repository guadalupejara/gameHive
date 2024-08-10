
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TestTaker {
  id: number;
  role: 'testtaker';
  name: string;
  score: number;
}

interface TestTakerContextProps {
  testTakers: TestTaker[];
  addTestTaker: (testTaker: TestTaker) => void;
  updateTestTakerScore: (id: number, newScore: number) => void;
  currentUser: TestTaker | null;
  setCurrentUser: (testTaker: TestTaker) => void;
  setTestTakers:(testTaker: TestTaker[])=> void;
}

const TestTakerContext = createContext<TestTakerContextProps | undefined>(undefined);

export const TestTakerProvider = ({ children }: { children: ReactNode }) => {
  const [testTakers, setTestTakers] = useState<TestTaker[]>([]);
  const [currentUser, setCurrentUser] = useState<TestTaker | null>(null);

  const addTestTaker = (testTaker: TestTaker) => {
    setTestTakers((prevTestTakers) => [...prevTestTakers, testTaker]);
  };

  const updateTestTakerScore = (id: number, newScore: number) => {
    setTestTakers((prevTestTakers) => 
      prevTestTakers.map((taker) =>
        taker.id === id ? { ...taker, score: newScore } : taker
      )
    );
    if (currentUser?.id === id) {
      setCurrentUser((prevUser) =>
        prevUser ? { ...prevUser, score: newScore } : prevUser
      );
    }
  };

  return (
    <TestTakerContext.Provider value={{ testTakers, addTestTaker, updateTestTakerScore, currentUser, setCurrentUser, setTestTakers }}>
      {children}
    </TestTakerContext.Provider>
  );
};

export const useTestTaker = () => {
  const context = useContext(TestTakerContext);
  if (!context) {
    throw new Error('useTestTaker must be used within a TestTakerProvider');
  }
  return context;
};
