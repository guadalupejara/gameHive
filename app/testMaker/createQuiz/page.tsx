
'use client'
import React, { useState } from 'react';
import QuizCard from '@/app/components/quizComponents/quizCard';
import Button from '@/app/components/commonComponents/button';
import ScrollToTopButton from '@/app/components/commonComponents/scrollToTop';

interface Card {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: number | null;
}

const CreateQuiz: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([{ id: 0, question: '', answers: ['', '', '', ''], correctAnswer: null }]);

  const handleAddCard = () => {
    setCards([...cards, { id: cards.length, question: '', answers: ['', '', '', ''], correctAnswer: null }]);
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

