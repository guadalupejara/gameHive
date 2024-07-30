import React from 'react';

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
          <li>No test takers yet.</li>
        )}
      </ul>
    </div>
  );
};

export default LobbyBox;
