import React, { useState } from 'react';
import { Task } from '../types';

type Props = {
  task: Task;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
};

const TaskItem: React.FC<Props> = ({ task, updateTask, deleteTask }) => {
  const [snoozed, setSnoozed] = useState(false);

  const toggleComplete = () => {
    updateTask({ ...task, completed: !task.completed });
  };

  const handleSnooze = () => {
    setSnoozed(true);
    setTimeout(() => setSnoozed(false), 600000); // 10 minutes
  };

  return (
    <div className={`p-4 border rounded-lg mb-2 ${task.completed ? 'bg-green-100 dark:bg-green-800' : 'bg-white dark:bg-gray-800'}`}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold line-through:text-gray-500" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</h3>
          <p className="text-sm">{task.description}</p>
          {snoozed && <p className="text-xs text-yellow-500">Notifications snoozed for 10 minutes</p>}
        </div>
        <div className="space-x-2">
          <button className="btn" onClick={toggleComplete}>{task.completed ? 'Undo' : 'Complete'}</button>
          <button className="btn" onClick={() => deleteTask(task.id)}>Delete</button>
          <button className="btn" onClick={handleSnooze}>Snooze</button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
