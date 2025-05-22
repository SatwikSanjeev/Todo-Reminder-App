import { Task } from '../types/task';

const TASKS_STORAGE_KEY = 'todo-tasks';

export const saveTasks = (tasks: Task[]): void => {
  try {
    // Convert Date objects to ISO strings for storage
    const tasksToSave = tasks.map(task => ({
      ...task,
      dueDate: task.dueDate.toISOString()
    }));
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasksToSave));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

export const loadTasks = (): Task[] => {
  try {
    const tasksJson = localStorage.getItem(TASKS_STORAGE_KEY);
    if (!tasksJson) return [];
    
    // Convert ISO strings back to Date objects
    const parsedTasks = JSON.parse(tasksJson);
    return parsedTasks.map((task: any) => ({
      ...task,
      dueDate: new Date(task.dueDate)
    }));
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
};