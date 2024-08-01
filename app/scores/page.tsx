'use client'
import React from 'react';
import Card from '../components/leaderboard/card';
import Button from '../components/commonComponents/button';
import { useRouter } from 'next/navigation';
import { testMakers } from '../data/testMaker';

export default function Scores() {
  const router = useRouter();
  const user = testMakers; 

  const handleHome = () => {
    router.push(`/${user.role}/dashboard`);
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-24">
      <h1 className="text-4xl font-bold mb-4">Scores</h1>
      <div className="w-full flex justify-center">
        <Card />
      </div>
      <Button onClick={handleHome} label="Back to Dash" className="mt-4 mx-1" />
    </main>
  );
}
