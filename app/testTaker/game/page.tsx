
// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Button from '@/app/components/commonComponents/button';
// import { Card , mockGameData } from '@/app/data/sampleGame'; // Import the Card interface
// import { useTestTaker } from '@/app/context/testTakerContext';

// const Game: React.FC = () => {
//   const { currentUser, updateTestTakerScore } = useTestTaker();
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [timer, setTimer] = useState(30);
//   const [userAnswer, setUserAnswer] = useState<number | null>(null);
//   const [answerFeedback, setAnswerFeedback] = useState<string | null>(null);
//   const [score, setScore] = useState(currentUser?.score || 0);
//   const router = useRouter();

//   // Use sample data
//   const cards: Card[] = mockGameData;
  
//   useEffect(() => {
//     const countdown = setInterval(() => {
//       setTimer((prev) => {
//         if (prev === 1) {
//           clearInterval(countdown);
//           handleTimerEnd();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(countdown);
//   }, [currentQuestionIndex]);

//   const handleTimerEnd = () => {
//     // Handle timer end logic if necessary
//   };

//   const handleAnswerClick = (index: number) => {
//     if (userAnswer === null) {
//       setUserAnswer(index);
//       if (index === cards[currentQuestionIndex].correctAnswer) {
//         setAnswerFeedback('Correct!');
//         const newScore = (score || 0) + 100;
//         setScore(newScore);
//         updateTestTakerScore(currentUser?.id || -1, newScore);
//       } else {
//         setAnswerFeedback('Incorrect!');
//       }
//     }
//   };

//   const handleNextQuestion = () => {
//     setCurrentQuestionIndex((prev) => prev + 1);
//     setTimer(30);
//     setUserAnswer(null);
//     setAnswerFeedback(null);
//   };

//   const handleResults = () => {
//     router.push('/testTaker/results');
//   };

//   const currentQuestion = cards[currentQuestionIndex];

//   return (
//     <main className="p-4">
//       <div className="flex flex-col items-center justify-center">
//         <h1 className="text-4xl font-bold mb-8">GameHive: Playing!</h1>
//         <div className="mb-4 flex items-center space-x-4">
//           <div className="text-lg font-semibold">Timer: {timer}s</div>
//           <div className="text-lg font-semibold">
//             Question {currentQuestionIndex + 1} / {cards.length}
//           </div>
//           <div className="text-lg font-semibold">
//             Score: {score}
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col mb-4">
//         <h2 className="text-xl font-semibold mb-2">{currentQuestion?.question}</h2>
//         <ul>
//           {currentQuestion?.answers.map((answer, index) => (
//             <li
//               key={index}
//               onClick={() => handleAnswerClick(index)}
//               className={`p-2 border cursor-pointer ${
//                 userAnswer === index
//                   ? index === currentQuestion.correctAnswer
//                     ? 'border-green-500 bg-green-100'
//                     : 'border-red-500 bg-red-100'
//                   : 'border-gray-300'
//               }`}
//             >
//               {answer}
//             </li>
//           ))}
//         </ul>
//         {answerFeedback && (
//           <p className={`mt-2 text-lg ${answerFeedback === 'Correct!' ? 'text-green-500' : 'text-red-500'}`}>
//             {answerFeedback}
//           </p>
//         )}
//       </div>
//       <div className="flex gap-4">
//         <Button onClick={handleNextQuestion} label="Next Question" className="mt-4 mx-1" disabled={currentQuestionIndex >= cards.length - 1} />
//         <Button onClick={handleResults} label="See Results" className="mt-4 mx-1" />
//       </div>
//     </main>
//   );
// };

// export default Game;
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, mockGameData } from '@/app/data/sampleGame';
import { useTestTaker } from '@/app/context/testTakerContext';

const Game: React.FC = () => {
  const { currentUser, updateTestTakerScore } = useTestTaker();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [answerFeedback, setAnswerFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(currentUser?.score || 0);
  const router = useRouter();

  const cards: Card[] = mockGameData;

  useEffect(() => {
    let countdown: NodeJS.Timeout;

    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      handleTimerEnd();
    }

    return () => clearInterval(countdown);
  }, [timer]);

  useEffect(() => {
    setTimer(30);
    setUserAnswer(null);
    setAnswerFeedback(null);
  }, [currentQuestionIndex]);

  const handleTimerEnd = () => {
    const correct = cards[currentQuestionIndex]?.correctAnswer;
    if (userAnswer !== null) {
      if (userAnswer === correct) {
        setAnswerFeedback('Correct!');
        const newScore = score + 100;
        setScore(newScore);
        updateTestTakerScore(currentUser?.id || -1, newScore);
      } else {
        setAnswerFeedback('Incorrect!');
      }
    } else {
      setAnswerFeedback('Time is up!');
    }

    setTimeout(() => {
      if (currentQuestionIndex < cards.length - 1) {
        setCurrentQuestionIndex((prev) => {
          console.log('Incrementing question index from', prev, 'to', prev + 1);
          return prev + 1;
        });
      } else {
        handleResults();
      }
    }, 5000);
  };

  const handleAnswerClick = (index: number) => {
    setUserAnswer(index);
  };

  const handleResults = () => {
    router.push('/scores');
  };

  const currentQuestion = cards[currentQuestionIndex];

  return (
    <main className="p-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">GameHive: Playing!</h1>
        <div className="mb-4 flex items-center space-x-4">
          <div className="text-lg font-semibold">Timer: {timer}s</div>
          <div className="text-lg font-semibold">
            Question {currentQuestionIndex + 1} / {cards.length}
          </div>
          <div className="text-lg font-semibold">
            Score: {score}
          </div>
        </div>
      </div>
      <div className="flex flex-col mb-4">
        <h2 className="text-xl font-semibold mb-2">{currentQuestion?.question}</h2>
        <ul>
          {currentQuestion?.answers.map((answer, index) => (
            <li
              key={index}
              onClick={() => handleAnswerClick(index)}
              className={`p-2 border cursor-pointer ${
                userAnswer === index
                  ? timer === 0
                    ? index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-100'
                      : 'border-red-500 bg-red-100'
                    : 'bg-gray-100'
                  : 'border-gray-300'
              }`}
            >
              {answer}
            </li>
          ))}
        </ul>
        {answerFeedback && timer === 0 && (
          <p className={`mt-2 text-lg ${answerFeedback === 'Correct!' ? 'text-green-500' : 'text-red-500'}`}>
            {answerFeedback}
          </p>
        )}
      </div>
    </main>
  );
};

export default Game;
