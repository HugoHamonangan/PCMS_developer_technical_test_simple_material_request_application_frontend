import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/services/userApi';
import { toast } from 'sonner';

export function useUserMutations() {
  const queryClient = useQueryClient();

  const addUser = useMutation({
    mutationFn: (payload: any) => userApi.addUser(payload),
    onSuccess: () => {
      toast.success('User added');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const updateUser = useMutation({
    mutationFn: ({ id, payload }: any) => userApi.updateUser(id, payload),
    onSuccess: () => {
      toast.success('User updated');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const deleteUser = useMutation({
    mutationFn: (id: number) => userApi.deleteUser(id),
    onSuccess: () => {
      toast.success('User deleted');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return { addUser, updateUser, deleteUser };
}
