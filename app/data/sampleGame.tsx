
export interface Card {
    id: number;
    quizName: string;
    question: string;
    answers: string[];
    correctAnswer: number | null;
  }
  
  export const mockGameData: Card[] = [
    {
      id: 1,
      quizName: "General Knowledge",
      question: "What is the capital of France?",
      answers: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: 0, // Index of the correct answer in the answers array
    },
    {
      id: 2,
      quizName: "Science",
      question: "What is the chemical symbol for water?",
      answers: ["H2O", "CO2", "O2", "NaCl"],
      correctAnswer: 0,
    },
    {
      id: 3,
      quizName: "History",
      question: "Who was the first President of the United States?",
      answers: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
      correctAnswer: 1,
    },
    {
      id: 4,
      quizName: "Mathematics",
      question: "What is the value of π (pi) to two decimal places?",
      answers: ["3.12", "3.14", "3.16", "3.18"],
      correctAnswer: 1,
    },
    {
      id: 5,
      quizName: "Literature",
      question: "Who wrote 'Romeo and Juliet'?",
      answers: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
      correctAnswer: 0,
    }
  ];
  