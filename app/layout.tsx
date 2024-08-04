
import { QuizProvider } from '@/app/context/QuizContext';
import {TestTakerProvider} from '@/app/context/testTakerContext'
import { GameStartProvider } from '@/app/context/gameStartContext';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GameHive',
  description: 'a Kahoot clone coded by Lupe',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QuizProvider>
          <TestTakerProvider>
          <GameStartProvider>
              {children}
            </GameStartProvider>
          </TestTakerProvider>
        </QuizProvider>
      </body>
    </html>
  );
}
