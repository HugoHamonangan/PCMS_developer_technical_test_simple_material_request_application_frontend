'use client';

import { useRequestsQuery } from '@/hooks/query/useRequestsQuery';
import { GetRequestType } from '@/services/requestApi';

import moment from 'moment-timezone';
import { useRouter } from 'next/navigation';

import { Column, DataTable } from '@/components/custom/DataTable';
import { PageSizeSelect } from '@/components/custom/PageSizeSelect';
import { PaginationBar } from '@/components/custom/PaginationBar';
import { ListFooter } from '@/components/custom/ListFooter';
import PageLayout from '@/components/custom/PageLayout';
import { useMemo } from 'react';

interface RequestTableProps {
  search: string;
  page: number;
  pageSize: string;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: string) => void;
}

const RequestTable = ({
  search,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: RequestTableProps) => {
  const router = useRouter();

  const offset = +pageSize * page;

  const { data, isLoading } = useRequestsQuery(search, offset, +pageSize);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(data?.count / +pageSize)),
    [data?.count, pageSize]
  );

  const handleRequestClick = (id: number) => {
    router.push(`/request/${id}`);
  };

  const requestColumns: Column<GetRequestType>[] = [
    {
      key: 'no',
      header: 'No',
      render: (_, i) => i + 1,
    },
    {
      key: 'request_date',
      header: 'Request Date',
      render: (row) =>
        moment(row.request_date).tz('Asia/Jakarta').format('DD MMM YYYY'),
    },
    {
      key: 'request_code',
      header: 'Code',
    },
    {
      key: 'project_name',
      header: 'Project Name',
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <div className="flex items-center gap-2">
          <span
            className={`size-2 rounded-full ${
              row.status === 'SUBMITTED'
                ? 'bg-green-700'
                : row.status === 'APPROVED'
                ? 'bg-blue-700'
                : row.status === 'REJECTED'
                ? 'bg-red-700'
                : 'bg-neutral-700'
            }`}
          />
          {row.status}
        </div>
      ),
    },
  ];

  return (
    <PageLayout>
      <DataTable
        columns={requestColumns}
        data={data?.items}
        isLoading={isLoading}
        onRowClick={(row) => handleRequestClick(row.id)}
      />

      <ListFooter>
        <PageSizeSelect value={pageSize} onChange={onPageSizeChange} />
        <PaginationBar
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </ListFooter>
    </PageLayout>
  );
};

export default RequestTable;
