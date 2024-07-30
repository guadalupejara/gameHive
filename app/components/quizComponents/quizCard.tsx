
'use client'
import React, { useState, useEffect } from 'react';

interface QuizCardProps {
  onAdd: () => void;
  onDelete: () => void;
  onUpdate: (index: number, question: string, answers: string[], correctAnswer: number | null) => void;
  index: number;
}

const QuizCard: React.FC<QuizCardProps> = ({ onAdd, onDelete, onUpdate, index }) => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleCorrectAnswerChange = (index: number) => {
    setCorrectAnswer(index);
  };

  // Debounce the onUpdate call to avoid too many updates in quick succession
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onUpdate(index, question, answers, correctAnswer);
    }, 300); // Delay to reduce frequency of updates

    return () => clearTimeout(timeoutId);
  }, [question, answers, correctAnswer]);

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-lg w-[66vw] mx-auto mb-3">
      <div className="absolute top-2 right-2 flex space-x-2">
        <button
          className="text-red-500 hover:text-red-700"
          onClick={onDelete}
        >
          <i className="fa-solid fa-trash-can">Trash</i>
        </button>
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={onAdd}
        >
          <i className="fa-regular fa-square-plus">Add</i>
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Question:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {answers.map((answer, answerIndex) => (
        <div key={answerIndex} className="mb-4">
          <div className="flex items-center mb-2">
            <input
              type="radio"
              name={`correctAnswer-${index}`}
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
          </div>
          {correctAnswer === answerIndex && (
            <p className="text-green-500 text-sm ml-8">Correct Answer</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuizCard;

