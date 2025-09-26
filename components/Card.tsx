
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-gray-800/50 border border-gray-700/60 rounded-xl p-6 shadow-lg backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
};
