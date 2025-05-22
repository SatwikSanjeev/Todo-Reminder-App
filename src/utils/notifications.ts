import { Task } from '../types/task';

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notifications');
    return false;
  }
  
  if (Notification.permission === 'granted') {
    return true;
  }
  
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  
  return false;
};

export const showNotification = (task: Task): void => {
  if (Notification.permission !== 'granted') {
    return;
  }
  
  const importanceEmoji = {
    low: '🔵',
    medium: '🟠',
    high: '🔴'
  };
  
  const emoji = importanceEmoji[task.importance];
  
  const notification = new Notification('Task Reminder', {
    body: `${emoji} ${task.title}\n${task.description}`,
    icon: '/notification-icon.png'
  });
  
  notification.onclick = () => {
    window.focus();
    notification.close();
  };
  
  // Auto close after 10 seconds
  setTimeout(() => notification.close(), 10000);
};

export const checkAndTriggerNotifications = (
  tasks: Task[],
  markTaskNotified: (id: string) => void
): void => {
  const now = new Date();
  
  tasks.forEach(task => {
    if (!task.completed && !task.notified && new Date(task.dueDate) <= now) {
      showNotification(task);
      markTaskNotified(task.id);
    }
  });
};