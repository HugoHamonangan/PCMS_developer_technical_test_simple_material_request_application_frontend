/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useAuthStore } from '@/stores/authStore';
import { User } from '@/stores/userStore';
import { useEffect, useState } from 'react';

const Page = () => {
  const { user } = useAuthStore();

  return (
    <div className=" bg-neutral-950 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 border-b border-neutral-800 pb-8">
          <div className="flex flex-col mb-2">
            <h1 className="text-3xl font-light tracking-tight text-neutral-100">
              Simple Material Request Application Professional Test Case
            </h1>
            <br />
            <span className="text-neutral-500 text-sm">
              PCMS Developer Technical Test
            </span>
            <span className="text-neutral-500 text-sm">
              Participant: Hugo Hamonangan
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span>Hello {user?.email}</span>
          <span>Role: {user?.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
