import { CommonPaginationProps } from "@/types/components";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const CommonPagination = ({
  onPageChange = () => {},
  totalPages = 0,
  page = 1,
}: CommonPaginationProps) => {
  const pageNumbers = [];
  const visiblePages = 5;
  const startPage = Math.max(1, page - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handleClick = (pageNumber: number) => {
    if (page !== pageNumber) {
      onPageChange(pageNumber);
    }
  };
  const handleNext = () => {
    const nextPage = page + 1;
    if (nextPage <= totalPages) {
      onPageChange(nextPage);
    }
  };

  const handlePrev = () => {
    const prevPage = page - 1;
    if (prevPage >= 1) {
      onPageChange(prevPage);
    }
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          className={` ${
            page === 1 ? "hover:cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <PaginationPrevious onClick={handlePrev} />
        </PaginationItem>
        {startPage > 1 && (
          <>
            <PaginationItem className="cursor-pointer">
              <PaginationLink onClick={() => handleClick(1)}>1</PaginationLink>
            </PaginationItem>
            {startPage > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {pageNumbers.map((number) => (
          <PaginationItem className="cursor-pointer" key={number}>
            <PaginationLink
              isActive={number === page}
              onClick={() => handleClick(number)}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem className="cursor-pointer">
              <PaginationLink onClick={() => handleClick(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext className={page === pageNumbers.length+1 ? "cursor-not-allowed": "cursor-pointer"} onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CommonPagination;
