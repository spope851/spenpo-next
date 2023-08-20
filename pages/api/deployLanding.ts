import { DeployLandingPageBodyInput } from "@/context/shoppingCart"
import { pool } from "@/utils/postgres"
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"
import {
  cloneRepo,
  createBlob,
  createCommit,
  createTree,
  getMainTree,
  pushCommit,
} from "@/services/github"
import { createProject } from "@/services/vercel"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ github: { project: string }; vercel: { app: string } }>
) {
  const BODY: DeployLandingPageBodyInput = JSON.parse(req.body)

  let vercelApp: string = BODY.project.name
  let githubProject: string = BODY.project.name

  let attempts = 0

  const clone = async (): Promise<any> =>
    cloneRepo(
      `${BODY.project.name}${attempts > 0 ? `-${attempts}` : ""}`,
      BODY.clientName
    ).catch(async (err) => {
      console.log(1, "catch", err)
      if (err.status === 422) {
        attempts += 1
        return clone()
      } else return err
    })

  // 1. clone landing repo
  const cloneRes = await clone()

  // 2. create new vercel project
  let createProjectRes
  if (cloneRes.status === 201) {
    githubProject = cloneRes.data.name

    const project = {
      ...BODY.project,
      name: cloneRes.data.name,
      gitRepository: {
        ...BODY.project.gitRepository,
        repo: cloneRes.data.full_name,
      },
      environmentVariables: [
        ...BODY.project.environmentVariables,
        {
          key: "NEXT_PUBLIC_PROJECT_NAME",
          target: "production",
          type: "encrypted",
          value: githubProject,
        },
      ],
    }
    BODY.project = project

    createProjectRes = await createProject(project).catch((err) => {
      console.log(2, "catch", err)
      return err
    })
  } else console.log("else", 1, cloneRes)

  // 3. create blob of headshot
  let blobShaRes
  if (createProjectRes.status === 200) {
    const projectData = await createProjectRes.json()
    vercelApp = projectData.name

    blobShaRes = await createBlob(githubProject, BODY.headshot.content).catch(
      (err) => {
        console.log(3, "catch", err)
        return err
      }
    )
  } else console.log("else", 2, await createProjectRes.json())

  const main = async (): Promise<any> =>
    getMainTree(githubProject).catch(async (err) => {
      console.log(4, "catch", err)
      if (err.status === 404) {
        return main()
      } else return err
    })

  // 4. get main tree sha
  let mainTreeShaRes
  if (blobShaRes.status === 201)
    mainTreeShaRes = await main().catch((err) => {
      console.log(4, "catch", err)
      return err
    })
  else console.log("else", 3, blobShaRes)

  // 5. create tree with headshot file
  let newTreeShaRes
  if (mainTreeShaRes.status === 200)
    newTreeShaRes = await createTree(
      githubProject,
      mainTreeShaRes.data.commit.sha,
      BODY.headshot.fileName,
      blobShaRes.data.sha
    ).catch((err) => {
      console.log(5, "catch", err)
      return err
    })
  else console.log("else", 4, mainTreeShaRes)

  // 6. create commit to new repo
  let newCommitShaRes
  if (newTreeShaRes.status === 201)
    newCommitShaRes = await createCommit(
      githubProject,
      mainTreeShaRes.data.commit.sha,
      newTreeShaRes.data.sha
    ).catch((err) => {
      console.log(6, "catch", err)
      return err
    })
  else console.log("else", 5, newTreeShaRes)

  // 7. push commit to deploy vercel project
  let pushCommitRes
  if (newCommitShaRes.status === 201)
    pushCommitRes = await pushCommit(githubProject, newCommitShaRes.data.sha).catch(
      (err) => {
        console.log(7, "catch", err)
        return err
      }
    )
  else console.log("else", 6, newCommitShaRes)

  // 8. insert order into order table
  const newBody: DeployLandingPageBodyInput & {
    project: DeployLandingPageBodyInput["project"] & { name?: any }
  } = BODY
  newBody.headshot.content = ""
  newBody.project.name = {
    github: githubProject,
    vercel: vercelApp,
  }
  const session = await getServerSession(req, res, authOptions)
  if (pushCommitRes.status === 200)
    await pool
      .query(
        `
        insert into "order" (
          "user", 
          product_id, 
          details
        ) values (
          $1, 
          $2, 
          $3
        ) returning *;
      `,
        [session?.user.email, 1, newBody]
      )
      .catch((err: unknown) => {
        console.log(8, "catch", err)
        return err
      })
  else console.log("else", 7, pushCommitRes)

  res
    .status(200)
    .json({ github: { project: githubProject }, vercel: { app: vercelApp } })
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
}
