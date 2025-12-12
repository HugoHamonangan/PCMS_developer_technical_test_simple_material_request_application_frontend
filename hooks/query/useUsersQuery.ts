import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/services/userApi';

export function useUsersQuery(search: string, page: number, limit: number) {
  return useQuery({
    queryKey: ['users', search, page, limit],
    queryFn: () => userApi.getUsers(search, page, limit),
    staleTime: 1000 * 30,
  });
}
