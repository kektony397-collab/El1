
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ to, icon, label }: { to: string; icon: string; label: string }) => {
  const commonClasses = "flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200";
  const activeClasses = "text-primary-DEFAULT";
  const inactiveClasses = "text-gray-500 dark:text-gray-400 hover:text-primary-light";
  
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${commonClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      <i className={`${icon} text-2xl`}></i>
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  );
};

export const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card dark:bg-dark_card border-t border-gray-200 dark:border-gray-800 shadow-[0_-2px_10px_-3px_rgba(0,0,0,0.1)] flex md:hidden">
      <NavItem to="/" icon="ph-fill ph-gauge" label="Dashboard" />
      <NavItem to="/expenses" icon="ph-fill ph-list-bullets" label="Expenses" />
      <NavItem to="/settings" icon="ph-fill ph-gear-six" label="Settings" />
    </nav>
  );
};
