'use client';

import { useState, useEffect } from 'react';
import { ListTodo, Target, CheckCheck } from 'lucide-react';
import { todoApi } from '@/lib/api';
import AddTodoForm from './AddTodoForm';
import TodoItem from './TodoItem';
import Navbar from './Navbar';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await todoApi.getTodos();
      setTodos(data);
    } catch (error) {
      console.error('Failed to load todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (data) => {
    const newTodo = await todoApi.createTodo(data);
    setTodos([newTodo, ...todos]);
  };

  const handleToggleTodo = async (id, completed) => {
    await todoApi.updateTodo(id, { completed });
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed } : todo
    ));
  };

  const handleDeleteTodo = async (id) => {
    if (!confirm('Are you sure you want to delete this todo?')) return;
    await todoApi.deleteTodo(id);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length
  };

  if (loading) {
    return (
      <>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-white-600">Loading the data, please wait</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* overview */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-2">
                <ListTodo className="w-5 h-5 text-gray-600" />
              </div>
              <div className="text-center text-3xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-center text-sm text-gray-600 mt-1">Total Tasks</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-5 h-5 text-amber-600" />
              </div>
              <div className="text-center text-3xl font-bold text-amber-600">{stats.active}</div>
              <div className="text-center text-sm text-gray-600 mt-1">Active</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-2">
                <CheckCheck className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-center text-3xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-center text-sm text-gray-600 mt-1">Completed</div>
            </div>
          </div>

          <AddTodoForm onAdd={handleAddTodo} />

          {/* filter tabs */}
          {todos.length > 0 && (
            <div className="flex gap-2 mb-6 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
              {['all', 'active', 'completed'].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-medium capitalize transition-all ${
                    filter === filterType
                      ? 'bg-linear-to-r from-gray-900 to-gray-500 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {filterType}
                </button>
              ))}
            </div>
          )}

          {/* todo list */}
          <div className="space-y-3">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <ListTodo className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">
                  {todos.length === 0 ? 'No todos yet. Create one to get started!' : `No ${filter} todos`}
                </p>
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}