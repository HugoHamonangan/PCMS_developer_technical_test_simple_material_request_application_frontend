import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AddRequestType,
  requestApi,
  UpdateRequestType,
} from '../../services/requestApi';
import { toast } from 'sonner';

export function useRequestsMutations() {
  const queryClient = useQueryClient();

  const addRequest = useMutation({
    mutationFn: (payload: AddRequestType) => requestApi.addRequest(payload),
    onSuccess: (data) => {
      toast.success(data.status);
      queryClient.invalidateQueries({ queryKey: ['request'] });
    },
  });

  const updateRequest = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateRequestType }) =>
      requestApi.updateRequest(id, payload),
    onSuccess: (data) => {
      toast.success(data.status);
      queryClient.invalidateQueries({ queryKey: ['request'] });
    },
  });

  const updateRequestApproval = useMutation({
    mutationFn: ({ id }: { id: number }) =>
      requestApi.updateRequestApproval(id),
    onSuccess: (data) => {
      toast.success(data.status);
      queryClient.invalidateQueries({ queryKey: ['request'] });
    },
  });

  const updateRequestRejection = useMutation({
    mutationFn: ({ id }: { id: number }) =>
      requestApi.updateRequestRejection(id),
    onSuccess: (data) => {
      toast.success(data.status);
      queryClient.invalidateQueries({ queryKey: ['request'] });
    },
  });

  const deleteRequest = useMutation({
    mutationFn: (id: number) => requestApi.deleteRequest(id),
    onSuccess: (data) => {
      toast.success(data.status);
      queryClient.invalidateQueries({ queryKey: ['request'] });
    },
  });

  return {
    addRequest,
    updateRequest,
    deleteRequest,
    updateRequestApproval,
    updateRequestRejection,
  };
}
