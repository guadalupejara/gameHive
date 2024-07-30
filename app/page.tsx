'use client'
import React from 'react'
import Button from '../app/components/commonComponents/button';  // Adjust the import path based on your project structure

export default function Home() {
  // Function to handle button clicks
  const handleClick = (buttonType: 'testTaker' | 'testMaker') => {
    if (buttonType === 'testTaker') {
      console.log("I'm a Test Taker");
    } else if (buttonType === 'testMaker') {
      console.log("I'm a Test Maker");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to QuizHive!</h1>
        <p className="text-lg">Are you a Test Taker or a Test Maker?</p>
      </div>

      <div className="flex space-x-4">
        <Button
          label="Test Taker"
          onClick={() => handleClick('testTaker')}
          className="bg-blue-500 hover:bg-blue-600"
        />
        <Button
          label="Test Maker"
          onClick={() => handleClick('testMaker')}
          className="bg-green-500 hover:bg-green-600"
        />
      </div>
    </main>
  );
}

