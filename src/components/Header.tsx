import React from 'react';

type Props = {
  setSearchQuery: (query: string) => void;
};

const Header: React.FC<Props> = ({ setSearchQuery }) => {
  return (
    <header className="flex justify-between items-center py-4">
      <h1 className="text-2xl font-bold">Task Manager</h1>
      <input
        type="text"
        placeholder="Search tasks..."
        className="input w-1/2"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </header>
  );
};

export default Header;
