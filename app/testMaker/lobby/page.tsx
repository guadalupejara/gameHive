// 'use client'
// import React, { useEffect, useState } from 'react';
// import { testTakers, TestTaker } from '@/app/data/testTakers';
// import Button from '@/app/components/commonComponents/button';
// import LobbyBox from '@/app/components/commonComponents/lobbyBox';

// // Function to generate a random alphanumeric code
// const generateUniqueCode = (existingCodes: string[]): string => {
//   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//   let newCode;

//   do {
//     newCode = '';
//     for (let i = 0; i < 4; i++) {
//       newCode += chars[Math.floor(Math.random() * chars.length)];
//     }
//   } while (existingCodes.includes(newCode));

//   return newCode;
// };

// const Lobby: React.FC = () => {
//   const [gameCode, setGameCode] = useState('');
//   const [takers, setTakers] = useState<TestTaker[]>([]);

//   useEffect(() => {
//     // Fetch existing codes from backend to ensure uniqueness
//     const existingCodes: string[] = []; // Replace with actual fetching logic

//     // Generate a unique alphanumeric code
//     const code = generateUniqueCode(existingCodes);
//     setGameCode(code);
//     setTakers(testTakers);
//   }, []);

//   const startGame = () => {
//     // Logic to start the game
//     console.log('Starting game with code:', gameCode);
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-4">Lobby</h1>
//       <p className="text-lg mb-4">Game Code: {gameCode}</p>
//       <LobbyBox takers={takers} />
//       <Button onClick={startGame} label="Start Game" className="mt-4" />
//     </div>
//   );
// };

// export default Lobby;

'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { testTakers, TestTaker } from '@/app/data/testTakers';
import Button from '@/app/components/commonComponents/button';
import LobbyBox from '@/app/components/commonComponents/lobbyBox';

// Function to generate a random alphanumeric code
const generateUniqueCode = (existingCodes: string[]): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let newCode;

  do {
    newCode = '';
    for (let i = 0; i < 4; i++) {
      newCode += chars[Math.floor(Math.random() * chars.length)];
    }
  } while (existingCodes.includes(newCode));

  return newCode;
};

const Lobby: React.FC = () => {
  const router = useRouter(); // Initialize useRouter
  const [gameCode, setGameCode] = useState('');
  const [takers, setTakers] = useState<TestTaker[]>([]);

  useEffect(() => {
    // Fetch existing codes from backend to ensure uniqueness
    const existingCodes: string[] = []; // Replace with actual fetching logic

    // Generate a unique alphanumeric code
    const code = generateUniqueCode(existingCodes);
    setGameCode(code);
    setTakers(testTakers);
  }, []);

  const startGame = () => {
    // Logic to start the game
    console.log('Starting game with code:', gameCode);
  };

  const cancelGame = () => {
    // Route to the dashboard
    router.push('/testMaker/dashboard');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Lobby</h1>
      <p className="text-lg mb-4">Game Code: {gameCode}</p>
      <LobbyBox takers={takers} />
      <div className="mt-4">
        <Button onClick={startGame} label="Start Game" className="mr-2" />
        <Button onClick={cancelGame} label="Cancel" className="bg-gray-300" />
      </div>
    </div>
  );
};

export default Lobby;
