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
}

const TestTakerContext = createContext<TestTakerContextProps | undefined>(undefined);

export const TestTakerProvider = ({ children }: { children: ReactNode }) => {
  const [testTakers, setTestTakers] = useState<TestTaker[]>([]);

  const addTestTaker = (testTaker: TestTaker) => {
    setTestTakers((prevTestTakers) => [...prevTestTakers, testTaker]);
  };

  return (
    <TestTakerContext.Provider value={{ testTakers, addTestTaker }}>
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

