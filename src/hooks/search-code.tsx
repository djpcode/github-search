import { useState } from 'react';
import octokitClient from '../utils/octokit-client';
import type { Endpoints } from "@octokit/types";

export type CodeSearchResponse = Endpoints["GET /search/code"]["response"]["data"];

interface CodeSearchParams {
  query: string,
  per_page?: number,
  page?: number,
}

export function useCodeSearch() {
  const [codeResults, setCodeResults] = useState<CodeSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function fetchCodeSearch({ query, per_page = 10, page = 1 }: CodeSearchParams) {
    setLoading(true);
    setError(null);

    try {
      const res = await octokitClient.rest.search.code({
        q: `${query} in:file`,
        per_page,
        page,
        headers: {
          accept: 'application/vnd.github.v3.text-match+json'
        }
      });
      console.log('Code Search Response:', res);
      setCodeResults(res.data);
    } catch (err) {
      const er = err as Error
      setError(er);
    } finally {
      setLoading(false);
    }
  }

  function resetCodeSearch() {
    setCodeResults(null);
    setLoading(false);
    setError(null);
  }

  return { codeResults, loading, error, fetchCodeSearch, resetCodeSearch };
}
