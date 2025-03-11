'use client'
import React from 'react';

export type LeaderboardRowsProps = {
    key: number;
    name: string;
    score: number;
};


const LeaderboardRows: React.FC<LeaderboardRowsProps> = ({ name, score}) => {

  return (
    <React.Fragment>
      <div className='card flex justify-between items-center m-3 bg-slate-100'>
        <p>{name}</p>
        <div className="flex items-center">
          <p>Score: {score}</p>

        </div>
      </div>
    </React.Fragment>
  );
};

export default LeaderboardRows;