const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const todoApi = {
  // get all todos
  async getTodos() {
    const response = await fetch(`${API_URL}/todos`);
    if (!response.ok) throw new Error('Failed to fetch todos');
    return response.json();
  },

  // create new todo
  async createTodo(data) {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create todo');
    }
    return response.json();
  },

  // update todo
  async updateTodo(id, data) {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update todo');
    return response.json();
  },

  // delete todo
  async deleteTodo(id) {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete todo');
  }
};