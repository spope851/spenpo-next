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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const BODY: DeployLandingPageBodyInput = JSON.parse(req.body)

  // 1. clone landing repo
  await cloneRepo(BODY.project.name, BODY.clientName)
    .then(
      async (stepOneRes) => {
        console.log(1, stepOneRes)
      },
      (err) => {
        console.log(1, err)
        return err
      }
    )
    .catch((err) => {
      console.log(1, "catch", err)
      return err
    })

  // 2. create new vercel project
  await createProject(BODY.project)
    .then(
      async (stepTwoRes) => {
        console.log(2, stepTwoRes)
      },
      (err) => {
        console.log(2, err)
        return err
      }
    )
    .catch((err) => {
      console.log(2, "catch", err)
      return err
    })

  // 3. create blob of headshot
  const blobSha = await createBlob(BODY.project.name, BODY.headshot.content)
    .then(
      (stepThreeRes) => {
        console.log(3, stepThreeRes)
        return stepThreeRes.data.sha
      },
      (err) => console.log(3, err)
    )
    .catch((err) => {
      console.log(3, "catch", err)
      return err
    })

  // 4. get main tree sha
  const mainTreeSha = await getMainTree(BODY.project.name)
    .then(
      async (mainTreeRes) => {
        console.log(4, res)
        return mainTreeRes.data.commit.sha
      },
      (err) => {
        console.log(4, err)
        return err
      }
    )
    .catch((err) => {
      console.log(4, "catch", err)
      return err
    })

  // 5. create tree with headshot file
  const newTreeSha = await createTree(
    BODY.project.name,
    mainTreeSha,
    BODY.headshot.fileExtension,
    blobSha
  )
    .then(
      async (newTreeRes) => {
        console.log(5, newTreeRes)
        return newTreeRes.data.sha
      },
      (err) => {
        console.log(5, err)
        return err
      }
    )
    .catch((err) => {
      console.log(5, "catch", err)
      return err
    })

  // 6. create commit to new repo
  const newCommitSha = await createCommit(BODY.project.name, mainTreeSha, newTreeSha)
    .then(
      async (commitRes) => {
        console.log(6, commitRes)
        return commitRes.data.sha
      },
      (err) => {
        console.log(6, err)
        return err
      }
    )
    .catch((err) => {
      console.log(6, "catch", err)
      return err
    })

  // 7. push commit to deploy vercel project
  pushCommit(BODY.project.name, newCommitSha)
    .then(
      async (stepSevenRes) => {
        console.log(7, stepSevenRes)
        return stepSevenRes
      },
      (err) => {
        console.log(7, err)
        return err
      }
    )
    .catch((err) => {
      console.log(7, "catch", err)
      return err
    })

  // 8. insert order into order table
  const newBody = BODY
  newBody.headshot.content = ""
  console.log("INSERT order  ", newBody)
  const session = await getServerSession(req, res, authOptions)
  const order = await pool
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
    .then(
      (stepEightRes: unknown) => {
        console.log(8, stepEightRes)
        return stepEightRes
      },
      (err: unknown) => {
        console.log(8, err)
        return err
      }
    )
    .catch((err: unknown) => {
      console.log(8, "catch", err)
      return err
    })

  res.status(200).json(order.rows)
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
}
