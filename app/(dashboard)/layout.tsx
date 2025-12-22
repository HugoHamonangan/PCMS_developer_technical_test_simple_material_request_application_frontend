'use client';

import { Geist } from 'next/font/google';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/custom/AppSidebar';
import { Toaster } from '@/components/ui/sonner';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="w-full flex flex-col  h-[99dvh]">
        <div className="py-3 px-4.5  w-full z-10 ">
          <div className="p-2  w-fit rounded-md cursor-pointer">
            <SidebarTrigger className="cursor-pointer" />
          </div>
        </div>

        {children}
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
