'use client';

import { useAuthStore } from '@/stores/authStore';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const { setUser } = useAuthStore();
  const [client] = useState(() => new QueryClient());

  useEffect(() => {
    const userStorage = localStorage.getItem('userStorage');
    if (userStorage) {
      const parsedData = JSON.parse(userStorage);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(parsedData?.state.user);
    }
  }, []);
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
