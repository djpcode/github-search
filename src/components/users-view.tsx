import type { UserSearchResponse } from '../hooks/search-users';
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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface UsersSearchProps {
  term: string;
  userResults: UserSearchResponse | null;
  loading: boolean;
  error: Error | null;
  handleNextPage: (event) => Promise<void>;
  handlePreviousPage: (event) => Promise<void>;
}

function UsersView ({
  term,
  userResults,
  loading,
  error,
  handleNextPage,
  handlePreviousPage
}: UsersSearchProps) {
  return (
    <>
      {error && <div className="text-red-500 text-center">Error: {error.message}</div>}
      {loading && <div className="text-center">Loading...</div>}
      {userResults && userResults.items && userResults.items.length > 0 && (
        <div className='my-8'>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <h2 className="text-left text-lg font-semibold">Users Search Results</h2>

            <span></span>

            <Pagination className='justify-end'>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={handlePreviousPage} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext onClick={handleNextPage} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {userResults.items.map((item) => (
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
                    <div className='flex'>
                      <CardAction className="grow">
                        <Button className='flex' asChild>
                          <a href={item.html_url}>View on Github</a>
                        </Button>
                      </CardAction>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* <div className='border rounded-xl shadow-sm'>
            <Table>
              <TableCaption>Search results for {term}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Avatar</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {userResults.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-left">{item.login}</TableCell>
                      <TableCell className="text-left">
                        <img src={item.avatar_url} alt={item.login} className="w-8 h-8 rounded-full" />
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Total Users: {userResults?.total_count}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div> */}
        </div>
      )}
    </>
  )
}

export default UsersView;
