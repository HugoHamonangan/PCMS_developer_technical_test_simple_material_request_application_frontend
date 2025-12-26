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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import moment from 'moment-timezone';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface RequestTableProps {
  search: string;
}

const requestTable = ({ search }: RequestTableProps) => {
  const [pageSize, setPageSize] = useState('10');
  const [page, setPage] = useState(0);

  const router = useRouter();

  const headers = ['No', 'Request Date', 'Code', 'Project Name', 'Status'];

  const offset = search != '' ? 0 : +pageSize * page;

  const { data, isLoading } = useRequestsQuery(search, offset, +pageSize);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(data?.count / +pageSize)),
    [data?.count, pageSize]
  );

  const totalPagesArray = Array.from(
    { length: totalPages ?? 0 },
    (_, i: number) => {
      return i + 1;
    }
  );

  useEffect(() => {
    console.log(totalPagesArray);
  }, [totalPages]);

  const handleRequestClick = (id: number) => {
    router.push(`/request/${id}`);
  };

  return (
    <div className="mx-6 h-full flex flex-col gap-4 justify-start min-h-0">
      <div className=" min-h-0 rounded-2xl h-full flex overflow-auto border">
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
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={headers.length}
                  className="text-center py-10 "
                >
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="size-6 animate-spin" />
                    <span>Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data?.items?.map((request: GetRequestType, i: number) => (
                <TableRow
                  key={request.id}
                  onClick={() => handleRequestClick(request.id)}
                  className="cursor-pointer"
                >
                  <TableCell className="px-4 py-3.5">{i + 1}</TableCell>

                  <TableCell className="px-4 py-3.5">
                    {moment(request.request_date)
                      .tz('Asia/Jakarta')
                      .format('DD MMM YYYY')}
                  </TableCell>

                  <TableCell className="px-4 py-3.5">
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
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between ">
        <Select
          value={pageSize}
          onValueChange={(value) => {
            setPageSize(value);
            setPage(0);
          }}
        >
          <SelectTrigger className="w-fit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Data per page</SelectLabel>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="10" defaultChecked>
                10
              </SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="w-fit">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="select-none"
                  onClick={() =>
                    setPage(page === 0 ? totalPages - 1 : page - 1)
                  }
                />
              </PaginationItem>

              <div className="overflow-x-auto max-w-96 flex thin-scroll">
                {totalPagesArray.map((data, i) => (
                  <PaginationItem key={i} className="flex">
                    <PaginationLink
                      className="cursor-pointer"
                      onClick={() => setPage(i)}
                      isActive={page === i}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </div>

              <PaginationItem>
                <PaginationNext
                  className="select-none"
                  onClick={() =>
                    setPage((p) => (p === totalPages - 1 ? 0 : p + 1))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default requestTable;
