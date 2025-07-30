import { useState } from 'react';
import octokitClient from '../utils/octokit-client';
import type { Endpoints } from "@octokit/types";

export type UserSearchResponse = Endpoints["GET /search/users"]["response"]["data"];

interface UserSearchParams {
  query: string,
  per_page?: number,
  page?: number,
}

export function useUserSearch() {
  const [userResults, setUserResults] = useState<UserSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function fetchUserSearch({ query, per_page = 10, page = 1 }: UserSearchParams) {
    setLoading(true);
    setError(null);

    try {
      // const res = await octokitClient.rest.users.getByUsername({
      //   username: query
      // });
      const res = await octokitClient.rest.search.users({
        q: query,
        per_page,
        page
      });
      console.log('User Search Response:', res);
      setUserResults(res.data);
    } catch (err) {
      const er = err as Error
      setError(er);
    } finally {
      setLoading(false);
    }
  }

  function resetUserSearch() {
    setUserResults(null);
    setLoading(false);
    setError(null);
  }

  return { userResults, loading, error, fetchUserSearch, resetUserSearch };
}
