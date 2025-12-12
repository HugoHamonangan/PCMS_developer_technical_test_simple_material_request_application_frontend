'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AddRequestSchema,
  AddRequestType,
  UpdateRequestType,
} from '@/services/requestApi';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

import { Textarea } from '@/components/ui/textarea';

import { Button } from '@/components/ui/button';
import { useRequestsMutations } from '@/hooks/mutation/useRequestsMutation';
import { useRouter } from 'next/navigation';
import { useRequestQuery } from '@/hooks/query/useRequestsQuery';
import { useEffect } from 'react';
import { useUiStore } from '@/stores/uiStore';

type Props = {
  id: number;
};

const EditPage = ({ id }: Props) => {
  const { setOpenEditRequestDrawer } = useUiStore();

  const form = useForm<AddRequestType>({
    resolver: zodResolver(AddRequestSchema),
    defaultValues: {
      project_name: '',
      priority: 'LOW',
      status: 'SUBMITTED',
      notes: '',
    },
  });

  const { updateRequest } = useRequestsMutations();

  const { data } = useRequestQuery(id);

  useEffect(() => {
    if (data) {
      form.reset({
        project_name: data.item.project_name,
        priority: data.item.priority,
        status: data.item.status,
        notes: data.item.notes || '',
      });
    }
  }, [data, id, form]);

  const onSubmit = async (values: UpdateRequestType) => {
    updateRequest.mutate(
      {
        id,
        payload: values,
      },
      {
        onSuccess: () => {
          setOpenEditRequestDrawer(false);
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center h-full max-w-lg mx-auto w-full overflow-y-auto bg-neutral-950 px-4 py-8">
      <div className="w-full max-w-2xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="project_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-normal tracking-widest uppercase text-neutral-400 ">
                    Project Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type project name"
                      {...field}
                      className="bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder:text-neutral-600 text-base font-light py-2 px-4 focus:border-neutral-700 focus:ring-0 transition-colors"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400 mt-2 font-light" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem key={field.value}>
                  <FormLabel className="text-xs font-normal tracking-widest uppercase text-neutral-400 ">
                    Priority Level
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full bg-neutral-900 border border-neutral-800 text-neutral-100 text-base font-light py-2 px-4 focus:border-neutral-700 focus:ring-0 transition-colors">
                        <SelectValue placeholder="Select priority level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-neutral-900 border border-neutral-800">
                      <SelectItem
                        value="LOW"
                        className="text-neutral-100 font-light focus:bg-neutral-800 focus:text-neutral-100"
                      >
                        <span className="text-xs tracking-wider">LOW</span>
                      </SelectItem>
                      <SelectItem
                        value="MEDIUM"
                        className="text-neutral-100 font-light focus:bg-neutral-800 focus:text-neutral-100"
                      >
                        <span className="text-xs tracking-wider">MEDIUM</span>
                      </SelectItem>
                      <SelectItem
                        value="HIGH"
                        className="text-neutral-100 font-light focus:bg-neutral-800 focus:text-neutral-100"
                      >
                        <span className="text-xs tracking-wider">HIGH</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs text-red-400 mt-2 font-light" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-normal tracking-widest uppercase text-neutral-400 ">
                    Additional Notes (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add notes or special requirements"
                      {...field}
                      className="bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder:text-neutral-600 text-base font-light py-4 px-4 min-h-32 focus:border-neutral-700 focus:ring-0 transition-colors resize-none"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400 mt-2 font-light" />
                </FormItem>
              )}
            />

            <div className="pt-6 border-t border-neutral-800">
              <Button
                type="submit"
                variant={'outline'}
                className="w-full font-normal text-sm tracking-widest uppercase py-6 transition-colors duration-200 rounded-lg cursor-pointer"
              >
                Update Material Detail
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditPage;
