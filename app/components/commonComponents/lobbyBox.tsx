// import React from 'react';

// interface TestTaker {
//   id: number;
//   name: string;
// }

// interface LobbyBoxProps {
//   takers: TestTaker[];
// }

// const LobbyBox: React.FC<LobbyBoxProps> = ({ takers }) => {
//   return (
//     <div className="border p-4 rounded-md shadow-md">
//       <h2 className="text-xl font-semibold mb-2">Test Takers</h2>
//       <ul>
//         {takers.length > 0 ? (
//           takers.map((taker) => (
//             <li key={taker.id} className="mb-1">{taker.name}</li>
//           ))
//         ) : (
//           <li>No test takers yet.</li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default LobbyBox;
import React from 'react';
import Image from 'next/image';

interface TestTaker {
  id: number;
  name: string;
}

interface LobbyBoxProps {
  takers: TestTaker[];
}

const LobbyBox: React.FC<LobbyBoxProps> = ({ takers }) => {
  return (
    <div className="border p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2">Test Takers</h2>
      <ul>
        {takers.length > 0 ? (
          takers.map((taker) => (
            <li key={taker.id} className="mb-1">{taker.name}</li>
          ))
        ) : (
          <div className="text-center">
            <Image
              src="/sponge.jpg" 
              width={500}
              height={500}
              alt="No test takers"
              className="mx-auto mb-4"
            />
            <p>No test takers yet.</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default LobbyBox;
