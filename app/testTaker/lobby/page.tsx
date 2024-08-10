
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTestTaker } from '@/app/context/testTakerContext';
import { useGameStart } from '@/app/context/gameStartContext';
import { useQuiz } from '@/app/context/QuizContext';
import LobbyBox from '@/app/components/commonComponents/lobbyBox';
import {getTesterArrByQuiz, listenToTestTakers} from '@/app/../lib'
import { TestTaker } from '@/app/types/testTaker_types';

const TestTakerLobby: React.FC = () => {
  const router = useRouter();
  const { testTakers, setTestTakers } = useTestTaker();
  const { gameStarted } = useGameStart();
  const {quiz} = useQuiz()

  useEffect(() => {
    const handleRouting = () => {
      if (gameStarted) {
        router.push('/testMaker/game');
      }
    };

    const fetchTesters = async () => {
      console.log("inside fetch tester", quiz?.id)
      if (quiz?.id) {
        try {
          const testerArr = await getTesterArrByQuiz(quiz.id);
          if (testerArr && testerArr.testers) {
            setTestTakers(testerArr.testers);
            console.log("Your testers:", testerArr)
          }
        } catch (error) {
          console.error('Error fetching testers:', error);
        }
      }else{console.error('quiz id was undefined')}
    };

    handleRouting();
    fetchTesters();

    const unsubscribe = listenToTestTakers(quiz?.id, (updatedTesters:TestTaker[]) => {
      setTestTakers(updatedTesters);
    });
    return () => {
      unsubscribe();
    };
  }, [gameStarted, router, quiz?.id, setTestTakers]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Lobby</h1>
      <p className="text-lg mb-4">Waiting for the Test Maker to start the game...</p>
      <LobbyBox takers={testTakers} />
    </main>
  );
};

export default TestTakerLobby;
