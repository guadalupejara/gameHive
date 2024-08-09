'use client';

import React from 'react';
import { useQuiz } from '@/app/context/QuizContext';
import { useRouter } from 'next/navigation';
import QuizCard from '../../components/quizComponents/quizCard';
import Button from '@/app/components/commonComponents/button';
import ScrollToTopButton from '@/app/components/commonComponents/scrollToTop';
import { Card } from '@/app/types/testMaker_types';
import { addQuiz } from '@/lib';

const CreateQuiz: React.FC = () => {
  const { quiz, setQuiz } = useQuiz();
  const router = useRouter();

  const handleAddQuiz = () => {
    setQuiz({
      quizName: '',
      id:0,
      card: [{ question: '', answers: ['', '', '', ''], correctAnswer: null }]
    });
  };
  const handleAddCard = () => {
    setQuiz((prevQuiz) => {
      if (!prevQuiz) {
        return {
          id: 1,
          quizName: '',
          card: [{ question: '', answers: ['', '', '', ''], correctAnswer: null }],
        };
      }
      const updatedCards = prevQuiz.card ? [...prevQuiz.card] : [];
      updatedCards.push({ question: '', answers: ['', '', '', ''], correctAnswer: null });
  
      return {
        ...prevQuiz,
        card: updatedCards,
      };
    });
  };
  
  const handleUpdateQuizName = (newQuizName: string) => {
    setQuiz((prevQuiz) => {
      if (!prevQuiz) return null;
  
      return {
        ...prevQuiz,
        quizName: newQuizName,
      };
    });
  };

  const handleUpdateCard = (cardIndex: number, updatedCard: Card) => {
    setQuiz((prevQuiz) => {
      if (!prevQuiz){ return null}
       else {
        const updatedCards = [...prevQuiz.card];
        updatedCards[cardIndex] = updatedCard;
        return { ...prevQuiz, card: updatedCards };
      }
    });
  };

  const handleDeleteCard = (cardIndex: number) => {
    setQuiz((prevQuiz) => {
      if (!prevQuiz){ return null}
       else {
        const updatedCards = prevQuiz.card.filter((_, i) => i !== cardIndex);
        return { ...prevQuiz, card: updatedCards };
      }
    });
  };

  const handleSubmit = () => {
    console.log("Submit Quiz", quiz);
    addQuiz(quiz);
    router.push('/testMaker/lobby');
  };

  const handleCancel = () => {
    router.push('/testMaker/dashboard');
  };

  return (
    <main className="flex flex-col px-4 md:px-8 lg:px-16 max-w-4xl mx-auto">
      <h1 className="text-4xl text-center font-bold mb-8">Create a Quiz!</h1>
      <div className='mb-9'>
        <p className=" text-center mb-4">Create your quiz to challenge your test takers...</p>
        <div className="mb-6">
          <label className="block text-lg font-medium mt-6 mb-2">Quiz Name:</label>
          <input
            type="text"
            value={quiz?.quizName}
            onChange={(e) => handleUpdateQuizName(e.target.value)}
            className="w-full md:w-3/4 lg:w-1/2 p-2 border border-gray-300 rounded mb-6"
          />
          {quiz?.card && quiz.card.length > 0 ? (
            quiz?.card.map((card, cardIndex) => (
              <QuizCard
                key={cardIndex}
                cardIndex={cardIndex}
                card={card}
                onDeleteCard={() => handleDeleteCard(cardIndex)}
                onUpdateCard={(updatedCard) => handleUpdateCard(cardIndex, updatedCard)}
              />
            ))
          ) : (
            <p>Create a Quiz by adding a new Card!</p>
          )}
          <Button
            label="Add New Card"
            onClick={handleAddCard}
            className="bg-green-500 hover:bg-green-600 mt-3"
          />
        </div>
        {quiz?.card.length === 0 && (
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
