'use client';

/* eslint-disable react-hooks/rules-of-hooks */
import { useRequestsQuery } from '@/hooks/query/useRequestsQuery';
import { GetRequestType } from '@/services/requestApi';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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

  const headers = ['No', 'Request Date', 'Code', 'Project Name', 'Status'];

  const { data } = useRequestsQuery(search, 0, 99);

  const handleRequestClick = (id: number) => {
    router.push(`/request/${id}`);
  };

  return (
    <div className="mx-6 h-full flex flex-col gap-4 justify-start  min-h-0">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header: string) => (
              <TableHead
                key={header}
                className="bg-secondary sticky top-0 px-4 py-2 font-semibold"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items?.map((request: GetRequestType, i: number) => (
            <TableRow
              key={request.id}
              onClick={() => handleRequestClick(request.id)}
              className="cursor-pointer"
            >
              <TableCell className="px-4 py-3.5"> {String(i + 1)}</TableCell>
              <TableCell className="px-4 py-3.5">
                {' '}
                {moment(request.request_date)
                  .tz('Asia/Jakarta')
                  .format('DD MMM YYYY')}
              </TableCell>
              <TableCell className="px-4 py-3.5">
                {' '}
                {request.request_code}
              </TableCell>
              <TableCell>{request.project_name}</TableCell>
              <TableCell className="px-4 py-3.5">
                <div className="flex items-center gap-2">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
    </div>
  );
};

export default requestTable;
