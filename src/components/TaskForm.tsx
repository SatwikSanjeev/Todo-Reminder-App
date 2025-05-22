import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PlusCircle, Clock, FileText, AlertTriangle, Mail } from 'lucide-react';
import { Task, Importance } from '../types/task';
import { getLocalISOString } from '../utils/dateUtils';
import emailjs from 'emailjs-com';

interface TaskFormProps {
  addTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [importance, setImportance] = useState<Importance>('medium');
  const [dateTime, setDateTime] = useState(getLocalISOString(new Date()));
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState('');

  const sendEmail = (taskName: string, toEmail: string) => {
    emailjs.send(
      'service_ryk270l',    // Replace with your EmailJS Service ID
      'service_ryk270l',   // Replace with your EmailJS Template ID
      {
        task_name: taskName,
        notes: 'This is a reminder from your TODO app',
        to_email: toEmail,  // dynamic recipient email
      },
      'Detrf4-KNCVaO7aW-'     // Replace with your EmailJS Public Key
    )
    .then(response => {
      console.log('SUCCESS!', response.status, response.text);
    })
    .catch(err => {
      console.log('FAILED...', err);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!dateTime) {
      setError('Due date and time are required');
      return;
    }
    if (!userEmail.trim()) {
      setError('Email is required');
      return;
    }
    // Simple email format validation (basic)
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(userEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    const dueDate = new Date(dateTime);
    if (dueDate < new Date()) {
      setError('Due date and time must be in the future');
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      importance,
      dueDate,
      completed: false,
      notified: false
    };

    addTask(newTask);
    sendEmail(newTask.title, userEmail);

    // Reset form
    setTitle('');
    setDescription('');
    setImportance('medium');
    setDateTime(getLocalISOString(new Date()));
    setUserEmail('');
    setError('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
        <PlusCircle className="mr-2" size={20} />
        Add New Task
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Enter task title"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <FileText className="mr-1" size={16} />
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Enter task description"
            rows={3}
          />
        </div>

        {/* Importance and Due Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="importance" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <AlertTriangle className="mr-1" size={16} />
              Importance
            </label>
            <select
              id="importance"
              value={importance}
              onChange={(e) => setImportance(e.target.value as Importance)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Clock className="mr-1" size={16} />
              Due Date & Time *
            </label>
            <input
              type="datetime-local"
              id="dateTime"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* User Email */}
        <div className="mb-4">
          <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Mail className="mr-1" size={16} />
            Your Email *
          </label>
          <input
            type="email"
            id="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
