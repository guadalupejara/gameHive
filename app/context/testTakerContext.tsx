'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Tester {
  id: number;
  role: 'testtaker';
  name: string;
  score: number;
}

interface TestTakerContextProps {
  testTakers: Tester[]; // Change to an array
  addTestTaker: (testTaker: Tester) => void;
  updateTestTakerScore: (id: number, newScore: number) => void;
}

const TestTakerContext = createContext<TestTakerContextProps | undefined>(undefined);

export const TestTakerProvider = ({ children }: { children: ReactNode }) => {
  const [testTakers, setTestTakers] = useState<Tester[]>([]); // Change to array

  const addTestTaker = (newTestTaker: Tester) => {
    setTestTakers((prev) => [...prev, newTestTaker]); // Append new test taker
  };

  const updateTestTakerScore = (id: number, newScore: number) => {
    setTestTakers((prev) =>
      prev.map((taker) => (taker.id === id ? { ...taker, score: newScore } : taker))
    );
  };

  return (
    <TestTakerContext.Provider value={{ testTakers, addTestTaker, updateTestTakerScore }}>
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
