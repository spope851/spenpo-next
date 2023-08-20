import { Octokit } from "octokit"

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GH_TOKEN,
})

const cloneRepo = async (projectName: string, clientName: string) =>
  octokit.request("POST /repos/{template_owner}/{template_repo}/generate", {
    template_owner: "spenpo-landing",
    template_repo: "landing-template",
    owner: "spenpo-landing",
    name: projectName || "",
    description: `landing page for ${clientName}`,
    include_all_branches: false,
    private: false,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })

const createBlob = async (projectName: string, headshot: string) =>
  octokit.request("POST /repos/{owner}/{repo}/git/blobs", {
    owner: "spenpo-landing",
    repo: projectName,
    content: Buffer.from(headshot, "binary").toString("base64"),
    encoding: "base64",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })

const getMainTree = async (projectName: string) =>
  octokit.request("GET /repos/{owner}/{repo}/branches/{branch_name}", {
    owner: "spenpo-landing",
    repo: projectName,
    branch_name: "main",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })

const createTree = async (
  projectName: string,
  mainTreeSha: string,
  fileName: string,
  blobSha: string
) =>
  octokit.request("POST /repos/{owner}/{repo}/git/trees", {
    owner: "spenpo-landing",
    repo: projectName,
    base_tree: mainTreeSha,
    tree: [
      {
        path: `public/${fileName}`,
        mode: "100644",
        type: "blob",
        sha: blobSha || null,
      },
    ],
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })

const createCommit = async (
  projectName: string,
  mainTreeSha: string,
  newTreeSha: string
) =>
  octokit.request("POST /repos/{owner}/{repo}/git/commits", {
    owner: "spenpo-landing",
    repo: projectName,
    message: "add headshot",
    author: {
      name: "spope851",
      email: "spope851@gmail.com",
    },
    parents: [mainTreeSha],
    tree: newTreeSha,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })

const pushCommit = async (projectName: string, commitSha: string) =>
  octokit.request("PATCH /repos/{owner}/{repo}/git/refs/{ref}", {
    owner: "spenpo-landing",
    repo: projectName,
    ref: "heads/main",
    sha: commitSha,
    force: true,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })

export { cloneRepo, createBlob, getMainTree, createTree, createCommit, pushCommit }
