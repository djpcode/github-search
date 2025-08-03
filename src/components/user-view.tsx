import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { useSearch } from "@/hooks/search"
import { fetchUser } from "@/lib/fetcher";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

interface UsersSearchProps {
  term: string;
  shouldFetch: boolean;
}

function UserView ({ term, shouldFetch }: UsersSearchProps) {
  const { data, isLoading, error } = useSearch(fetchUser, { key: "github-user", shouldFetch, query: term });

  console.log("UserView data", data);

  return (
    <>
      {error && <div className="text-red-500 text-center">Error: {error.message}</div>}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="col-span-1">
            <div className="border p-4 rounded-lg">
              <Skeleton className="my-6 h-30 w-30 rounded-full" />
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableCell><Skeleton className="h-4 my-1 w-[250px]" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableCell><Skeleton className="h-4 my-1 w-[250px]" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Followers</TableHead>
                    <TableCell><Skeleton className="h-4 my-1 w-[250px]" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Location</TableHead>
                    <TableCell><Skeleton className="h-4 my-1 w-[250px]" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableCell><Skeleton className="h-4 my-1 w-[250px]" /></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <div className="border p-4 rounded-lg">
              <h2 className="text-lg font-bold my-4">Repositories</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Language</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array(10).fill(null).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-4 my-1 w-[250px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 my-1 w-[250px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 my-1 w-[100px]" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
      {data && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="col-span-1">
              <div className="border p-4 rounded-lg">
                <img className="rounded-full my-6" src={data.avatar_url} alt={data.login} width={100} height={100} />
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableCell>{data.login}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableCell>{data.type}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Followers</TableHead>
                      <TableCell>{data.followers}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Location</TableHead>
                      <TableCell>{data.location}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableCell>{data.email}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <div className="border p-4 rounded-lg">
                <h2 className="text-lg font-bold my-4">Repositories</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Language</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.repos.map((repo) => (
                      <TableRow key={repo.id}>
                        <TableCell>
                          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            {repo.name}
                          </a>
                        </TableCell>
                        <TableCell>{repo.description?.slice(0, 100)}...</TableCell>
                        <TableCell>{repo.language}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserView;
