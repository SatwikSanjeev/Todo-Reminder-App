export type Importance = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  importance: Importance;
  dueDate: Date;
  completed: boolean;
  notified: boolean;
}