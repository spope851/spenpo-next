import { Octokit } from "octokit"

const octokit = new Octokit({
  auth: process.env.TOKEN,
})

try {
  await octokit.request("POST /repos/{owner}/{repo}/forks", {
    owner: "spope851",
    repo: "spenpo-landing",
    name: `${"test"}-landing`,
    default_branch_only: true,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })
} catch (error) {
  console.log(
    `Error! Status: ${error.status}. Message: ${error.response.data.message}`
  )
}
