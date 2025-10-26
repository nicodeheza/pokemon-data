"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import {
  Pagination as CnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

interface PaginationComponentProps {
  totalPages: number;
  maxVisiblePages?: number;
}

export function Pagination({
  totalPages = 1,
  maxVisiblePages = 5,
}: PaginationComponentProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  totalPages = Math.max(1, totalPages);
  const currentPage = Number(searchParams.get("page")) ?? 1;

  const searchParamsObj = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams],
  );

  const pageNumbers = useMemo(() => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      if (startPage > 2) {
        pages.push("ellipsis");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("ellipsis");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, maxVisiblePages, totalPages]);

  return (
    <CnPagination className="p-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={{
              pathname,
              query: { ...searchParamsObj, page: currentPage - 1 },
            }}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {pageNumbers.map((page, index) => (
          <PaginationItem key={`page-${index}`}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={{
                  pathname,
                  query: { ...searchParamsObj, page },
                }}
                isActive={currentPage === page}
                className={currentPage === page ? "pointer-events-none" : ""}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={{
              pathname,
              query: { ...searchParamsObj, page: currentPage + 1 },
            }}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </CnPagination>
  );
}
