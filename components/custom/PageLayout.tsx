import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="mx-6 h-full flex flex-col gap-4 justify-start min-h-0">
      {children}
    </div>
  );
};

export default PageLayout;
