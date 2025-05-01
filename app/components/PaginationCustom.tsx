import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { NestedValue } from "react-hook-form";

export function PaginationCustom({
  page,
  count,
  setPage,
}: {
  page: number;
  count: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleNext = () => {
    if (page < count) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };
  const getVisiblePages = () => {
    const visiblePages: number[] = [];
    if (count <= 5) {
      for (let i = 1; i <= count; i++) visiblePages.push(i);
    } else {
      if (page > 2) visiblePages.push(page - 1); // نبتدي من page - 1 بس لو أكبر من 2
      if (page > 1 && page < count) visiblePages.push(page);
      if (page < count - 1) visiblePages.push(page + 1); // نضيف page + 1 بس لو مش آخر صفحة
    }
    return visiblePages.filter((p) => p !== 1 && p !== count); // فلترة 1 و count عشان موجودين ثابت
  };

  return (
    <Pagination className=" z-10  col-span-full">
      <PaginationContent className="flex items-center gap-4">
        <PaginationItem>
          <Button
            variant={`destructive`}
            disabled={page === 1}
            className={`${
              page === count ? "bg-rose-400" : ""
            } flex items-center gap-2`}
            onClick={handlePrev}
          >
            <ArrowLeft className="mr-1" /> Prev
          </Button>
        </PaginationItem>

        <PaginationItem className={`${page === count ? "bg-rose-400" : ""}`}>
          <PaginationLink
            onClick={() => setPage(1)}
            className={`${page === 1 ? "bg-rose-400" : ""} cursor-pointer`}
          >
            1
          </PaginationLink>
        </PaginationItem>

        {getVisiblePages().map((p) => (
          <PaginationItem>
            <PaginationLink
              onClick={() => setPage(p)}
              className={`${page === p ? "bg-rose-400" : ""} cursor-pointer`}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <Button
            variant={`destructive`}
            disabled={page === count}
            className={`${
              page === count ? "bg-rose-400" : ""
            } flex items-center gap-2`}
            onClick={handleNext}
          >
            Next <ArrowRight className="mr-1" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationCustom;
