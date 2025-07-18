import React, { useState, useEffect } from 'react';
import { getExpenses, createExpense, Expense } from '../api/expenses';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form state
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const categories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Other'];

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const newExpense = await createExpense({
        amount: parseFloat(amount),
        category,
        description,
        date
      });

      setExpenses([newExpense, ...expenses]);
      
      // Reset form
      setAmount('');
      setCategory('');
      setDescription('');
      setDate(new Date().toISOString().split('T')[0]);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add expense');
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Finance Tracker</h1>
        <button onClick={onLogout} style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}

      {/* Add Expense Form */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3>Add New Expense</h3>
        <form onSubmit={handleAddExpense}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label>Amount ($):</label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label>Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          
          <button 
            type="submit"
            style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            Add Expense
          </button>
        </form>
      </div>

      {/* Expenses Summary */}
      <div style={{ backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3>Total Expenses: ${totalExpenses.toFixed(2)}</h3>
        <p>Total transactions: {expenses.length}</p>
      </div>

      {/* Expenses List */}
      <div>
        <h3>Recent Expenses</h3>
        {expenses.length === 0 ? (
          <p>No expenses yet. Add your first expense above!</p>
        ) : (
          <div style={{ display: 'grid', gap: '10px' }}>
            {expenses.map(expense => (
              <div key={expense.id} style={{ 
                border: '1px solid #ddd', 
                padding: '15px', 
                borderRadius: '8px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                alignItems: 'center'
              }}>
                <div><strong>${expense.amount.toFixed(2)}</strong></div>
                <div>{expense.category}</div>
                <div>{expense.date}</div>
                <div style={{ fontSize: '0.9em', color: '#666' }}>{expense.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
