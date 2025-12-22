'use client';

/* eslint-disable react-hooks/rules-of-hooks */
import { useRequestsQuery } from '@/hooks/query/useRequestsQuery';
import { GetRequestType } from '@/services/requestApi';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import moment from 'moment-timezone';
import { useRouter } from 'next/navigation';

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
      <div className="w-full min-w-160  overflow-y-auto">
        <div className="grid grid-cols-5 border-b ">
          {header.map((head) => (
            <div
              key={head}
              className="py-4 px-6 text-left text-xs font-normal tracking-widest uppercase "
            >
              {head}
            </div>
          ))}
        </div>

        <div>
          {data?.items.map((request: GetRequestType, i: number) => (
            <div
              key={request.id}
              onClick={() => handleRequestClick(request.id)}
              className="grid grid-cols-5 hover:bg-primary-foreground duration-50 cursor-pointer"
            >
              <div className="py-5 px-6 text-sm font-light ">
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="py-5 px-6 text-base font-light">
                {moment(request.request_date)
                  .tz('Asia/Jakarta')
                  .format('DD MMM YYYY')}
              </div>

              <div className="py-5 px-6 text-sm font-light tracking-wide">
                {request.request_code}
              </div>

              <div className="py-5 px-6 text-base font-light">
                {request.project_name}
              </div>

              <div className="py-5 px-6">
                <div className="text-xs px-3 py-1.5 rounded-sm flex items-center gap-2 w-fit">
                  <span
                    className={`size-2 rounded-full ${
                      request.status === 'SUBMITTED'
                        ? 'bg-green-700'
                        : request.status === 'APPROVED'
                        ? 'bg-blue-700'
                        : request.status === 'REJECTED'
                        ? 'bg-red-700'
                        : 'bg-neutral-700'
                    }`}
                  />
                  {request.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default requestTable;
