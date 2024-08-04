
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTestTaker } from '@/app/context/testTakerContext';
import { useGameStart } from '@/app/context/gameStartContext';
import LobbyBox from '@/app/components/commonComponents/lobbyBox';

const TestTakerLobby: React.FC = () => {
  const router = useRouter();
  const { testTakers } = useTestTaker();
  const { gameStarted } = useGameStart();

  useEffect(() => {
    if (gameStarted) {
      router.push('/testMaker/game');
    }
  }, [gameStarted, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Lobby</h1>
      <p className="text-lg mb-4">Waiting for the Test Maker to start the game...</p>
      <LobbyBox takers={testTakers} />
    </main>
  );
};

export default TestTakerLobby;
