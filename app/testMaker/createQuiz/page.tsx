// 'use client'
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation'; // Import the useRouter hook
// import QuizCard from '@/app/components/quizComponents/quizCard';
// import Button from '@/app/components/commonComponents/button';
// import ScrollToTopButton from '@/app/components/commonComponents/scrollToTop';

// interface Card {
//   id: number;
//   question: string;
//   answers: string[];
//   correctAnswer: number | null;
// }

// const CreateQuiz: React.FC = () => {
//   const [cards, setCards] = useState<Card[]>([{ id: 0, question: '', answers: ['', '', '', ''], correctAnswer: null }]);
//   const router = useRouter();

//   const handleAddCard = () => {
//     setCards([...cards, { id: cards.length, question: '', answers: ['', '', '', ''], correctAnswer: null }]);
//   };

//   const handleDeleteCard = (id: number) => {
//     setCards(cards.filter((card) => card.id !== id));
//   };

//   const handleUpdateCard = (index: number, question: string, answers: string[], correctAnswer: number | null) => {
//     const updatedCards = [...cards];
//     updatedCards[index] = { ...updatedCards[index], question, answers, correctAnswer };
//     setCards(updatedCards);
//   };

//   const handleSubmit = () => {
//     console.log("Submit quiz", cards);
//     router.push('/testMaker/lobby'); 
//   };

//   const handleCancel = () => {
//     router.push('/testMaker/dashboard'); 
//   };

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center p-5">
//       <h1 className="text-4xl font-bold mb-8">Create a Quiz!</h1>
//       <div className='mb-9 p-6'>
//         <p>
//           Create your quiz to challenge your test takers. Each question is worth 100 points, and at the end of the quiz, you will get the top 5 contestants. Once submitted, you will receive a generated code, which is needed for test takers to find your quiz.
//         </p>
//         <Button
//           label="Create Quiz"
//           onClick={handleSubmit}
//           className="bg-blue-500 hover:bg-blue-600 mt-3"
//         />
//         <Button
//           label="Cancel"
//           onClick={handleCancel}
//           className="bg-gray-500 hover:bg-gray-600 mt-3 ml-3"
//         />
//       </div>
//       <div>
//         {cards.map((card, index) => (
//           <QuizCard
//             key={card.id}
//             index={index}
//             onAdd={handleAddCard}
//             onDelete={() => handleDeleteCard(card.id)}
//             onUpdate={handleUpdateCard}
//           />
//         ))}
//       </div>
//       <ScrollToTopButton />
//     </main>
//   );
// };

// export default CreateQuiz;

'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import QuizCard from '@/app/components/quizComponents/quizCard';
import Button from '@/app/components/commonComponents/button';
import ScrollToTopButton from '@/app/components/commonComponents/scrollToTop';

interface Card {
  id: number;
  quizName: string; // New field for the quiz name
  question: string;
  answers: string[];
  correctAnswer: number | null;
}

const CreateQuiz: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([{ id: 0, quizName: '', question: '', answers: ['', '', '', ''], correctAnswer: null }]);
  const router = useRouter();

  const handleQuizNameChange = (name: string) => {
    setCards(cards.map((card, index) => index === 0 ? { ...card, quizName: name } : card));
  };

  const handleAddCard = () => {
    setCards([...cards, { id: cards.length, quizName: cards[0].quizName, question: '', answers: ['', '', '', ''], correctAnswer: null }]);
  };

  const handleDeleteCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleUpdateCard = (index: number, question: string, answers: string[], correctAnswer: number | null) => {
    const updatedCards = [...cards];
    updatedCards[index] = { ...updatedCards[index], question, answers, correctAnswer };
    setCards(updatedCards);
  };

  const handleSubmit = () => {
    console.log("Submit quiz", cards);
    router.push('/testMaker/lobby');
  };

  const handleCancel = () => {
    router.push('/testMaker/dashboard');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5">
      <h1 className="text-4xl font-bold mb-8">Create a Quiz!</h1>
      <div className='mb-9 p-6'>
       
        <p>
          Create your quiz to challenge your test takers. Each question is worth 100 points, and at the end of the quiz, you will get the top 5 contestants. Once submitted, you will receive a generated code, which is needed for test takers to find your quiz.
        </p>
        <Button
          label="Create Quiz"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 mt-3"
        />
        <Button
          label="Cancel"
          onClick={handleCancel}
          className="bg-gray-500 hover:bg-gray-600 mt-3 ml-3"
        />
         <label className="block text-lg font-medium mt-6 mb-2">Quiz Name:</label>
        <input
          type="text"
          value={cards[0].quizName}
          onChange={(e) => handleQuizNameChange(e.target.value)}
          className="w-1/3 p-2 border border-gray-300 rounded mb-6"
        />
      </div>
      <div>
        {cards.map((card, index) => (
          <QuizCard
            key={card.id}
            index={index}
            onAdd={handleAddCard}
            onDelete={() => handleDeleteCard(card.id)}
            onUpdate={handleUpdateCard}
          />
        ))}
      </div>
      <ScrollToTopButton />
    </main>
  );
};

export default CreateQuiz;

