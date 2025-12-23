'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, AlertCircle, Sparkles } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLoginMutations } from '@/hooks/mutation/useAuthMutation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const LoginFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof LoginFormSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string>('');

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { login } = useLoginMutations();

  const onSubmit = async (values: LoginFormValues) => {
    setError('');

    login.mutate(values, {
      onSuccess: () => {
        router.push('/dashboard');
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-background border-none rounded-xl shadow-2xl py-8">
        <CardHeader className="pt-8 pb-4">
          <div className="text-center text-blue-400">
            <Sparkles className="mx-auto h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-extrabold tracking-tight text-white text-center">
            Login to Your Account
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Material Request Simple Application
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="yourname@example.com"
                        {...field}
                        className="bg-gray-700 border placeholder:text-gray-500 "
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-gray-300">Password</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        className="bg-gray-700 border placeholder:text-gray-500 "
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {error && (
                <Alert
                  variant="destructive"
                  className="py-2 bg-red-900/30 border-red-500 text-red-300"
                >
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertTitle className="text-red-400">
                    Authentication Failed
                  </AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full font-bold py-6 mt-2 cursor-pointer bg-blue-800 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
                disabled={login.isPending}
              >
                {login.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
