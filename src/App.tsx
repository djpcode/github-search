import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Header } from '@/components/ui/header';
import UsersView from './components/users-view'
import CodeView from './components/code-view'
import Filters from './components/filters';
import { ModeToggle } from './components/mode-toggle';
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchVectors, setSearchVectors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submittedSearch, setSubmittedSearch] = useState<{term: string, vectors: string[]} | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setSubmittedSearch({ term: searchTerm, vectors: searchVectors });
    setLoading(false);
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
          <form className="text-center my-4" onSubmit={handleSubmit}>
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
                    id='searchButton'
                    type="submit"
                    color="primary">
                      {loading ? "Searching..." : "Search"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
        {submittedSearch && (
          <>
            <UsersView
              term={submittedSearch.term}
              shouldFetch={submittedSearch.vectors.includes("users")}
            />
            <CodeView
              term={submittedSearch.term}
              shouldFetch={submittedSearch.vectors.includes("code")}
            />
          </>
        )}
      </main>
    </>
  )
}

export default App
