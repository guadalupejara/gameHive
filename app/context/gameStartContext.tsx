'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GameStartContextProps {
  gameStarted: boolean;
  setGameStarted: (started: boolean) => void;
}

const GameStartContext = createContext<GameStartContextProps | undefined>(undefined);

export const GameStartProvider = ({ children }: { children: ReactNode }) => {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <GameStartContext.Provider value={{ gameStarted, setGameStarted }}>
      {children}
    </GameStartContext.Provider>
  );
};

export const useGameStart = () => {
  const context = useContext(GameStartContext);
  if (!context) {
    throw new Error('useGameStart must be used within a GameStartProvider');
  }
  return context;
};
