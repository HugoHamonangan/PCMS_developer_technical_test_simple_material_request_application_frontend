import { getCookie } from '@/helper/getCookie.helper';
import api from '../lib/axios';
import { z } from 'zod';

export const GetRequestSchema = z.object({
  id: z.number().int(),
  requested_by_id: z.number().int(),
  department_id: z.number().int(),
  request_code: z.string(),
  project_name: z.string().max(150),
  request_date: z.string().datetime(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  status: z.enum(['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED']),
  notes: z.string().optional().default(''),
  approved_by_id: z.number().int().nullable().optional(),
  approved_at: z.string().datetime().nullable().optional(),
  rejected_by_id: z.number().int().nullable().optional(),
  rejected_at: z.string().datetime().nullable().optional(),

  department: z.object({
    id: z.number().int(),
    name: z.string(),
  }),
  request_by: z
    .object({
      id: z.number().int(),
      name: z.string(),
      email: z.string().email(),
    })
    .optional(),
  approved_by: z
    .object({
      id: z.number().int(),
      name: z.string(),
      email: z.string().email(),
    })
    .optional(),
  rejected_by: z
    .object({
      id: z.number().int(),
      name: z.string(),
      email: z.string().email(),
    })
    .optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type GetRequestType = z.infer<typeof GetRequestSchema>;

export const AddRequestSchema = z.object({
  project_name: z.string().max(150).min(1, 'Project name is required'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  status: z.enum(['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED']),
  notes: z.string().optional(),
});

export type AddRequestType = z.infer<typeof AddRequestSchema>;

export const updateRequestSchema = z.object({
  project_name: z.string().max(150).min(1, 'Project name is required'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  status: z.enum(['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED']),
  notes: z.string().optional(),
});

export type UpdateRequestType = z.infer<typeof updateRequestSchema>;

export const requestApi = {
  getRequests: async (q: string, skip: number, take: number) => {
    const token = getCookie('accessToken');
    const res = await api.get('/requests', {
      params: { skip, take, q },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  getRequest: async (id: number | undefined) => {
    const token = getCookie('accessToken');
    const res = await api.get(`/requests/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  addRequest: async (payload: AddRequestType) => {
    const token = getCookie('accessToken');
    const res = await api.post('/requests', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  },

  updateRequest: async (id: number, payload: UpdateRequestType) => {
    const token = getCookie('accessToken');
    const res = await api.put(`/requests/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  updateRequestApproval: async (id: number) => {
    const token = getCookie('accessToken');
    const res = await api.put(
      `/requests/${id}/approve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  },

  updateRequestRejection: async (id: number) => {
    const token = getCookie('accessToken');
    const res = await api.put(
      `/requests/${id}/reject`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  },

  deleteRequest: async (id: number) => {
    const token = getCookie('accessToken');
    const res = await api.delete(`/requests/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
};
