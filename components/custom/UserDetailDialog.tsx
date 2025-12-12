'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Mail, User, Hash } from 'lucide-react';

export default function UserDetailDialog({ open, onOpenChange, data }: any) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        {data ? (
          <div className="space-y-2 pt-2">
            {/* Avatar Section */}
            <div className="flex flex-col items-center pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-3 shadow-lg">
                <span className="text-white font-bold text-3xl">
                  {data.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {data.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Registered User
              </p>
            </div>

            {/* Information Grid */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <div className="shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Hash className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    User ID
                  </p>
                  <p className="text-sm font-mono text-gray-900 dark:text-white break-all">
                    {data.id}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <div className="shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Full Name
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {data.name}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <div className="shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Email Address
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white break-all">
                    {data.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">
              Loading user details...
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
