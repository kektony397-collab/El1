
import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-card dark:bg-dark_card text-card_foreground dark:text-dark_card_foreground rounded-xl shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
};
