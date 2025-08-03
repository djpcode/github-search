import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { useSearch } from "@/hooks/search"
import { fetchCode } from "@/lib/fetcher";

function getHighlightedText(fragment?: string, indices?: number[]) {
  if (!fragment || !indices ) return <span className="bg-highlight text-highlight-foreground p-1 rounded-md">...</span>;

  const start = fragment.substring(0, indices[0]).slice(-50);
  const middle = fragment.substring(indices[0], indices[1]);
  const end = fragment.substring(indices[1]).slice(0, 50);

  return (
    <>
      {start}
      <span className="bg-highlight text-highlight-foreground p-1 rounded-md">{middle}</span>
      {end}
    </>
  );
}

interface CodeSearchProps {
  term: string;
  shouldFetch: boolean;
}

function CodeView ({ term, shouldFetch }: CodeSearchProps) {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useSearch(fetchCode, { key: "github-code", shouldFetch, query: term, per_page: 12, page });

  const handleNextPage = () => {
    if (data && data.total_count > page * 12) {
      setPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  return (
    <>
      {error && <div className="text-red-500 text-center">Error: {error.message}</div>}
      {isLoading && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <h2 className="text-left text-lg font-semibold">Code Search Results</h2>

            <span></span>

            <Pagination className='justify-end'>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={handlePreviousPage}
                    className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext 
                    onClick={handleNextPage}
                    className={!data || data.total_count <= page * 12 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          <div className='border rounded-xl shadow-sm'>
            <Table>
              <TableCaption>Search results for {term}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='p-4'>Repository</TableHead>
                  <TableHead className='p-4'>Text Match</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {Array(12).fill(null).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-left p-4 w-1/3">
                      <Skeleton className="h-4 my-1" />
                    </TableCell>
                    <TableCell className="text-left whitespace-normal p-4">
                      <Skeleton className="h-4 my-1" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Total Repositories: {data?.total_count}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </>
      )}
      {data && data.items && data.items.length > 0 && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <h2 className="text-left text-lg font-semibold">Code Search Results</h2>

            <span></span>

            <Pagination className='justify-end'>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={handlePreviousPage}
                    className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext 
                    onClick={handleNextPage}
                    className={!data || data.total_count <= page * 12 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          <div className='border rounded-xl shadow-sm'>
            <Table>
              <TableCaption>Search results for {term}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='p-4'>Repository</TableHead>
                  <TableHead className='p-4'>Text Match</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.items.map((item) => (
                    <TableRow key={item.repository.id}>
                      <TableCell className="text-left p-4 w-1/3">{item.repository.url}</TableCell>
                      {item.text_matches && item.text_matches.length > 0 ? (
                        
                        <TableCell className="text-left whitespace-normal p-4">
                          {
                            // @ts-expect-error because text_matches is optional
                            getHighlightedText(item.text_matches[0].fragment, item.text_matches[0].matches[0].indices)
                          }
                        </TableCell>
                      ) : (
                        <TableCell className="text-left p-4">No match found</TableCell>
                      )}
                    </TableRow>
                ))}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Total Repositories: {data?.total_count}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </>
      )}
    </>
  )
}

export default CodeView;
