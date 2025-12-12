import { getCookie } from '@/helper/getCookie.helper';
import api from '../lib/axios';
import { z } from 'zod';

export const GetRequestDetailSchema = z.object({
  id: z.number().int(),
  request_id: z.number().int(),
  material_code: z.string(),
  material_description: z.string(),
  quantity: z.string(),
  unit: z.string(),
  material_type: z.string(),
  specification: z.string(),
  brand: z.string(),
  notes: z.string().optional().default(''),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type GetRequestDetailType = z.infer<typeof GetRequestDetailSchema>;

export const AddRequestDetailSchema = z.object({
  request_id: z.number().int(),
  material_code: z.string().max(100).min(1, 'Material code is required'),
  material_description: z
    .string()
    .max(255)
    .min(1, 'Material description is required'),
  quantity: z.string().min(1, 'Quantity is required'),
  unit: z.string().max(50).min(1, 'Unit is required'),
  material_type: z.string().max(50).min(1, 'Material type is required'),
  specification: z.string().max(255).optional(),
  brand: z.string().max(100).optional(),
  notes: z.string().optional(),
});

export type AddRequestDetailType = z.infer<typeof AddRequestDetailSchema>;

export const UpdateRequestDetailSchema = z.object({
  request_id: z.number().int(),
  material_code: z.string().max(100).min(1, 'Material code is required'),
  material_description: z
    .string()
    .max(255)
    .min(1, 'Material description is required'),
  quantity: z.string().min(1, 'Quantity is required'),
  unit: z.string().max(50).min(1, 'Unit is required'),
  material_type: z.string().max(50).min(1, 'Material type is required'),
  specification: z.string().max(255).optional(),
  brand: z.string().max(100).optional(),
  notes: z.string().optional(),
});

export type UpdateRequestDetailType = z.infer<typeof UpdateRequestDetailSchema>;

export const requestDetailApi = {
  getRequestsDetails: async (
    q: string,
    skip: number,
    take: number,
    id: number
  ) => {
    const token = getCookie('accessToken');
    const res = await api.get(`/material-details/request/${id}`, {
      params: { skip, take, q },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  getRequestDetail: async (id: number | undefined) => {
    const token = getCookie('accessToken');
    const res = await api.get(`/material-details/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  addRequestDetail: async (payload: AddRequestDetailType) => {
    const token = getCookie('accessToken');
    const res = await api.post('/material-details', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  updateRequestDetail: async (id: number, payload: UpdateRequestDetailType) => {
    const token = getCookie('accessToken');
    const res = await api.put(`/material-details/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  deleteRequestDetail: async (id: number) => {
    const token = getCookie('accessToken');
    const res = await api.delete(`/material-details/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
};
