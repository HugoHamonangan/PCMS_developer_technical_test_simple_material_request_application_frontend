'use client';

/* eslint-disable react-hooks/rules-of-hooks */
import { useRequestsQuery } from '@/hooks/query/useRequestsQuery';
import { GetRequestType } from '@/services/requestApi';
import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment-timezone';
import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

interface RequestTableProps {
  search: string;
}

const requestTable = ({ search }: RequestTableProps) => {
  const router = useRouter();

  const header = ['No', 'Request Date', 'Code', 'Project Name', 'Status'];

  const { data } = useRequestsQuery(search, 0, 99);

  const handleRequestClick = (id: number) => {
    router.push(`/request/${id}`);
  };

  return (
    <>
      <table className="w-full border-collapse bg-neutral-950 text-neutral-100 min-w-160">
        <thead>
          <tr className="border-b border-neutral-800">
            {header.map((head) => (
              <th
                key={head}
                className="py-4 px-6 text-left text-xs font-normal tracking-widest uppercase text-neutral-400"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.items.map((request: GetRequestType, i: number) => (
            <tr
              key={request.id}
              onClick={() => handleRequestClick(request.id)}
              className="border-b border-neutral-900 hover:bg-neutral-900 transition-colors duration-50 cursor-pointer"
            >
              <td className="py-5 px-6 text-sm font-light text-neutral-400">
                {String(i + 1).padStart(2, '0')}
              </td>
              <td className="py-5 px-6 text-base font-light">
                {moment(request.request_date)
                  .tz('Asia/Jakarta')
                  .format('DD MMM YYYY')}
              </td>
              <td className="py-5 px-6 text-sm font-light tracking-wide">
                {request.request_code}
              </td>
              <td className="py-5 px-6 text-base font-light">
                {request.project_name}
              </td>
              <td className="py-5 px-6">
                <div
                  className={
                    'text-xs text-neutral-400 bg-neutral-800 px-3 py-1.5 rounded-sm flex items-center gap-2 w-fit '
                  }
                >
                  <span
                    className={`text-xs size-2 rounded-full ${
                      request.status === 'SUBMITTED'
                        ? 'bg-green-700 text-white shadow-green-100'
                        : request.status === 'APPROVED'
                        ? 'bg-blue-700 text-white shadow-blue-100'
                        : request.status === 'REJECTED'
                        ? 'bg-red-700 text-white shadow-red-100'
                        : 'bg-neutral-800 text-neutral-400 shadow-neutral-700'
                    }`}
                  ></span>

                  {request.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default requestTable;
