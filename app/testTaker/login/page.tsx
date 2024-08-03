
// 'use client';

// import React, { useState } from 'react';
// import Button from '@/app/components/commonComponents/button';

// interface TestTaker {
//   id: number;
//   role: 'testtaker';
//   name: string;
//   score: number;
// }

// export default function Login() {
//   const [gameId, setGameId] = useState('');
//   const [userName, setUserName] = useState('');
//   const [testTakers, setTestTakers] = useState<TestTaker[]>([]);

//   const handleStartGame = () => {
//     if (gameId && userName) {
//       const newTestTaker: TestTaker = {
//         id: testTakers.length + 1,
//         role: 'testtaker',
//         name: userName,
//         score: 0,
//       };
//       setTestTakers([...testTakers, newTestTaker]);
//       console.log('Test Taker added:', newTestTaker);
//     }
//   };

//   return (
//     <main className="flex min-h-screen text-center items-center justify-center p-24">
//       <div>
//         <h1 className="text-4xl  font-bold">Test Taker Login</h1>
//         <div className='mb-9 p-6'>
//           <p>To start a game, input the code & choose a user name. Be aware that the Test Maker will only see the name you have chosen.</p>
//           <label className="block text-lg font-medium mt-6 mb-2">Game Id:</label>
//           <input
//             type="text"
//             value={gameId}
//             onChange={(e) => setGameId(e.target.value)}
//             className="w-1/3 p-2 border border-gray-300 rounded mb-6"
//           />
//           <label className="block text-lg font-medium mt-6 mb-2">User Name:</label>
//           <input
//             type="text"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//             className="w-1/3 p-2 border border-gray-300 rounded mb-6"
//           />
//           <div className='flex flex-container justify-center'>
//           <Button
//             label="Start Game"
//             onClick={handleStartGame}
//             className="bg-blue-400 hover:bg-blue-500 mt-3 ml-3"
//             disabled={!gameId || !userName}
//           />
//           <Button
//             label="Cancel"
//             onClick={() => {
//               setGameId('');
//               setUserName('');
//             }}
//             className="bg-gray-500 hover:bg-gray-600 mt-3 ml-3"
//           /></div>
//         </div>
//       </div>
//     </main>
//   );
// }
'use client';

import React, { useState } from 'react';
import Button from '@/app/components/commonComponents/button';
import { useTestTaker } from '@/app/context/testTakerContext';
// import { useRouter } from 'next/navigation';

interface TestTaker {
  id: number;
  role: 'testtaker';
  name: string;
  score: number;
}

export default function Login() {
  const [gameId, setGameId] = useState('');
  const [userName, setUserName] = useState('');
  const { testTakers, addTestTaker } = useTestTaker();
  // const router = useRouter();

  const handleStartGame = () => {
    if (gameId && userName) {
      const newTestTaker: TestTaker = {
        id: testTakers.length + 1,
        role: 'testtaker',
        name: userName,
        score: 0,
      };
      addTestTaker(newTestTaker);
      console.log('Test Taker added:', newTestTaker);
      // router.push('/lobby'); // Redirect to the lobby
    }
  };

  return (
    <main className="flex min-h-screen text-center items-center justify-center p-24">
      <div>
        <h1 className="text-4xl font-bold">Test Taker Login</h1>
        <div className='mb-9 p-6'>
          <p>To start a game, input the code & choose a user name. Be aware that the Test Maker will only see the name you have chosen.</p>
          <label className="block text-lg font-medium mt-6 mb-2">Game Id:</label>
          <input
            type="text"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            className="w-1/3 p-2 border border-gray-300 rounded mb-6"
          />
          <label className="block text-lg font-medium mt-6 mb-2">User Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-1/3 p-2 border border-gray-300 rounded mb-6"
          />
          <div className='flex flex-container justify-center'>
            <Button
              label="Start Game"
              onClick={handleStartGame}
              className="bg-blue-400 hover:bg-blue-500 mt-3 ml-3"
              disabled={!gameId || !userName}
            />
            <Button
              label="Cancel"
              onClick={() => {
                setGameId('');
                setUserName('');
              }}
              className="bg-gray-500 hover:bg-gray-600 mt-3 ml-3"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
