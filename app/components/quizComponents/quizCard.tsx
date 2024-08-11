import React from 'react';
import { Card } from '@/app/types/testMaker_types';

interface QuizCardProps {
  cardIndex: number;
  card: Card;
  errors: {
    question: boolean;
    answers: boolean[];
    correctAnswer: boolean;
  };
  onUpdateCard: (updatedCard: Card) => void;
  onDeleteCard: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  cardIndex,
  card,
  errors,
  onUpdateCard,
  onDeleteCard,
}) => {
  const handleQuestionChange = (value: string) => {
    onUpdateCard({
      ...card,
      question: value,
    });
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = card.answers.map((ans, idx) => (idx === index ? value : ans));
    onUpdateCard({
      ...card,
      answers: updatedAnswers,
    });
  };

  const handleCorrectAnswerChange = (index: number) => {
    onUpdateCard({
      ...card,
      correctAnswer: index,
    });
  };

  const handleDeleteClick = () => {
    onDeleteCard();
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-lg mb-4">
      <button
        type="button"
        onClick={handleDeleteClick}
        className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700"
      >
        <i className="fa-solid fa-trash-can">Trash</i>
      </button>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Question:</label>
        <input
          type="text"
          value={card.question}
          onChange={(e) => handleQuestionChange(e.target.value)}
          className={`w-full p-2 border rounded ${
            errors.question ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter the question"
        />
        {errors.question && (
          <p className="text-red-600 text-sm mt-2">Question is required.</p>
        )}
      </div>
      {card.answers.map((answer, answerIndex) => (
        <div key={answerIndex} className="mb-4 flex items-center">
          <input
            type="radio"
            name={`correctAnswer-${cardIndex}`}
            checked={card.correctAnswer === answerIndex}
            onChange={() => handleCorrectAnswerChange(answerIndex)}
            className="mr-2"
          />
          <input
            type="text"
            value={answer}
            onChange={(e) => handleAnswerChange(answerIndex, e.target.value)}
            className={`w-full p-2 border rounded ${
              errors.answers[answerIndex] ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={`Answer ${answerIndex + 1}`}
          />
          {card.correctAnswer === answerIndex && (
            <p className="text-green-500 text-sm ml-2">Correct Answer</p>
          )}
        </div>
      ))}
      {errors.answers.some((ansError) => ansError) && (
        <p className="text-red-600 text-sm mt-2">All answers are required.</p>
      )}
    </div>
  );
};

export default QuizCard;