
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { AddExpenseModal } from '../modals/AddExpenseModal';

const TopAppBar = () => (
    <header className="sticky top-0 z-40 bg-card/80 dark:bg-dark_card/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 p-4">
        <h1 className="text-xl font-bold text-center text-primary-DEFAULT">Bike Advance</h1>
    </header>
);

const Footer = () => (
    <footer className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
        Created By Yash K Pathak
    </footer>
);

export const MainLayout: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <TopAppBar />
      <main className="flex-grow pb-20 md:pb-4">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-20 md:bottom-8 right-6 w-14 h-14 bg-primary-DEFAULT text-primary-foreground rounded-full shadow-lg flex items-center justify-center text-3xl hover:bg-primary-dark transition-transform hover:scale-105"
        aria-label="Add Expense"
      >
        <i className="ph-fill ph-plus"></i>
      </button>
      {isModalOpen && <AddExpenseModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};
