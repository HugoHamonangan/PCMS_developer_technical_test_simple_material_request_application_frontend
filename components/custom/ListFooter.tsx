import { ReactNode } from 'react';

export const ListFooter = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-between gap-2 sm:flex-row flex-col">
      {children}
    </div>
  );
};
