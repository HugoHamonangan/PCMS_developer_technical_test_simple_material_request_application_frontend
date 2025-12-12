import { useQuery } from '@tanstack/react-query';
import { requestApi } from '@/services/requestApi';
import { id } from 'zod/v4/locales';

export function useRequestsQuery(q: string, skip: number, take: number) {
  return useQuery({
    queryKey: ['request', q, skip, take],
    queryFn: () => requestApi.getRequests(q, skip, take),
    staleTime: 1000 * 30,
  });
}

export function useRequestQuery(id: number | undefined) {
  return useQuery({
    queryKey: ['request', id],
    queryFn: () => requestApi.getRequest(id),
    staleTime: 1000 * 30,
  });
}
