/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import RequestTable from './components/RequestTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';

const Page = () => {
  const [searchValue, setSearchValue] = useState('');
  const [query, setQuery] = useState('');

  const onNavigateToAddRequest = () => {
    redirect('/request/add');
  };

  const handleSearch = useCallback(
    debounce((value: string) => {
      setQuery(value);
    }, 200),
    []
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchValue(value);
    handleSearch(value);
  };

  return (
    <div className=" flex flex-col h-full gap-4 p-2  mx-auto w-full min-h-0">
      <div className=" py-2 px-6 ">
        <div className="flex flex-col gap-4 items-baseline justify-between md:flex-row mb-6">
          <h1 className="text-3xl font-light tracking-tight ">
            Material Request List
          </h1>
          <div className="flex gap-2 items-center flex-wrap">
            <Input
              placeholder="Search requests..."
              onChange={onChange}
              value={searchValue}
              className=" border w-fit min-w-60  placeholder:text-neutral-600 text-base font-light py-2 px-4"
            />
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={onNavigateToAddRequest}
            >
              <PlusIcon />
              Add Request
            </Button>
          </div>
        </div>
      </div>

      <RequestTable search={query} />
    </div>
  );
};

export default Page;
