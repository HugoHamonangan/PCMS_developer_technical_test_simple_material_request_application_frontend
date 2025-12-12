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
    <div className=" bg-neutral-950 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="border-b border-neutral-800  ">
          <div className="flex flex-col gap-4 items-baseline justify-between md:flex-row mb-6">
            <h1 className="text-3xl font-light tracking-tight text-neutral-100">
              Material Request List
            </h1>
            <div className="flex gap-2 items-center flex-wrap">
              <Input
                placeholder="Search requests..."
                onChange={onChange}
                value={searchValue}
                className="bg-neutral-900 border w-fit min-w-60 border-neutral-800 text-neutral-100 placeholder:text-neutral-600 text-base font-light py-2 px-4"
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

        <div className="w-full overflow-x-auto">
          <RequestTable search={query} />
        </div>
      </div>
    </div>
  );
};

export default Page;
