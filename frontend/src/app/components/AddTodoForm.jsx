'use client';

import { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';

export default function AddTodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await onAdd({ title, description });
      setTitle('');
      setDescription('');
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-linear-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm mb-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-gray-900" />
        <h2 className="text-xl font-semibold text-gray-900">
          Create New Todo
        </h2>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all text-gray-700"
          disabled={isSubmitting}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          placeholder="Add details (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-700 transition-all resize-none"
          rows="3"
          disabled={isSubmitting}
        />
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={isSubmitting || !title.trim()}
        className="w-full bg-linear-to-r from-gray-600 to-gray-700 text-white py-2.5 px-4 rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow"
      >
        <Plus className="w-5 h-5" />
        {isSubmitting ? 'Adding...' : 'Add Todo'}
      </button>
    </div>
  );
}