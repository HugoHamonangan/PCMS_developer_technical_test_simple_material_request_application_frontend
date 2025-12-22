'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { AddRequestSchema, AddRequestType } from '@/services/requestApi';
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

const AddRequestPage = () => {
  const router = useRouter();
  const form = useForm<AddRequestType>({
    resolver: zodResolver(AddRequestSchema),
    defaultValues: {
      project_name: '',
      priority: 'LOW',
      status: 'SUBMITTED',
      notes: '',
    },
  });

  const { addRequest } = useRequestsMutations();

  const onSubmit = async (values: AddRequestType) => {
    addRequest.mutate(values, {
      onSuccess: (data) => {
        if (data.item) router.push(`/request/${data.item.id}`);
      },
    });
  };

  return (
    <div className="flex items-center justify-center  px-4 py-8">
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-8  pb-6">
          <h1 className="text-3xl font-light tracking-tight  mb-2">
            New Request
          </h1>
          <p className="text-sm font-normal text-neutral-500 tracking-wide uppercase">
            Material Request Form
          </p>
        </div>

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
                      className=" border  placeholder:text-neutral-600 text-base font-light py-2 px-4 focus:border-neutral-700 focus:ring-0 transition-colors"
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
                <FormItem>
                  <FormLabel className="text-xs font-normal tracking-widest uppercase text-neutral-400 ">
                    Priority Level
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full  border  text-base font-light py-2 px-4 focus:border-neutral-700 focus:ring-0 transition-colors">
                        <SelectValue placeholder="Select priority level" />
                      </SelectTrigger>
                      <SelectContent className=" border">
                        <SelectItem value="LOW" className=" font-light ">
                          <span className="text-xs tracking-wider">LOW</span>
                        </SelectItem>
                        <SelectItem value="MEDIUM" className=" font-light ">
                          <span className="text-xs tracking-wider">MEDIUM</span>
                        </SelectItem>
                        <SelectItem value="HIGH" className=" font-light ">
                          <span className="text-xs tracking-wider">HIGH</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
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
                      className=" border  placeholder:text-neutral-600 text-base font-light py-4 px-4 min-h-32 focus:border-neutral-700 focus:ring-0 transition-colors resize-none"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400 mt-2 font-light" />
                </FormItem>
              )}
            />

            <div className="pt-6 border-t">
              <Button
                type="submit"
                variant={'outline'}
                className="w-full font-normal text-sm tracking-widest uppercase py-6 transition-colors duration-200 rounded-lg cursor-pointer"
              >
                Create Material Detail
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddRequestPage;
