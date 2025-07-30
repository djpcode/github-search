import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Header } from '@/components/ui/header';
// import UserRepos from './components/getUserRepos';
import UsersView from './components/users-view'
import CodeView from './components/code-view'
import Filters from './components/filters';
import { ModeToggle } from './components/mode-toggle';
import { useCodeSearch } from './hooks/search-code';
import { useUserSearch } from './hooks/search-users';
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchVectors, setSearchVectors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [codeSearchPageNumber, setCodeSearchPageNumber] = useState(1);
  const {
    codeResults,
    loading: codeSearchLoading,
    error: codeSearchError,
    fetchCodeSearch,
    resetCodeSearch
  } = useCodeSearch();

  const [userSearchPageNumber, setUserSearchPageNumber] = useState(1);
  const {
    userResults,
    loading: userSearchLoading,
    error: userSearchError,
    fetchUserSearch,
    resetUserSearch
  } = useUserSearch();

  const handleSearch = async (event) => {
      event.preventDefault();
      setLoading(true);

      if (searchVectors.includes("code")) {
        await fetchCodeSearch({ query: searchTerm, per_page: 10, page: codeSearchPageNumber });
      } else {
        resetCodeSearch();
      }

      if (searchVectors.includes("users")) {
        await fetchUserSearch({ query: searchTerm, per_page: 12, page: userSearchPageNumber });
      } else {
        resetUserSearch();
      }

      console.log('Search Term:', searchTerm);
      console.log('Search Vectors:', searchVectors);
      setLoading(false);
  }

  const handleNextPageUsers = async (event) => {
    event.preventDefault();

    if (userResults && userResults.total_count > userSearchPageNumber * 12) {
      setUserSearchPageNumber(prev => prev + 1);
      await fetchUserSearch({ query: searchTerm, per_page: 12, page: userSearchPageNumber });
    }
  }

  const handlePreviousPageUsers = async (event) => {
    event.preventDefault();

    if (userSearchPageNumber > 1) {
      setUserSearchPageNumber(prev => prev - 1);
      await fetchUserSearch({ query: searchTerm, per_page: 12, page: userSearchPageNumber });
    }
  }

  const handleNextPageCode = async (event) => {
    event.preventDefault();

    if (codeResults && codeResults.total_count > codeSearchPageNumber * 10) {
      setCodeSearchPageNumber(prev => prev + 1);
      await fetchCodeSearch({ query: searchTerm, per_page: 10, page: codeSearchPageNumber });
    }
  }

  const handlePreviousPageCode = async (event) => {
    event.preventDefault();

    if (codeSearchPageNumber > 1) {
      setCodeSearchPageNumber(prev => prev - 1);
      await fetchCodeSearch({ query: searchTerm, per_page: 10, page: codeSearchPageNumber });
    }
  }

  return (
    <>
      <Header>
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-center text-2xl font-bold">GitHub Search</h1>

          <ModeToggle />
        </div>
      </Header>

      <main className="container mx-auto p-4">
        <div className="mt-3 mb-3">
          <form className="text-center my-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 gap-x-12">
              <div className="my-3">
                <div>
                  <Label htmlFor="searchTerm" className='text-lg mb-4'>Search Term</Label>
                  <Input
                    type="text" placeholder="Enter search term"
                    onChange={(event) => setSearchTerm(event.target.value)}
                    required
                  />
                </div>
              </div>

              <Filters>
                <Checkbox id="users" className='w-7 h-7' onCheckedChange={(checked) => {
                  if (checked) {
                    setSearchVectors([...searchVectors, "users"]);
                  } else {
                    setSearchVectors(searchVectors.filter(v => v !== "users"));
                  }
                }} />
                <Label htmlFor="users">Users</Label>
                <Checkbox id="code" className='w-7 h-7' onCheckedChange={(checked) => {
                  if (checked) {
                    setSearchVectors([...searchVectors, "code"]);
                  } else {
                    setSearchVectors(searchVectors.filter(v => v !== "code"));
                  }
                }} />
                <Label htmlFor="code">Code</Label>
              </Filters>
              
              <div className="my-3 flex justify-start items-center">
                <div>
                  <Button
                    color="primary"
                    onClick={handleSearch}>
                      {loading ? "Searching..." : "Search"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <UsersView
          term={searchTerm}
          userResults={userResults}
          loading={userSearchLoading}
          error={userSearchError}
          handleNextPage={handleNextPageUsers}
          handlePreviousPage={handlePreviousPageUsers}
        />
        <CodeView
          term={searchTerm}
          codeResults={codeResults}
          loading={codeSearchLoading}
          error={codeSearchError}
          handleNextPage={handleNextPageCode}
          handlePreviousPage={handlePreviousPageCode}
        />
      </main>
    </>
  )
}

export default App
