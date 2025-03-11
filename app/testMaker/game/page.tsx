/* eslint-disable @typescript-eslint/no-unused-vars */
// 'use client';

// import React, { useEffect, useMemo, useState } from 'react';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import Button from '@/app/components/commonComponents/button';
// import BarChart from '@/app/components/barChart';
// import { useQuiz } from '@/app/context/QuizContext';
// //remove the hardocded data for the use context testtaker
// // import { testTakers, TestTaker } from '@/app/data/testTakers';
// import { useRouter } from 'next/navigation';
// import { getTesterArrByQuiz } from '@/lib';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const Game: React.FC = () => {
//   const { quiz } = useQuiz();
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [timer, setTimer] = useState(30);
//   //replace with the usecontext
//   const [testTakersData, setTestTakersData] = useState();
//   const [currentScores, setCurrentScores] = useState<Record<number, number>>({});
//   const router = useRouter();

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

//   //useeffect to set the testers to the chart 
// useEffect(() => {
//   const testerArr = getTesterArrByQuiz()
//   setTestTakersData(testerArr)
// },[])
//   const handleTimerEnd = () => {
//   //this should update the testers score, listner should pick up changes submited from the testers side and display once the timer finishes. 
//   };

//   const handleNextQuestion = () => {
//     if (quiz && currentQuestionIndex < (quiz.card.length - 1)) {
//       setCurrentQuestionIndex((prev) => prev + 1);
//       setTimer(30);
//     }
//   };

//   const handleResults = () => {
//     router.push('/scores');
//   };

//   const currentCard = quiz?.card[currentQuestionIndex];

//   const labels = useMemo(() => testTakersData.tester.map(taker => taker.name), [testTakersData]);
//   const data = useMemo(() => testTakersData.tester.map(taker => taker.score), [testTakersData]);

//   return (
//     <main className="p-4">
//       <div className="flex flex-col items-center justify-center">
//         <h1 className="text-4xl font-bold mb-8">GameHive: {quiz?.quizName} is playing!</h1>
//         <div className="mb-4 flex items-center space-x-4">
//           <div className="text-lg font-semibold">Timer: {timer}s</div>
//           <div className="text-lg font-semibold">
//             Question {currentQuestionIndex + 1} / {quiz?.card.length}
//           </div>
//         </div>
//       </div>
//       <div className="flex mb-4 gap-4">
//         <div className="flex-1" style={{ height: '300px' }}>
//           <BarChart labels={labels} data={data} />
//         </div>
//         <div className="flex-1 border p-4 rounded-md shadow-md">
//           <h2 className="text-xl font-semibold mb-2">{currentCard?.question}</h2>
//           <ul>
//             {currentCard?.answers.map((answer, index) => (
//               <li
//                 key={index}
//                 className={`p-2 border ${index === currentCard.correctAnswer ? 'border-green-500' : 'border-gray-300'}`}
//               >
//                 {answer}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <Button 
//         onClick={handleNextQuestion} 
//         label="Next Question" 
//         className="mt-4 mx-1" 
//         disabled={currentQuestionIndex >= (quiz?.card?.length || 0) - 1} 
//       />
//       <Button 
//         onClick={handleResults} 
//         label="See Results" 
//         className="mt-4 mx-1" 
//       />
//     </main>
//   );
// };

// export default Game;


'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Button from '@/app/components/commonComponents/button';
import BarChart from '@/app/components/barChart';
import { useQuiz } from '@/app/context/QuizContext';
import { useTestTaker } from '@/app/context/testTakerContext'; // Import useTestTaker hook
import { useRouter } from 'next/navigation';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Game: React.FC = () => {
  const { quiz } = useQuiz();
  const { testTakers, updateTestTakerScore } = useTestTaker(); // Get testTaker from context
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(30);
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
    if (testTakers) {
      testTakers.forEach(taker => {
        // Assuming there's only one tester in taker.tester, if there's more than one, you should adjust the logic accordingly.
        const tester = taker.tester[0]; // Access the first tester in the array (adjust if needed)
        if (tester) {
          // Now you can safely access tester.score
          updateTestTakerScore(Number(tester.id), tester.score + 10); // Example logic
        }
      });
    }
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

  const labels = useMemo(() => {
    if (testTakers && Array.isArray(testTakers)) {
      return testTakers.map(taker => taker.tester[0]?.name || 'Unknown'); // Assuming there's at least one tester in the array
    }
    return [];
  }, [testTakers]);
  
  const data = useMemo(() => {
    if (testTakers && Array.isArray(testTakers)) {
      return testTakers.map(taker => taker.tester[0]?.score || 0); // Assuming there's at least one tester in the array
    }
    return [];
  }, [testTakers]);
  

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