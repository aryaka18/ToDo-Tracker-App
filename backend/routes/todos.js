import express from 'express';
import Todo from '../models/todo.js';

const router = express.Router();

// GET /todos - list all todos
router.get('/', async (req, res, next) => {
  try {
    const todos = await Todo.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(todos);
  } catch (error) {
    next(error);
  }
});

// POST /todos - create a new todo
router.post('/', async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        error: 'Validation Error',
        details: [{ field: 'title', message: 'Title is required' }]
      });
    }

    const todo = await Todo.create({
      title: title.trim(),
      description: description?.trim() || null,
      completed: false
    });

    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
});

// PUT /todos/:id - update a todo
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // validate title
    if (title !== undefined && (!title || title.trim() === '')) {
      return res.status(400).json({
        error: 'Validation Error',
        details: [{ field: 'title', message: 'Title cannot be empty' }]
      });
    }

    // Update fields
    if (title !== undefined) todo.title = title.trim();
    if (description !== undefined) todo.description = description?.trim() || null;
    if (completed !== undefined) todo.completed = Boolean(completed);

    await todo.save();

    res.json(todo);
  } catch (error) {
    next(error);
  }
});

// DELETE /todos/:id - delete a todo
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    await todo.destroy();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;