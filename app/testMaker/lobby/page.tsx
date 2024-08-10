
'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { testTakers, TestTaker } from '@/app/data/testTakers';
import Button from '@/app/components/commonComponents/button';
import LobbyBox from '@/app/components/commonComponents/lobbyBox';
import { useQuiz } from '@/app/context/QuizContext';
import { updateQuiz } from '@/lib';

const Lobby: React.FC = () => {
  const router = useRouter(); 
  const [gameCode, setGameCode] = useState('');
  const [takers, setTakers] = useState<TestTaker[]>([]);
  const { quiz, setQuiz } = useQuiz();
  const [isQuizUpdated, setIsQuizUpdated] = useState(false);

  const generateUniqueCode = (existingCodes: string[]): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let newCode;
  
    do {
      newCode = '';
      for (let i = 0; i < 4; i++) {
        newCode += chars[Math.floor(Math.random() * chars.length)];
      }
    } while (existingCodes.includes(newCode));
  
    return newCode;
  };
  
  useEffect(() => {
    const existingCodes: string[] = []; // Fetch from database if needed
    const code = generateUniqueCode(existingCodes);

    if (!isQuizUpdated) {
      setQuiz((prevQuiz) => {
        const updatedQuiz = {
          ...prevQuiz,
          id: code,
          db_doc_id: prevQuiz?.db_doc_id || '', // Ensure db_doc_id is initialized
          quizName: prevQuiz?.quizName || '',
          card: prevQuiz?.card || []
        };

        // Update the quiz in Firestore after the state has been updated
        updateQuiz(updatedQuiz.db_doc_id, updatedQuiz);
        
        return updatedQuiz;
      });

      setGameCode(code);
      setTakers(testTakers);
      setIsQuizUpdated(true); // Ensure the quiz is updated only once
    }
  }, [isQuizUpdated, setQuiz]);

  const startGame = () => {
    console.log('Starting game with code:', quiz?.id);
    router.push('/testMaker/game');
  };

  const cancelGame = () => {
    router.push('/testMaker/dashboard');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Lobby</h1>
      <p className="text-lg mb-4">Provide the following Game Code for players to join the game: <strong className='text-2xl'>{gameCode}</strong></p>
      <LobbyBox takers={takers} />
      <div className="mt-4">
        <Button onClick={startGame} label="Start Game" className="mr-2" />
        <Button onClick={cancelGame} label="Cancel" className="bg-gray-300" />
      </div>
    </main>
  );
};

export default Lobby;
