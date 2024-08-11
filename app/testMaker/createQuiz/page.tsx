'use client';
import React, { useState } from 'react';
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
  const [cardCounter, setCardCounter] = useState(1);
  const [errors, setErrors] = useState<{ uId: string; question: boolean; answers: boolean[]; correctAnswer: boolean }[]>(
    quiz.card.map((card) => ({
      uId: card.uId,
      question: false,
      answers: card.answers.map((answer) => !answer.trim()),
      correctAnswer: card.correctAnswer === null,
    }))
  );

  const defaultError = (uId: string) => ({
    uId,
    question: false,
    answers: [false, false, false, false],
    correctAnswer: false,
  });

  const validateForm = () => {
    const quizNameError = {
      uId: 'quiz_name',
      question: !quiz.quizName.trim(),
      answers: [], 
      correctAnswer: false, 
    };

    const cardErrors = quiz.card.map((card) => ({
      uId: card.uId,
      question: !card.question.trim(),
      answers: card.answers.map((answer) => !answer.trim()),
      correctAnswer: card.correctAnswer === null,
    }));

    const newErrors = [quizNameError, ...cardErrors];

    setErrors(newErrors);
    return newErrors.every(
      (error) =>
        (error.uId === 'quiz_name' ? !error.question : true) &&
        !error.answers.some((answerError) => answerError) &&
        !error.correctAnswer
    );
  };

  const handleAddCard = () => {
    setQuiz((prevQuiz) => {
      const updatedCards = [...prevQuiz.card];
      const newCardId = `card_${cardCounter}`;
      updatedCards.push({ uId: newCardId, question: '', answers: ['', '', '', ''], correctAnswer: null });

      setCardCounter((prevCounter) => prevCounter + 1);

      setErrors((prevErrors) => [
        ...prevErrors,
        defaultError(newCardId),
      ]);

      return {
        ...prevQuiz,
        card: updatedCards,
      };
    });
  };

  const handleUpdateQuizName = (newQuizName: string) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      quizName: newQuizName,
    }));
  };

  const handleUpdateCard = (uId: string, updatedCard: Card) => {
    setQuiz((prevQuiz) => {
      const updatedCards = prevQuiz.card.map((card) =>
        card.uId === uId ? updatedCard : card
      );
      setErrors((prevErrors) =>
        updatedCards.map((card) => ({
          ...prevErrors.find((error) => error.uId === card.uId) || defaultError(card.uId),
          uId: card.uId,
        }))
      );

      return { ...prevQuiz, card: updatedCards };
    });
  };

  const handleDeleteCard = (uId: string) => {
    setQuiz((prevQuiz) => {
      const updatedCards = prevQuiz.card.filter((card) => card.uId !== uId);
      setErrors((prevErrors) =>
        prevErrors.filter((error) => error.uId !== uId)
      );

      return { ...prevQuiz, card: updatedCards };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const docId = await addQuiz(quiz);
        setQuiz((prevQuiz) => ({ ...prevQuiz, db_doc_id: docId }));
        router.push('/testMaker/lobby');
      } catch (error) {
        console.error("Error submitting quiz:", error);
      }
    }
  };

  const handleCancel = () => {
    router.push('/testMaker/dashboard');
  };

  return (
    <main className="flex flex-col px-4 md:px-8 lg:px-16 max-w-4xl mx-auto">
      <h1 className="text-4xl text-center font-bold mb-8">Create a Quiz!</h1>
      <div className='mb-9'>
        <p className="text-center mb-4">Create your quiz to challenge your test takers...</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-lg font-medium mt-6 mb-2">Quiz Name:</label>
            <input
              type="text"
              value={quiz.quizName}
              onChange={(e) => handleUpdateQuizName(e.target.value)}
              className={`w-full md:w-3/4 lg:w-1/2 p-2 border ${
                errors.some(err => err.uId === 'quiz_name' && err.question) ? 'border-red-500 bg-red-50' : 'border-gray-300'
              } rounded mb-6`}
            />
            {errors.some(err => err.uId === 'quiz_name' && err.question) && (
              <p className="mt-2 text-sm text-red-600">
                <span className="font-medium">Oops!</span> Quiz name is required.
              </p>
            )}

            {quiz.card.map((card, cardIndex) => (
              <QuizCard
                key={card.uId}
                cardIndex={cardIndex}
                card={card}
                errors={errors.find(err => err.uId === card.uId) || defaultError(card.uId)} 
                onDeleteCard={() => handleDeleteCard(card.uId)}
                onUpdateCard={(updatedCard) => handleUpdateCard(card.uId, updatedCard)}
              />
            ))}

            <Button
              label="Add New Card"
              onClick={handleAddCard} 
              className="bg-green-500 hover:bg-green-600 mt-3"
            />
          </div>

          {/* Render form-wide validation errors */}
          <div className="mb-4">
            {errors.some(error => error.uId === 'quiz_name' && error.question) && (
              <p className="text-red-600 text-sm">
                <span className="font-medium">Oops!</span> Quiz name is required.
              </p>
            )}
          </div>

          {/* Render card-specific validation errors */}
          {errors.filter(error => error.uId !== 'quiz_name').map((error, index) => (
            <div key={index} className="mb-4">
              {error.question && (
                <p className="text-red-600 text-sm">
                  <span className="font-medium">Oops!</span> Question {index + 1} is required.
                </p>
              )}
              {error.answers.some((ansErr) => ansErr) && (
                <p className="text-red-600 text-sm">
                  <span className="font-medium">Oops!</span> All answers for question {index + 1} are required.
                </p>
              )}
              {error.correctAnswer && (
                <p className="text-red-600 text-sm">
                  <span className="font-medium">Oops!</span> Correct answer for question {index + 1} is required.
                </p>
              )}
            </div>
          ))}

          <div className='flex justify-center mt-6'>
            <Button
              label="Submit Quiz"
              type="submit" 
              className="bg-blue-500 hover:bg-blue-600 mt-3"
            />
            <Button
              label="Cancel"
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 mt-3 ml-3"
            />
          </div>
        </form>
      </div>
      <ScrollToTopButton />
    </main>
  );
};

export default CreateQuiz;

