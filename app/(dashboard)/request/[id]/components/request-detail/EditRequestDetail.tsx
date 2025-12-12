import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRequestDetailMutations } from '@/hooks/mutation/useRequestDetailMutation';
import {
  UpdateRequestDetailSchema,
  UpdateRequestDetailType,
} from '@/services/requestDetailApi';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Loader2, PlusIcon } from 'lucide-react';
import { useUiStore } from '@/stores/uiStore';
import { useEffect } from 'react';
import { useRequestDetailQuery } from '@/hooks/query/useRequestsDetailQuery';

type Props = {
  id: number;
};

const EditRequestDetail = ({ id }: Props) => {
  const { setOpenEditRequestDetailDrawer } = useUiStore();

  const form = useForm<UpdateRequestDetailType>({
    resolver: zodResolver(UpdateRequestDetailSchema),
    defaultValues: {
      request_id: 0,
      material_code: '',
      material_description: '',
      quantity: '1',
      unit: '',
      material_type: '',
      specification: '',
      brand: '',
      notes: '',
    },
  });

  const { data, isLoading, error } = useRequestDetailQuery(id);
  const { updateRequestDetail } = useRequestDetailMutations();

  useEffect(() => {
    if (data) {
      form.reset({
        request_id: data.item.request_id,
        material_code: data.item.material_code,
        material_description: data.item.material_description,
        quantity: data.item.quantity,
        unit: data.item.unit,
        material_type: data.item.material_type,
        specification: data.item.specification || '',
        brand: data.item.brand || '',
        notes: data.item.notes || '',
      });
    }
  }, [data, form]);

  const onSubmit = async (values: UpdateRequestDetailType) => {
    updateRequestDetail.mutate(
      { id, payload: values },
      {
        onSuccess: () => {
          setOpenEditRequestDetailDrawer(false);
        },
      }
    );
  };

  return (
    <div className="max-w-2xl w-full mx-auto my-6 pb-4 px-4 h-full overflow-y-auto">
      {isLoading ? (
        <div className="flex items-center justify-center h-full text-white text-xl font-medium">
          <Loader2 className="size-14 animate-spin text-neutral-300" />
        </div>
      ) : error ? (
        <div className="text-red-400">Error: {String(error)}</div>
      ) : !data?.item ? (
        <div className="text-neutral-400">No data found</div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="material_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-neutral-400">
                    Material Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter material code"
                      {...field}
                      className="bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder:text-neutral-600"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="material_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-neutral-400">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter material description"
                      {...field}
                      className="bg-neutral-900 border border-neutral-800 text-neutral-100 min-h-24"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-neutral-400">
                    Quantity
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      className="bg-neutral-900 border border-neutral-800 text-neutral-100"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-neutral-400">
                    Unit
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="pcs, box, kg..."
                      {...field}
                      className="bg-neutral-900 border border-neutral-800 text-neutral-100 uppercase"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="material_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-neutral-400">
                    Material Type
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Electrical, Mechanical..."
                      {...field}
                      className="bg-neutral-900 border border-neutral-800 text-neutral-100"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-neutral-400">
                    Technical Specification (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Optional technical details"
                      {...field}
                      className="bg-neutral-900 border border-neutral-800 text-neutral-100 min-h-24"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-neutral-400">
                    Brand (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Brand name"
                      {...field}
                      className="bg-neutral-900 border border-neutral-800 text-neutral-100"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-neutral-400">
                    Notes (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Additional notes"
                      {...field}
                      className="bg-neutral-900 border border-neutral-800 text-neutral-100 min-h-16"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            <div className="pt-6 border-t border-neutral-800">
              <Button
                type="submit"
                variant="outline"
                className="w-full text-sm uppercase cursor-pointer tracking-widest py-6"
                disabled={updateRequestDetail.isPending}
              >
                {updateRequestDetail.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <PlusIcon />
                    Update Material Detail
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default EditRequestDetail;
