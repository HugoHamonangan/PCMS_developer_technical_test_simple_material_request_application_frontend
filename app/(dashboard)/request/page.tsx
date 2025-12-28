/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import RequestTable from './components/RequestTable';
import { redirect } from 'next/navigation';

import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';
import RequestHeader from './components/RequestHeader';

const Page = () => {
  const [searchValue, setSearchValue] = useState('');
  const [query, setQuery] = useState('');
  const [pageSize, setPageSize] = useState('10');
  const [page, setPage] = useState(0);

  const onNavigateToAddRequest = () => {
    redirect('/request/add');
  };

  const handleSearch = useCallback(
    debounce((value: string) => {
      setQuery(value);
      setPage(0);
    }, 200),
    []
  );

  const onChange = (value: string) => {
    setSearchValue(value);
    handleSearch(value);
  };

  return (
    <div className=" flex flex-col h-full gap-2 p-2 mx-auto w-full min-h-0">
      <RequestHeader
        searchValue={searchValue}
        onSearchChange={onChange}
        onNavigateToAddRequest={onNavigateToAddRequest}
      />

      <RequestTable
        search={query}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(v) => {
          setPageSize(v);
          setPage(0);
        }}
      />
    </div>
  );
};

export default Page;
