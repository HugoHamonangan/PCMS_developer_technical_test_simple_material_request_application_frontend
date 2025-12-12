import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AddRequestType,
  requestApi,
  UpdateRequestType,
} from '../../services/requestApi';
import { toast } from 'sonner';
import {
  AddRequestDetailType,
  requestDetailApi,
  UpdateRequestDetailType,
} from '@/services/requestDetailApi';

export function useRequestDetailMutations() {
  const queryClient = useQueryClient();

  const addRequestDetail = useMutation({
    mutationFn: (payload: AddRequestDetailType) =>
      requestDetailApi.addRequestDetail(payload),
    onSuccess: (data) => {
      toast.success(data.status);
      queryClient.invalidateQueries({ queryKey: ['requestDetail'] });
    },
  });

  const updateRequestDetail = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateRequestDetailType;
    }) => requestDetailApi.updateRequestDetail(id, payload),
    onSuccess: (data) => {
      toast.success(data.status);
      queryClient.invalidateQueries({ queryKey: ['requestDetail'] });
    },
  });

  const deleteRequestDetail = useMutation({
    mutationFn: (id: number) => requestDetailApi.deleteRequestDetail(id),
    onSuccess: (data) => {
      toast.success(data.status);
      queryClient.invalidateQueries({ queryKey: ['requestDetail'] });
    },
  });

  return { addRequestDetail, updateRequestDetail, deleteRequestDetail };
}
