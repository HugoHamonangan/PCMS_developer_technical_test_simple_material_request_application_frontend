import { loginInterface } from '@/interfaces/login.interface';
import api from '../lib/axios';
import z from 'zod';

export const authApi = {
  login: async (payload: loginInterface) => {
    const res = await api.post('/auth/login', payload);
    return res.data;
  },
};
