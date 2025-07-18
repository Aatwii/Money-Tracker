export interface User {
  id: string;
  email: string;
  password: string;
}

export interface Expense {
  id: string;
  userId: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
}

// In-memory storage (replace with database later)
export const users: User[] = [];
export const expenses: Expense[] = [];

export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

export const findUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const createUser = (user: User): User => {
  users.push(user);
  return user;
};

export const createExpense = (expense: Expense): Expense => {
  expenses.push(expense);
  return expense;
};

export const getExpensesByUserId = (userId: string): Expense[] => {
  return expenses.filter(expense => expense.userId === userId);
};
