// 'use client'
// import React, { createContext, useContext, useState, ReactNode } from 'react';

// interface Tester {
//   id: number;
//   role: 'testtaker';
//   name: string;
//   score: number;
// }

// interface TestTakerContextProps {
//   testTakers: Tester[]; // Change to an array
//   addTestTaker: (testTaker: Tester) => void;
//   updateTestTakerScore: (id: number, newScore: number) => void;
// }

// const TestTakerContext = createContext<TestTakerContextProps | undefined>(undefined);

// export const TestTakerProvider = ({ children }: { children: ReactNode }) => {
//   const [testTakers, setTestTakers] = useState<Tester[]>([]); // Change to array

//   const addTestTaker = (newTestTaker: Tester) => {
//     setTestTakers((prev) => [...prev, newTestTaker]); // Append new test taker
//   };

//   const updateTestTakerScore = (id: number, newScore: number) => {
//     setTestTakers((prev) =>
//       prev.map((taker) => (taker.id === id ? { ...taker, score: newScore } : taker))
//     );
//   };

//   return (
//     <TestTakerContext.Provider value={{ testTakers, addTestTaker, updateTestTakerScore }}>
//       {children}
//     </TestTakerContext.Provider>
//   );
// };

// export const useTestTaker = () => {
//   const context = useContext(TestTakerContext);
//   if (!context) {
//     throw new Error('useTestTaker must be used within a TestTakerProvider');
//   }
//   return context;
// };
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types for TestTaker
interface Tester {
  id: number;
  role: 'testtaker';
  name: string;
  score: number;
}

interface TestTaker {
  id: string;
  tester: Tester[];
}

// Context Props
interface TestTakerContextProps {
  testTakers: TestTaker[];
  currentUser: TestTaker | null;
  addTestTaker: (testTaker: TestTaker) => void;
  updateTestTakerScore: (id: number, newScore: number) => void;
  setCurrentUser: (user: TestTaker | null) => void; // To set the current user
  setTestTakers: (testTakers: TestTaker[]) => void; // To directly set the testTakers list
}

const TestTakerContext = createContext<TestTakerContextProps | undefined>(undefined);

export const TestTakerProvider = ({ children }: { children: ReactNode }) => {
  const [testTakers, setTestTakers] = useState<TestTaker[]>([]);
  const [currentUser, setCurrentUser] = useState<TestTaker | null>(null);

  // Add new test taker
  const addTestTaker = (newTestTaker: TestTaker) => {
    setTestTakers((prev) => [...prev, newTestTaker]);
  };

  // Update score of an existing test taker
  // const updateTestTakerScore = (id: number, newScore: number) => {
  //   setTestTakers((prev) =>
  //     prev.map((taker) =>
  //       taker.tester.find((t) => t.id === id)
  //         ? {
  //             ...taker,
  //             tester: taker.tester.map((t) =>
  //               t.id === id ? { ...t, score: newScore } : t
  //             ),
  //           }
  //         : taker
  //     )
  //   );
  // };
  const updateTestTakerScore = (id: number, newScore: number) => {
    setTestTakers((prev) =>
      prev.map((taker) => {
        // Check if there's a tester with the given ID
        const updatedTesters = taker.tester.map((t) =>
          t.id === id ? { ...t, score: newScore } : t // Update the score of the correct tester
        );
  
        // Return the updated TestTaker with the updated tester array
        return { ...taker, tester: updatedTesters };
      })
    );
  };
  
  const updateTestTakersList = (newTestTakers: TestTaker[]) => {
    setTestTakers(newTestTakers);
  };

  return (
    <TestTakerContext.Provider
      value={{ testTakers, currentUser, addTestTaker, updateTestTakerScore, setCurrentUser, setTestTakers: updateTestTakersList, }}
    >
      {children}
    </TestTakerContext.Provider>
  );
};

// Custom hook to use the context
export const useTestTaker = () => {
  const context = useContext(TestTakerContext);
  if (!context) {
    throw new Error('useTestTaker must be used within a TestTakerProvider');
  }
  return context;
};