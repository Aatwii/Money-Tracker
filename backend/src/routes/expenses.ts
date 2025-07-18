import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { authenticateToken } from '../middleware/auth';
import { createExpense, getExpensesByUserId } from '../data/storage';

const router = express.Router();

// Get all expenses for user
router.get('/', authenticateToken, (req: any, res) => {
  try {
    const expenses = getExpensesByUserId(req.user.id);
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create expense
router.post('/', authenticateToken, (req: any, res) => {
  try {
    const { amount, category, description, date } = req.body;

    if (!amount || !category || !date) {
      return res.status(400).json({ error: 'Amount, category, and date are required' });
    }

    const expense = createExpense({
      id: uuidv4(),
      userId: req.user.id,
      amount: parseFloat(amount),
      category,
      description: description || '',
      date,
      createdAt: new Date().toISOString()
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
