import React from 'react';
import { ClipboardList, ArrowDown } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-16 px-4 bg-blue-50 rounded-lg mb-6 animate-fadeIn">
      <ClipboardList className="h-16 w-16 mx-auto text-blue-500 mb-4" />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">No tasks yet</h2>
      <p className="text-gray-600 max-w-md mx-auto mb-4">
        Create your first task by filling out the form below. You'll receive a notification when it's time to complete it.
      </p>
      <ArrowDown className="h-6 w-6 mx-auto text-blue-500 animate-bounce" />
    </div>
  );
};

export default EmptyState;