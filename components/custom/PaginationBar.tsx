import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationBarProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationBar = ({
  page,
  totalPages,
  onPageChange,
}: PaginationBarProps) => {
  if (totalPages < 1) return null;

  return (
    <div className="w-fit select-none">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                onPageChange(page === 0 ? totalPages - 1 : page - 1)
              }
            />
          </PaginationItem>

          <div className="flex max-w-96 overflow-x-auto thin-scroll">
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i}
                  onClick={() => onPageChange(i)}
                  className="
                    transition-colors
                    data-[active=true]:bg-button-primary
                    data-[active=true]:text-primary-foreground
                    data-[active=true]:hover:bg-primary
                    aria-[current=page]:bg-primary
                    aria-[current=page]:text-primary-foreground
                "
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </div>

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                onPageChange(page === totalPages - 1 ? 0 : page + 1)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
