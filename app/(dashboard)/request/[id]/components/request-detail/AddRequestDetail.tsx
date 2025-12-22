import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRequestDetailMutations } from '@/hooks/mutation/useRequestDetailMutation';

import {
  AddRequestDetailSchema,
  AddRequestDetailType,
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
import { PlusIcon } from 'lucide-react';
import { useUiStore } from '@/stores/uiStore';
import { useRequestsDetailQuery } from '@/hooks/query/useRequestsDetailQuery';

type Props = {
  id: number;
};

const AddRequestDetail = ({ id }: Props) => {
  const { setOpenAddRequestDetailDrawer } = useUiStore();

  const form = useForm<AddRequestDetailType>({
    resolver: zodResolver(AddRequestDetailSchema),
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

  const { addRequestDetail } = useRequestDetailMutations();

  const onSubmit = async (values: AddRequestDetailType) => {
    values.request_id = id;
    addRequestDetail.mutate(values, {
      onSuccess: () => {
        setOpenAddRequestDetailDrawer(false);
      },
    });
  };

  return (
    <div className="max-w-2xl w-full mx-auto my-6 pb-4 px-4 h-full overflow-y-auto">
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
                    className=" placeholder:text-neutral-600"
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
                    className=" min-h-24"
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
                    className=""
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
                    className=" uppercase"
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
                    className=""
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
                    className=" min-h-24"
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
                  <Input placeholder="Brand name" {...field} className="" />
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
                    className=" min-h-16"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-400" />
              </FormItem>
            )}
          />

          <div className="pt-6 border-t">
            <Button
              type="submit"
              variant="outline"
              className="w-full text-sm uppercase cursor-pointer tracking-widest py-6"
            >
              <PlusIcon />
              Create Material Detail
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddRequestDetail;
