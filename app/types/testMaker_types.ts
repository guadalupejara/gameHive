
export interface Card {
    uId:string,
    question: string;
    answers: string[];
    correctAnswer: number | null;
  }
  

  export interface Quiz {
    id: string;
    db_doc_id:string;
    quizName: string;
    card: Card[];
  }
  