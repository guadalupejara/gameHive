'use client';

// import React from 'react';
// import { useQuiz } from '@/app/context/QuizContext';
// import { useRouter } from 'next/navigation';
// import QuizCard from '@/app/components/quizComponents/quizCard';
// import Button from '@/app/components/commonComponents/button';
// import ScrollToTopButton from '@/app/components/commonComponents/scrollToTop';


// const CreateQuiz: React.FC = () => {
//   const { cards, setCards } = useQuiz();

//   console.log("Current cards:", cards);

//   const handleAddCard = () => {
//     setCards([
//       ...cards,
//       { id: cards.length, quizName: cards[0]?.quizName || '', question: '', answers: ['', '', '', ''], correctAnswer: null }
//     ]);
//   };
//   const router = useRouter();
//   const handleDeleteCard = (index: number) => {
//     setCards(cards.filter((_, i) => i !== index));
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

//   const handleQuizNameChange = (newQuizName: string) => {
//     setCards((prevCards) => {
//       if (prevCards.length === 0) return prevCards; 

//       const updatedCards = prevCards.map(card => ({
//         ...card,
//         quizName: newQuizName
//       }));

//       return updatedCards;
//     });
//   };
//   const isQuizValid = () => {
//     return cards.every(card => 
//       card.question.trim() == '' &&
//       card.answers.every(answer => answer.trim() == '') &&
//       card.correctAnswer == null
//     );
//   };
//   const handleCancel = () => {
//         router.push('/testMaker/dashboard');
//       };

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center p-5">
//       <h1 className="text-4xl font-bold mb-8">Create a Quiz!</h1>
//       <div className='mb-9 p-6'>
//         <p>Create your quiz to challenge your test takers. Each question is worth 100 points, and at the end of the quiz, you will get the top 5 contestants. Once submitted, you will receive a generated code, which is needed for test takers to find your quiz. Once a card has been added the you can add quiz title.</p>

//         <label className="block text-lg font-medium mt-6 mb-2">Quiz Name:</label>
//         <input
//           type="text"
//           value={cards[0]?.quizName || ''}
//           onChange={(e) => handleQuizNameChange(e.target.value)}
//           className="w-1/3 p-2 border border-gray-300 rounded mb-6"
//         />
//       </div>
//       <div>
//         {cards.length > 0 ? (
//           cards.map((_, index) => (
//             <QuizCard
//               key={index}
//               index={index}
//               onDelete={() => handleDeleteCard(index)}
//               onUpdate={handleUpdateCard}
//             />
//           ))
//         ) : (
//           <p>Create a quiz card!</p>
//         )}
//         <Button
//           label="Add New Card"
//           onClick={handleAddCard}
//           className="bg-green-500 hover:bg-green-600 mt-3"
//         />
//       </div>
//       <div className='justify-center'>
//       <Button
//   label="Create Quiz"
//   onClick={handleSubmit}
//   className="bg-blue-500 hover:bg-blue-600 mt-3"
//   disabled={isQuizValid()} 
// />
// <Button
//           label="Cancel"
//           onClick={handleCancel}
//           className="bg-gray-500 hover:bg-gray-600 mt-3 ml-3"
//         /></div>
//       <ScrollToTopButton />
//     </main>
//   );
// };

// export default CreateQuiz;
import React from 'react';
import { useQuiz } from '@/app/context/QuizContext';
import { useRouter } from 'next/navigation';
import QuizCard from '../../components/quizComponents/quizCard';
import Button from '@/app/components/commonComponents/button';
import ScrollToTopButton from '@/app/components/commonComponents/scrollToTop';
import { Card } from '@/app/types/testMaker_types'; // Ensure you import your types correctly

const CreateQuiz: React.FC = () => {
  const { quizzes, setQuizzes } = useQuiz();
  const router = useRouter();

  const handleAddQuiz = () => {
    setQuizzes((prevQuizzes) => [
      ...prevQuizzes,
      {
        id: prevQuizzes.length,
        quizName: '',
        card: [{ question: '', answers: ['', '', '', ''], correctAnswer: null }] // Initialize with an empty card
      }
    ]);
  };

  const handleAddCard = (quizIndex: number) => {
    console.log(`Adding card to quiz ${quizIndex}`);
    setQuizzes((prevQuizzes) => {
      const updatedQuizzes = [...prevQuizzes];
      console.log('Previous quizzes:', prevQuizzes);
      updatedQuizzes[quizIndex].card.push({ question: '', answers: ['', '', '', ''], correctAnswer: null });
      console.log('Updated quizzes:', updatedQuizzes);
      return updatedQuizzes;
    });
  };
  
  const handleUpdateQuizName = (index: number, newQuizName: string) => {
    setQuizzes((prevQuizzes) => {
      const updatedQuizzes = [...prevQuizzes];
      updatedQuizzes[index] = { ...updatedQuizzes[index], quizName: newQuizName };
      return updatedQuizzes;
    });
  };

  const handleUpdateCard = (quizIndex: number, cardIndex: number, updatedCard: Card) => {
    setQuizzes((prevQuizzes) => {
      const updatedQuizzes = [...prevQuizzes];
      updatedQuizzes[quizIndex].card[cardIndex] = updatedCard;
      return updatedQuizzes;
    });
  };

  const handleDeleteCard = (quizIndex: number, cardIndex: number) => {
    setQuizzes((prevQuizzes) => {
      const updatedQuizzes = [...prevQuizzes];
      updatedQuizzes[quizIndex].card = updatedQuizzes[quizIndex].card.filter((_, i) => i !== cardIndex);
      return updatedQuizzes;
    });
  };

  const handleSubmit = () => {
    console.log("Submit quiz", quizzes);
    router.push('/testMaker/lobby');
  };

  // const isQuizValid = () => {
  //   return quizzes.every(quiz =>
  //     quiz.quizName.trim() !== '' &&
  //     quiz.card.every(card =>
  //       card.question.trim() !== '' &&
  //       card.answers.every(answer => answer.trim() !== '') &&
  //       card.correctAnswer !== null
  //     )
  //   );
  // };

  const handleCancel = () => {
    router.push('/testMaker/dashboard');
  };

  return (
    <main className="flex flex-col px-4 md:px-8 lg:px-16 max-w-4xl mx-auto">
    <h1 className="text-4xl text-center font-bold mb-8">Create a Quiz!</h1>
    <div className='mb-9'>
      <p className=" text-center mb-4">Create your quiz to challenge your test takers...</p>
      {quizzes.map((quiz, quizIndex) => (
        <div key={quiz.id} className="mb-6">
          <label className="block text-lg font-medium mt-6 mb-2">Quiz Name:</label>
          <input
            type="text"
            value={quiz.quizName}
            onChange={(e) => handleUpdateQuizName(quizIndex, e.target.value)}
            className="w-full md:w-3/4 lg:w-1/2 p-2 border border-gray-300 rounded mb-6"
          />
          {quiz.card.length > 0 ? (
            quiz.card.map((card, cardIndex) => (
              <QuizCard
                key={cardIndex}
                quizIndex={quizIndex}
                cardIndex={cardIndex}
                card={card}
                onDeleteCard={() => handleDeleteCard(quizIndex, cardIndex)}
                onUpdateCard={(updatedCard) => handleUpdateCard(quizIndex, cardIndex, updatedCard)}
              />
            ))
          ) : (
            <p>No cards yet. Add a card!</p>
          )}
          <Button
            label="Add New Card"
            onClick={() => handleAddCard(quizIndex)}
            className="bg-green-500 hover:bg-green-600 mt-3"
          />
        </div>
      ))}
      {/* Conditionally render the "Add New Quiz" button */}
      {quizzes.length === 0 && (
        <Button
          label="Add New Quiz"
          onClick={handleAddQuiz}
          className="bg-green-500 hover:bg-green-600 mt-3"
        />
      )}
    </div>
    <div className='flex justify-center mt-6'>
      <Button
        label="Submit Quiz"
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 mt-3"
        // disabled={!isQuizValid()}
      />
      <Button
        label="Cancel"
        onClick={handleCancel}
        className="bg-gray-500 hover:bg-gray-600 mt-3 ml-3"
      />
    </div>
    <ScrollToTopButton />
  </main>
  );
};

export default CreateQuiz;
