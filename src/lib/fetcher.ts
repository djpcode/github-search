import octokitClient from "@/utils/octokit-client";

export interface SearchParams {
  query: string,
  per_page?: number,
  page?: number,
}

export const fetchUsers = async ({ query, per_page, page }: SearchParams) => {
  const res = await octokitClient.rest.search.users({
    q: query,
    per_page,
    page
  });
  return res.data;
}

export const fetchCode = async ({ query, per_page, page }: SearchParams) => {
  const res = await octokitClient.rest.search.code({
    q: `${query} in:file`,
    per_page,
    page,
    headers: {
      accept: 'application/vnd.github.v3.text-match+json'
    }
  });
  return res.data;
}
