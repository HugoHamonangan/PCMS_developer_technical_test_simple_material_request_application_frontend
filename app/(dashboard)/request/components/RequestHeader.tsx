import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusIcon } from 'lucide-react';
import React from 'react';

interface RequestHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onNavigateToAddRequest: () => void;
}
const RequestHeader = ({
  searchValue,
  onSearchChange,
  onNavigateToAddRequest,
}: RequestHeaderProps) => {
  return (
    <div className="px-6">
      <div className="flex flex-col gap-4 items-baseline justify-between md:flex-row mb-6">
        <h1 className="text-3xl font-light tracking-tight ">
          Material Request List
        </h1>
        <div className="flex gap-2 items-center flex-wrap">
          <Input
            placeholder="Search requests..."
            onChange={(e) => onSearchChange(e.target.value)}
            value={searchValue}
            className=" border w-fit min-w-60  placeholder:text-neutral-600 text-base font-light py-2 px-4"
          />
          <Button
            variant="default"
            className="cursor-pointer"
            onClick={onNavigateToAddRequest}
          >
            <PlusIcon />
            Add Request
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RequestHeader;
