 export interface TestTaker {
    id: string;
    tester: tester[];
  }
 export interface tester{  id: number;
    role: 'testtaker';
    name: string;
    score: number;}

