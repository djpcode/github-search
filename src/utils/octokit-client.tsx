import { Octokit } from "@octokit/rest";

const octokitClient = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN
});

export default octokitClient;