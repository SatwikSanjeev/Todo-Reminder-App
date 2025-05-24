import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types';
import emailjs from 'emailjs-com';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', prefersDark);
  }, []);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const markAllAsComplete = () => {
    setTasks(tasks.map(task => ({ ...task, completed: true })));
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendTasksViaEmail = () => {
    const message = tasks.map(t => `${t.title} - ${t.description} [${t.completed ? 'Completed' : 'Pending'}]`).join('\n');
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
      message,
      to_name: 'User',
      from_name: 'Task App'
    }, 'YOUR_USER_ID')
    .then(() => alert('Email sent!'))
    .catch(err => alert('Failed to send email: ' + err));
  };

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <Header setSearchQuery={setSearchQuery} />
      <TaskForm addTask={addTask} />
      <div className="flex justify-between items-center my-4">
        <p>{completedCount} of {tasks.length} tasks completed</p>
        <div className="space-x-2">
          <button className="btn" onClick={markAllAsComplete}>Mark All Complete</button>
          <button className="btn" onClick={clearCompletedTasks}>Clear Completed</button>
          <button className="btn" onClick={sendTasksViaEmail}>Send via Email</button>
        </div>
      </div>
      <TaskList tasks={filteredTasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
};

export default App;
