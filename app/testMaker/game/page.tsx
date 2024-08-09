/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Button from '@/app/components/commonComponents/button';
import BarChart from '@/app/components/barChart';
import { useQuiz } from '@/app/context/QuizContext';
import { testTakers, TestTaker } from '@/app/data/testTakers';
import { useRouter } from 'next/navigation';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Game: React.FC = () => {
  const { quiz } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [testTakersData, setTestTakersData] = useState<TestTaker[]>(testTakers);
  const [currentScores, setCurrentScores] = useState<Record<number, number>>({});
  const router = useRouter();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          handleTimerEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentQuestionIndex]);

  const handleTimerEnd = () => {
    // Logic to handle timer end, e.g., calculate scores
    // Update currentScores
  };

  const handleNextQuestion = () => {
    if (quiz && currentQuestionIndex < (quiz.card.length - 1)) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimer(30);
    }
  };

  const handleResults = () => {
    router.push('/scores');
  };

  const currentCard = quiz?.card[currentQuestionIndex];

  const labels = useMemo(() => testTakersData.map(taker => taker.name), [testTakersData]);
  const data = useMemo(() => testTakersData.map(taker => taker.score), [testTakersData]);

  return (
    <main className="p-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">GameHive: {quiz?.quizName} is playing!</h1>
        <div className="mb-4 flex items-center space-x-4">
          <div className="text-lg font-semibold">Timer: {timer}s</div>
          <div className="text-lg font-semibold">
            Question {currentQuestionIndex + 1} / {quiz?.card.length}
          </div>
        </div>
      </div>
      <div className="flex mb-4 gap-4">
        <div className="flex-1" style={{ height: '300px' }}>
          <BarChart labels={labels} data={data} />
        </div>
        <div className="flex-1 border p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">{currentCard?.question}</h2>
          <ul>
            {currentCard?.answers.map((answer, index) => (
              <li
                key={index}
                className={`p-2 border ${index === currentCard.correctAnswer ? 'border-green-500' : 'border-gray-300'}`}
              >
                {answer}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Button 
        onClick={handleNextQuestion} 
        label="Next Question" 
        className="mt-4 mx-1" 
        disabled={currentQuestionIndex >= (quiz?.card?.length || 0) - 1} 
      />
      <Button 
        onClick={handleResults} 
        label="See Results" 
        className="mt-4 mx-1" 
      />
    </main>
  );
};

export default Game;
