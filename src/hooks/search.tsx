import useSWR from 'swr';
import type { SearchParams } from '@/lib/fetcher';

interface UseSearchParams extends SearchParams {
  key: string;
  shouldFetch: boolean;
}

export function useSearch<T>(fetcher: (query:SearchParams) => Promise<T>, { key, shouldFetch, ...searchParams }: UseSearchParams) {
  const swrKey = shouldFetch ? [key, searchParams] : null;

  const { data, error, isLoading } = useSWR(
    swrKey,
    ([, query]) => fetcher(query as SearchParams)
  );

  return { data, isLoading, error };
}
