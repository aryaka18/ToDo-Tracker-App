'use client';

import { ListTodo, Menu, X } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* icon */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-linear-to-br from-gray-900 to-gray-600 rounded-lg shadow-md">
              <ListTodo className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ToDo Tracker</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Stay organized</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}