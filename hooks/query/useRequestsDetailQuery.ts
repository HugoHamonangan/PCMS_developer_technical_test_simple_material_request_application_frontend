import { useQuery } from '@tanstack/react-query';
import { requestDetailApi } from '@/services/requestDetailApi';

export function useRequestsDetailQuery(
  q: string,
  skip: number,
  take: number,
  id: number
) {
  return useQuery({
    queryKey: ['requestDetail', q, skip, take, id],
    queryFn: () => requestDetailApi.getRequestsDetails(q, skip, take, id),
    staleTime: 1000 * 30,
  });
}

export function useRequestDetailQuery(id: number | undefined) {
  return useQuery({
    queryKey: ['requestDetail', id],
    queryFn: () => requestDetailApi.getRequestDetail(id),
    staleTime: 1000 * 30,
  });
}
