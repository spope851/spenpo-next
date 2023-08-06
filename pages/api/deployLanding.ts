import { DeployLandingPageBody } from "@/context/shoppingCart"
import type { NextApiRequest, NextApiResponse } from "next"
import { Octokit } from "octokit"

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GH_TOKEN,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const BODY: DeployLandingPageBody = JSON.parse(req.body)

  const result = await octokit
    // 1. clone landing repo
    .request("POST /repos/{template_owner}/{template_repo}/generate", {
      template_owner: "spenpo-landing",
      template_repo: "landing-template",
      owner: "spenpo-landing",
      name: BODY.project.name || "",
      description: `landing page for ${BODY.clientName}`,
      include_all_branches: false,
      private: false,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
    .then(
      async () =>
        // 2. create new vercel project
        await fetch("https://api.vercel.com/v9/projects", {
          body: JSON.stringify(BODY.project),
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_VERCEL_TOKEN}`,
          },
          method: "post",
        }).then(
          async () => {
            // 3. create blob of headshot
            const blobSha = await octokit
              .request("POST /repos/{owner}/{repo}/git/blobs", {
                owner: "spenpo-landing",
                repo: BODY.project.name || "",
                content: Buffer.from(BODY.headshot.content || "", "binary").toString(
                  "base64"
                ),
                encoding: "base64",
                headers: {
                  "X-GitHub-Api-Version": "2022-11-28",
                },
              })
              .then(
                (res) => res.data.sha,
                (err) => console.log(3, err)
              )
            // 4. get main tree sha
            const secondResult = await octokit
              .request("GET /repos/{owner}/{repo}/branches/{branch_name}", {
                owner: "spenpo-landing",
                repo: BODY.project.name,
                branch_name: "main",
                headers: {
                  "X-GitHub-Api-Version": "2022-11-28",
                },
              })
              .then(
                async (mainTreeRes) =>
                  // 5. create tree with headshot file
                  await octokit
                    .request("POST /repos/{owner}/{repo}/git/trees", {
                      owner: "spenpo-landing",
                      repo: BODY.project.name || "",
                      base_tree: mainTreeRes.data.commit.sha,
                      tree: [
                        {
                          path: `public/headshot.${BODY.headshot.fileExtension}`,
                          mode: "100644",
                          type: "blob",
                          sha: blobSha || null,
                        },
                      ],
                      headers: {
                        "X-GitHub-Api-Version": "2022-11-28",
                      },
                    })
                    .then(
                      async (newTreeRes) =>
                        // 6. create commit to new repo
                        await octokit
                          .request("POST /repos/{owner}/{repo}/git/commits", {
                            owner: "spenpo-landing",
                            repo: BODY.project.name || "",
                            message: "add headshot",
                            author: {
                              name: "spope851",
                              email: "spope851@gmail.com",
                            },
                            parents: [mainTreeRes.data.commit.sha],
                            tree: newTreeRes.data.sha,
                            headers: {
                              "X-GitHub-Api-Version": "2022-11-28",
                            },
                          })
                          .then(
                            async (commitRes) =>
                              // 7. push commit to deploy vercel project
                              await octokit.request(
                                "PATCH /repos/{owner}/{repo}/git/refs/{ref}",
                                {
                                  owner: "spenpo-landing",
                                  repo: BODY.project.name || "",
                                  ref: "heads/main",
                                  sha: commitRes.data.sha,
                                  force: true,
                                  headers: {
                                    "X-GitHub-Api-Version": "2022-11-28",
                                  },
                                }
                              ),
                            (err) => {
                              console.log(6, err)
                              return err
                            }
                          ),
                      (err) => {
                        console.log(5, err)
                        return err
                      }
                    ),
                (err) => {
                  console.log(4, err)
                  return err
                }
              )
            return secondResult
          },
          (err) => {
            console.log(2, err)
            return err
          }
        ),
      (err) => {
        console.log(1, err)
        return err
      }
    )

  res.status(200).json(result)
}
