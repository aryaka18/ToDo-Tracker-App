'use client';

import { CheckCircle2, Circle, Trash2 } from 'lucide-react';

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className={`group bg-white p-4 rounded-xl border transition-all hover:shadow-md ${
      todo.completed ? 'border-gray-200 bg-gray-50' : 'border-gray-200 hover:border-indigo-200'
    }`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(todo.id, !todo.completed)}
          className="mt-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full"
        >
          {todo.completed ? (
            <CheckCircle2 className="w-6 h-6 text-green-500 hover:text-green-600 transition-colors" />
          ) : (
            <Circle className="w-6 h-6 text-gray-400 hover:text-indigo-500 transition-colors" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className={`font-medium text-lg ${
            todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
          }`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className={`text-sm mt-1 ${
              todo.completed ? 'text-gray-400 line-through' : 'text-gray-600'
            }`}>
              {todo.description}
            </p>
          )}
        </div>

        <button
          onClick={() => onDelete(todo.id)}
          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
          aria-label="Delete todo"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}