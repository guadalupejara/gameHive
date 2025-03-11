'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import Button from '@/app/components/commonComponents/button';

export default function Dashboard() {
    const router = useRouter();
  const handleCreateQuiz = () => {
    router.push('/testMaker/createQuiz');
  };
  const handleSplash = () => {
    router.push('/');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Test Maker Dashboard</h1>
     <div className='flex items center'>
      <Button onClick={handleCreateQuiz} label="Create Quiz" className="px-4 py-2 bg-blue-500 text-white rounded mx-3 hover:bg-blue-600" />
      <Button onClick={handleSplash} label="Back to Main" className="px-4 py-2 bg-slate-300 text-white rounded mx-3 hover:bg-slate-400" />
    </div>
    </main>
  );
}
