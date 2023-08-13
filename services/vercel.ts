import { VercelProjectInput } from "@/context/shoppingCart"

const createProject = async (project: VercelProjectInput) =>
  fetch("https://api.vercel.com/v9/projects", {
    body: JSON.stringify(project),
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_VERCEL_TOKEN}`,
    },
    method: "post",
  })

export { createProject }
