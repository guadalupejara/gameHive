// data/testTaker.tsx

export interface TestTaker {
    id: string;
   tester:tester[];
  }
  
  export interface tester{ id: number;
    role:string;
    name: string;
    score: number; }

  export const testTakers: TestTaker = {id:'yymx',
    tester:[
    { id: 1, role: 'testtaker', name: 'Alice', score: 100 },
    { id: 2, role: 'testtaker', name: 'Bob', score: 0 },
    { id: 3, role: 'testtaker', name: 'Charlie', score: 200 },
    { id: 4, role: 'testtaker', name: 'David', score: 300 },
    { id: 5, role: 'testtaker', name: 'Eve', score: 100 },
    
  ]};
  