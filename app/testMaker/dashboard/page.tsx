'use client'
import React from 'react'

export default function Dashboard() {
  // Function to handle button click
  const handleCreateQuiz = () => {
    console.log("Make a quiz");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Test Maker Dashboard</h1>
      
      {/* Create Quiz Button */}
      <button
        onClick={handleCreateQuiz}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create Quiz
      </button>
    </main>
  );
}
