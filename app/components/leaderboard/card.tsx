'use client'
import React from 'react';
import { useState } from 'react';
import LeaderboardRows from './leaderboardRows'
import {testTakers, TestTaker} from '../../data/testTakers'

const Card = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [participants, setParticipants]= useState<TestTaker[]>(testTakers);

  const sortMachine = (a: TestTaker, b: TestTaker) => {
    return b.score - a.score;
  }

  participants.sort(sortMachine);

  return (
    <React.Fragment>
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-200 text-gray-700 text-lg px-6 py-4">
          Leaderboard
        </div>
        <div className="px-6 py-4 flex justify-between items-center">
  <p className="text-gray-700 text-base">
    Here are the top 5 players on the leaderboard
  </p>   
</div>

        <div>
          {participants.map((participant, index) => (
            <LeaderboardRows
              key={index}
              name={participant.name}
              score={participant.score}
            />
          ))}
         </div>
         </div>
    </React.Fragment>
  );
};

export default Card;