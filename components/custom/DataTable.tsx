/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2 } from 'lucide-react';
import React from 'react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T, index: number) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data?: T[];
  isLoading?: boolean;
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({
  columns,
  data,
  isLoading = false,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className=" min-h-0 rounded-2xl h-full flex overflow-auto border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className="bg-secondary sticky top-0 font-semibold py-3 px-5"
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="py-10 text-center">
                <div className="flex justify-center gap-2">
                  <Loader2 className="animate-spin" />
                  Loading...
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data?.map((row, index) => (
              <TableRow
                key={index}
                className={onRowClick ? 'cursor-pointer border-none!' : ''}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    className={`${col.className} py-3.5 px-5 `}
                  >
                    {col.render
                      ? col.render(row, index)
                      : (row as any)[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
