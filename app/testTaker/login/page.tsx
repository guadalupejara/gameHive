'use client';

import React, { useState } from 'react';
import Button from '@/app/components/commonComponents/button';
import { useTestTaker } from '@/app/context/testTakerContext';
import { useRouter } from 'next/navigation';
import { getQuizByIdProperty,updateTestTakerArr, addTester } from '@/app/../lib/index'; 
import { useQuiz } from '@/app/context/QuizContext';
import { Quiz } from '@/app/types/testMaker_types';

export default function Login() {
  const [gameId, setGameId] = useState('');
  const [userName, setUserName] = useState('');
  const { testTakers, addTestTaker, setCurrentUser } = useTestTaker();
  const { setQuiz } = useQuiz(); 
  const router = useRouter();

  const handleStartGame = async () => {
    if (gameId && userName) {
      try {
      
        const quizDoc = await getQuizByIdProperty(gameId);
        
        if (!quizDoc) {
         
          alert('No quiz found with the provided game ID.');
          return;
        }

        const quizData: Quiz = {
          id: quizDoc.id.id,
          db_doc_id: quizDoc.db_doc_id,
          quizName: quizDoc.quizName,
          card: quizDoc.cards,
        };
  
        setQuiz(quizData);
        const newTestTaker = {
          id: testTakers.length + 1,
          role: 'testtaker' as const,
          name: userName,
          score: 0,
        };
      await updateTestTakerArr(gameId, newTestTaker);
        addTester(newTestTaker)
        addTestTaker(newTestTaker);
        setCurrentUser(newTestTaker);
        console.log('Test Taker added:', newTestTaker);

        router.push('/testTaker/lobby');
      } catch (error) {
        console.error('Error during game start:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };
  
  return (
    <main className="flex min-h-screen text-center items-center justify-center p-24">
      <div>
        <h1 className="text-4xl font-bold">Test Taker Login</h1>
        <div className='mb-9 p-6'>
          <p>To start a game, input the code & choose a user name. Be aware that the Test Maker will only see the name you have chosen.</p>
          <label className="block text-lg font-medium mt-6 mb-2">Game Id:</label>
          <input
            type="text"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            className="w-1/3 p-2 border border-gray-300 rounded mb-6"
          />
          <label className="block text-lg font-medium mt-6 mb-2">User Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-1/3 p-2 border border-gray-300 rounded mb-6"
          />
          <div className='flex flex-container justify-center'>
            <Button
              label="Start Game"
              onClick={handleStartGame}
              className="bg-blue-400 hover:bg-blue-500 mt-3 ml-3"
              disabled={!gameId || !userName}
            />
            <Button
              label="Cancel"
              onClick={() => {
                setGameId('');
                setUserName('');
              }}
              className="bg-gray-500 hover:bg-gray-600 mt-3 ml-3"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
