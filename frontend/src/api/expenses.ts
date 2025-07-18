import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/api';

export interface Expense {
  id: string;
  userId: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
}

export interface CreateExpenseData {
  amount: number;
  category: string;
  description: string;
  date: string;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const getExpenses = async (): Promise<Expense[]> => {
  const response = await axios.get(`${API_URL}/expenses`, getAuthHeaders());
  return response.data;
};

export const createExpense = async (data: CreateExpenseData): Promise<Expense> => {
  const response = await axios.post(`${API_URL}/expenses`, data, getAuthHeaders());
  return response.data;
};
