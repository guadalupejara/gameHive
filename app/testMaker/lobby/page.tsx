'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/commonComponents/button';
import LobbyBox from '@/app/components/commonComponents/lobbyBox';
import { useQuiz } from '@/app/context/QuizContext';
import { updateQuiz, listenToTestTakers, getQuizCodes, addQuizCode, addToggleGame, updateToggleGame } from '@/lib';
import { useTestTaker } from '@/app/context/testTakerContext';
import { tester, TestTaker } from '@/app/types/testTaker_types';

const Lobby: React.FC = () => {
  const router = useRouter();
  const [gameCode, setGameCode] = useState('');
  const { quiz, setQuiz } = useQuiz();
  const [isQuizUpdated, setIsQuizUpdated] = useState(false);
  const [existingCodes, setExistingCodes] = useState<string[]>([]);
  const [toggleCreated, setToggleCreated] = useState(false);
  const { testTakers, addTestTaker } = useTestTaker();

  useEffect(() => {
    const fetchExistingCodes = async () => {
      try {
        const codes = await getQuizCodes();
        setExistingCodes(codes);
      } catch (error) {
        console.error('Error fetching quiz codes:', error);
      }
    };
    fetchExistingCodes();
  }, []);

  useEffect(() => {
    if (!isQuizUpdated) {
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

      const code = generateUniqueCode(existingCodes);
      setQuiz((prevQuiz) => {
        const updatedQuiz = {
          ...prevQuiz,
          id: code,
          db_doc_id: prevQuiz?.db_doc_id || '',
          quizName: prevQuiz?.quizName || '',
          card: prevQuiz?.card || [],
        };
        updateQuiz(updatedQuiz.db_doc_id, updatedQuiz);
        setGameCode(code);
        setIsQuizUpdated(true);
        return updatedQuiz;
      });
    }
  }, [isQuizUpdated, existingCodes, setQuiz]);

  useEffect(() => {
    if (isQuizUpdated && quiz?.id) {
      addQuizCode(quiz.id).catch((error) => {
        console.error('Error adding quiz code:', error);
      });

      if (!toggleCreated) {
        const toggleData = { gameId: quiz.id, is_Quiz_Done: false, is_Ready_For_Next_Page: false, is_game_active: false };
        addToggleGame(toggleData)
          .then(() => {
            setToggleCreated(true);
          })
          .catch((error) => {
            console.error('Error adding toggle game:', error);
          });
      }
    }
  }, [isQuizUpdated, quiz?.id, toggleCreated]);

  // useEffect(() => {
  //   if (quiz?.id) {
  //     const unsubscribe = listenToTestTakers(quiz.id, (updatedTestTakers: tester[]) => {
  //       updatedTestTakers.forEach(tester => {
  //         // Check if the tester already exists
  //         if (!testTakers.some(existingTaker => existingTaker.id === tester.id)) {
  //           addTestTaker(tester); // Only add if it doesn't exist
  //         }
  //       });
  //     });

  //     return () => {
  //       unsubscribe();
  //     };
  //   }
  // }, [quiz?.id, addTestTaker, testTakers]); // Add testTakers as a dependency
  useEffect(() => {
    if (quiz?.id) {
      const unsubscribe = listenToTestTakers(quiz.id, (updatedTestTakers: tester[]) => {
        updatedTestTakers.forEach(tester => {
          // Check if the tester already exists
          if (!testTakers.some(existingTaker => Number(existingTaker.id) === tester.id)) {
            // Wrap the tester object in an array and create a TestTaker object
            const newTestTaker: TestTaker = {
              id: String(tester.id),  // Convert tester.id to a string as required by the TestTaker interface
              tester: [tester], // Wrap tester in an array
            };
            addTestTaker(newTestTaker); // Only add if it doesn't exist
          }
        });
      });
  
      return () => {
        unsubscribe();
      };
    }
  }, [quiz?.id, addTestTaker, testTakers]);
  
  

  const startGame = () => {
    const updatedToggleData = { gameId: quiz?.id, is_Quiz_Done: false, is_Ready_For_Next_Page: false, is_game_active: true };
    updateToggleGame(quiz?.id, updatedToggleData);
    router.push('/testMaker/game');
  };

  const cancelGame = () => {
    router.push('/testMaker/dashboard');
  };
  const flatTesters = testTakers.flatMap(taker => taker.tester);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Lobby</h1>
      <p className="text-lg mb-4">Provide the following Game Code for players to join the game: <strong className='text-2xl'>{gameCode}</strong></p>
      <LobbyBox takers={flatTesters} />
      <div className="mt-4">
        <Button onClick={startGame} label="Start Game" className="mr-2" />
        <Button onClick={cancelGame} label="Cancel" className="bg-gray-300" />
      </div>
    </main>
  );
};

export default Lobby;
