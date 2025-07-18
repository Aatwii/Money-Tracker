import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/api';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  return response.data;
};

export const register = async (data: RegisterData) => {
  const response = await axios.post(`${API_URL}/auth/register`, data);
  return response.data;
};
