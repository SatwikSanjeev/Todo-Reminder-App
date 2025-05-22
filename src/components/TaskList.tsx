import React from 'react';
import { Task } from '../types/task';
import TaskItem from './TaskItem';
import { List, FilterX } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onToggleComplete, 
  onDelete, 
  filter, 
  setFilter 
}) => {
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    if (filter === 'high') return task.importance === 'high' && !task.completed;
    if (filter === 'medium') return task.importance === 'medium' && !task.completed;
    if (filter === 'low') return task.importance === 'low' && !task.completed;
    return true;
  });
  
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // First sort by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then sort by importance for incomplete tasks
    if (!a.completed && !b.completed) {
      const importanceOrder = { high: 0, medium: 1, low: 2 };
      if (a.importance !== b.importance) {
        return importanceOrder[a.importance] - importanceOrder[b.importance];
      }
    }
    
    // Finally sort by due date
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <List className="mr-2" size={20} />
          Task List
        </h2>
        
        <div className="flex flex-wrap gap-2">
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
            All
          </FilterButton>
          <FilterButton active={filter === 'active'} onClick={() => setFilter('active')}>
            Active
          </FilterButton>
          <FilterButton active={filter === 'high'} onClick={() => setFilter('high')}>
            High
          </FilterButton>
          <FilterButton active={filter === 'medium'} onClick={() => setFilter('medium')}>
            Medium
          </FilterButton>
          <FilterButton active={filter === 'low'} onClick={() => setFilter('low')}>
            Low
          </FilterButton>
          <FilterButton active={filter === 'completed'} onClick={() => setFilter('completed')}>
            Completed
          </FilterButton>
        </div>
      </div>
      
      {sortedTasks.length > 0 ? (
        <div className="space-y-2">
          {sortedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500 flex flex-col items-center">
          <FilterX size={40} className="mb-2 text-gray-400" />
          <p>No tasks found</p>
          {filter !== 'all' && (
            <button
              onClick={() => setFilter('all')}
              className="mt-2 text-blue-500 hover:text-blue-700 text-sm transition-colors"
            >
              Show all tasks
            </button>
          )}
        </div>
      )}
    </div>
  );
};

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const FilterButton: React.FC<FilterButtonProps> = ({ active, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-xs rounded-full transition-colors duration-200 ${
        active
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  );
};

export default TaskList;