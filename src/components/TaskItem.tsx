import React from 'react';
import { CheckCircle, Circle, Trash2, Clock, AlertCircle } from 'lucide-react';
import { Task } from '../types/task';
import { formatDateTime } from '../utils/dateUtils';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  const importanceColor = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-amber-100 text-amber-800',
    high: 'bg-red-100 text-red-800',
  };

  const importanceText = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  };
  
  const isPastDue = new Date(task.dueDate) < new Date() && !task.completed;
  
  return (
    <div 
      className={`
        mb-4 bg-white rounded-lg shadow-sm p-4 border-l-4 transition-all duration-300 hover:shadow-md
        ${task.completed ? 'border-green-500 opacity-75' : ''}
        ${isPastDue ? 'border-red-500' : ''}
        ${!task.completed && !isPastDue ? 
          task.importance === 'high' ? 'border-red-500' : 
          task.importance === 'medium' ? 'border-amber-500' : 'border-blue-500' : ''}
      `}
    >
      <div className="flex items-start">
        <button
          onClick={() => onToggleComplete(task.id)}
          className="flex-shrink-0 mt-1 text-gray-500 hover:text-green-600 transition-colors duration-200"
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </button>
        
        <div className="ml-3 flex-grow">
          <div className="flex flex-wrap justify-between items-start">
            <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            
            <div className="flex items-center space-x-2 mt-1">
              <span className={`text-xs px-2 py-1 rounded-full ${importanceColor[task.importance]}`}>
                {importanceText[task.importance]}
              </span>
              
              <button
                onClick={() => onDelete(task.id)}
                className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                aria-label="Delete task"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className={`mt-1 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {task.description}
            </p>
          )}
          
          <div className={`mt-2 flex items-center text-xs ${isPastDue ? 'text-red-600' : 'text-gray-500'}`}>
            {isPastDue ? <AlertCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
            <span>{formatDateTime(task.dueDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;