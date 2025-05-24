import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import EmptyState from './components/EmptyState';
import { Task } from './types/task';
import { saveTasks, loadTasks } from './utils/localStorage';
import {
  requestNotificationPermission,
  checkAndTriggerNotifications,
} from './utils/notifications';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Load tasks and request notification permission on mount
  useEffect(() => {
    const savedTasks = loadTasks();
    setTasks(savedTasks);

    // Automatically request notification permission if not denied
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        setNotificationsEnabled(true);
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            setNotificationsEnabled(true);
          }
        });
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Set up notification checking interval
  useEffect(() => {
    if (!notificationsEnabled) return;

    const checkNotifications = () => {
      checkAndTriggerNotifications(tasks, markTaskNotified);
    };

    // Check immediately
    checkNotifications();

    // Then check every minute
    const intervalId = setInterval(checkNotifications, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [tasks, notificationsEnabled]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const toggleTaskComplete = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const markTaskNotified = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, notified: true } : task
      )
    );
  };

  const handleRequestNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotificationsEnabled(granted);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 transition-colors duration-300 dark:bg-gray-900">
        <Header
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          requestNotifications={handleRequestNotifications}
        />

        <main className="container mx-auto px-4 pb-12 max-w-3xl">
          {/* 🔔 Notification Test Button */}
          <button
            onClick={() => {
              if (Notification.permission === 'granted') {
                new Notification('🔔 Test Notification', {
                  body: 'Notifications are working on your device!',
                });
              } else {
                alert('Notification permission is not granted.');
              }
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Send Test Notification
          </button>

          {tasks.length === 0 && <EmptyState />}

          <TaskForm addTask={addTask} />

          <TaskList
            tasks={tasks}
            onToggleComplete={toggleTaskComplete}
            onDelete={deleteTask}
            filter={filter}
            setFilter={setFilter}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
