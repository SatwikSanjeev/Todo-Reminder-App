import React from 'react';
import { Bell, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  requestNotifications: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, requestNotifications }) => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 mb-6 sticky top-0 z-10 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Bell className="h-6 w-6 text-blue-500 mr-2" />
          <h1 className="text-xl font-bold text-gray-800">Todo Reminder</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={requestNotifications}
            className="flex items-center text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full transition-colors"
          >
            <Bell className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Enable Notifications</span>
          </button>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;