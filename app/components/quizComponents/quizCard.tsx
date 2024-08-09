'use client';
import React, { useState, useEffect } from 'react';
import { Card } from '@/app/types/testMaker_types';

interface QuizCardProps {
  cardIndex: number;
  card: Card;
  onDeleteCard: () => void;
  onUpdateCard: (updatedCard: Card) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ cardIndex, card, onDeleteCard, onUpdateCard }) => {
  const [question, setQuestion] = useState(card.question);
  const [answers, setAnswers] = useState(card.answers);
  const [correctAnswer, setCorrectAnswer] = useState(card.correctAnswer);

  useEffect(() => {
    onUpdateCard({ question, answers, correctAnswer });
  }, [question, answers, correctAnswer]);

  const handleAnswerChange = (answerIndex: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[answerIndex] = value;
    setAnswers(updatedAnswers);
  };

  const handleCorrectAnswerChange = (answerIndex: number) => {
    setCorrectAnswer(answerIndex);
  };

  const handleQuestionChange = (value: string) => {
    setQuestion(value);
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-lg mb-4">
      <button
        onClick={onDeleteCard}
        className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700"
      >
        <i className="fa-solid fa-trash-can">Trash</i>
      </button>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Question:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => handleQuestionChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      {answers.map((answer, answerIndex) => (
        <div key={answerIndex} className="mb-4 flex items-center">
          <input
            type="radio"
            name={`correctAnswer-${cardIndex}`}
            checked={correctAnswer === answerIndex}
            onChange={() => handleCorrectAnswerChange(answerIndex)}
            className="mr-2"
          />
          <input
            type="text"
            value={answer}
            onChange={(e) => handleAnswerChange(answerIndex, e.target.value)}
            className={`w-full p-2 border rounded ${correctAnswer === answerIndex ? 'border-green-500' : 'border-gray-300'}`}
            placeholder={`Answer ${answerIndex + 1}`}
          />
          {correctAnswer === answerIndex && (
            <p className="text-green-500 text-sm ml-2">Correct Answer</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuizCard;
