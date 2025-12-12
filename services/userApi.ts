import api from '../lib/axios';

export const userApi = {
  getUsers: async (search: string, page: number, limit: number) => {
    const res = await api.get('/user', {
      params: { search, page, limit },
    });
    return res.data;
  },

  addUser: async (payload: any) => {
    const res = await api.post('/user', payload);
    return res.data;
  },

  updateUser: async (id: number, payload: any) => {
    const res = await api.put(`/user/${id}`, payload);
    return res.data;
  },

  deleteUser: async (id: number) => {
    const res = await api.delete(`/user/${id}`);
    return res.data;
  },
};
