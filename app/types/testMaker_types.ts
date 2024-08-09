// types.ts

// Define the shape of a single Card object
export interface Card {
    question: string;
    answers: string[];
    correctAnswer: number | null;
  }
  
  // Define the shape of a Quiz object
  export interface Quiz {
    id: string;
    db_doc_id:string;
    quizName: string;
    card: Card[]; // An array of Card objects
  }
  