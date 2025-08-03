import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { useSearch } from "@/hooks/search"
import { fetchUsers } from "@/lib/fetcher";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import UserView from "./user-view";

interface UsersSearchProps {
  term: string;
  shouldFetch: boolean;
}

function UsersView ({ term, shouldFetch }: UsersSearchProps) {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useSearch(fetchUsers, { key: "github-users", shouldFetch, query: term, per_page: 12, page });

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
        <div className='my-8'>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <h2 className="text-left text-lg font-semibold">Users Search Results</h2>

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

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array(12).fill(null).map((_, index) => (
              <div key={index} className="col-span-1 max-w-sm">
                <Card className="text-center">
                  <CardHeader>
                    <div className='grid grid-cols-3 gap-4 items-center'>
                      <div className='col-span-1'>
                        <Skeleton className="h-25 w-25 rounded-full" />
                      </div>
                      <div className='col-span-2'>
                        <h3 className='text-start text-lg'>
                          <Skeleton className="h-4 my-1 w-[150px]" />
                        </h3>
                        <h4 className='text-start'>
                          <Skeleton className="h-4 my-1 w-[150px]" />
                        </h4>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className='flex flex-row gap-2'>
                      <CardAction>
                        <Skeleton className="h-10 my-1 w-[150px]" />
                      </CardAction>
                      <CardAction>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Skeleton className="h-10 my-1 w-[150px]" />
                          </DialogTrigger>

                          <DialogContent className="sm:max-w-8/10">
                            <DialogHeader>
                              <DialogTitle><Skeleton className="h-4 my-1 w-[150px]" /></DialogTitle>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </CardAction>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
      {data && data.items && data.items.length > 0 && (
        <div className='my-8'>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <h2 className="text-left text-lg font-semibold">Users Search Results</h2>

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

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.items.map((item) => (
              <div key={item.id} className="col-span-1 max-w-sm">
                <Card className="text-center">
                  <CardHeader>
                    <div className='grid grid-cols-3 gap-4 items-center'>
                      <div className='col-span-1'>
                        <img className="rounded-full" src={item.avatar_url} alt={item.login} width={100} height={100} />
                      </div>
                      <div className='col-span-2'>
                        <h3 className='text-start text-lg'>@{item.login}</h3>
                        <h4 className='text-start'>{item.type}</h4>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className='flex flex-row gap-2'>
                      <CardAction>
                        <Button className='flex' asChild>
                          <a href={item.html_url}>View on Github</a>
                        </Button>
                      </CardAction>
                      <CardAction>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className='flex'>Open Dialog</Button>
                          </DialogTrigger>

                          <DialogContent className="sm:max-w-8/10">
                            <DialogHeader>
                              <DialogTitle>{item.login}</DialogTitle>
                            </DialogHeader>
                            
                            <UserView term={item.login} shouldFetch={true} />
                          </DialogContent>
                        </Dialog>
                      </CardAction>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default UsersView;
