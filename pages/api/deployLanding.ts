import type { NextApiRequest, NextApiResponse } from "next"
import { Octokit } from "octokit"

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GH_TOKEN,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const BODY = JSON.parse(req.body)

  const result = await octokit
    // clone landing repo
    .request("POST /repos/{template_owner}/{template_repo}/generate", {
      template_owner: "spenpo-landing",
      template_repo: "landing-template",
      owner: "spenpo-landing",
      name: BODY.project.name,
      description: `landing page for ${
        BODY.project.environmentVariables.find(
          (v: Record<string, string>) => v.key === "NEXT_PUBLIC_NAME"
        )?.value
      }`,
      include_all_branches: false,
      private: false,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
    .then(
      async () =>
        // create new vercel project
        await fetch("https://api.vercel.com/v9/projects", {
          body: JSON.stringify(BODY.project),
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_VERCEL_TOKEN}`,
          },
          method: "post",
        }).then(
          async () =>
            // get main tree sha
            await octokit
              .request("GET /repos/{owner}/{repo}/branches/{branch_name}", {
                owner: "spenpo-landing",
                repo: BODY.project.name,
                branch_name: "main",
                headers: {
                  "X-GitHub-Api-Version": "2022-11-28",
                },
              })
              .then(
                async (treeRes) =>
                  // create commit to new repo
                  await octokit
                    .request("POST /repos/{owner}/{repo}/git/commits", {
                      owner: "spenpo-landing",
                      repo: BODY.project.name,
                      message: "deploy landing page",
                      author: {
                        name: "spope851",
                        email: "spope851@gmail.com",
                      },
                      tree: treeRes.data.commit.commit.tree.sha,
                      headers: {
                        "X-GitHub-Api-Version": "2022-11-28",
                      },
                    })
                    .then(
                      async (commitRes) =>
                        // push commit to deploy vercel project
                        await octokit.request(
                          "PATCH /repos/{owner}/{repo}/git/refs/{ref}",
                          {
                            owner: "spenpo-landing",
                            repo: BODY.project.name,
                            ref: "heads/main",
                            sha: commitRes.data.sha,
                            force: true,
                            headers: {
                              "X-GitHub-Api-Version": "2022-11-28",
                            },
                          }
                        )
                    )
              )
        )
    )

  //   const data = await result.json()
  res.status(200).json(result)
}
