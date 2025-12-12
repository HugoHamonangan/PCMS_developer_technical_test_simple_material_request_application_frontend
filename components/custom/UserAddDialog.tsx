'use client';

import { useState, useCallback } from 'react';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useUserStore } from '@/stores/userStore';
import { useUserMutations } from '@/hooks/mutation/useUsersMutation';

const UserSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid email format.'),
  password: z.string().min(6, 'Password must be 6+ characters.'),
});

export type UserFormData = z.infer<typeof UserSchema>;

type FieldKeys = keyof UserFormData;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UserAddDialog({ open, onOpenChange }: Props) {
  const [formData, setFormData] = useState<Partial<UserFormData>>({
    name: '',
    email: '',
    password: '',
  });

  const { addUser } = useUserMutations();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: '' }));
    },
    []
  );

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '' });
    setErrors({});
    setGlobalError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setGlobalError(null);

    const result = UserSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<FieldKeys, string>> = {};
      result.error.issues.forEach((i) => {
        const key = i.path[0];
        if (typeof key === 'string' && key in UserSchema.shape) {
          fieldErrors[key as FieldKeys] = i.message;
        }
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    addUser.mutate(result.data, {
      onSuccess: () => {
        resetForm();
        setLoading(false);
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Global Error Alert */}
          {globalError && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800">
              <div className="shrink-0 w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mt-0.5">
                <svg
                  className="w-3 h-3 text-red-600 dark:text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-sm text-red-700 dark:text-red-400 font-medium flex-1">
                {globalError}
              </p>
            </div>
          )}

          {/* Name Field */}
          <div className="space-y-1">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full Name
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <Input
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="Enter full name"
                className={`
          pl-10 transition-all duration-200
          ${
            errors.name
              ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'focus:ring-blue-500 focus:border-blue-500'
          }
          ${loading ? 'opacity-60 cursor-not-allowed' : ''}
        `}
              />
              {errors.name && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            {errors.name && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.name}
                </p>
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="email@example.com"
                className={`
          pl-10 transition-all duration-200
          ${
            errors.email
              ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'focus:ring-blue-500 focus:border-blue-500'
          }
          ${loading ? 'opacity-60 cursor-not-allowed' : ''}
        `}
              />
              {errors.email && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            {errors.email && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.email}
                </p>
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password || ''}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="Create a secure password"
                className={`
          pl-10 transition-all duration-200
          ${
            errors.password
              ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'focus:ring-blue-500 focus:border-blue-500'
          }
          ${loading ? 'opacity-60 cursor-not-allowed' : ''}
        `}
              />
              {errors.password && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            {errors.password && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.password}
                </p>
              </div>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
              Password must be at least 8 characters long
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full h-10 text-base font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Save User</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
