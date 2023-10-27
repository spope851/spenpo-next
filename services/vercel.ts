import { ProjectEnvVariableInput, VercelProjectInput } from "@/context/shoppingCart"

const headers = {
  Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
}

const createProject = async (project: VercelProjectInput) =>
  fetch(`https://api.vercel.com/v9/projects?teamId=${process.env.VERCEL_TEAM}`, {
    body: JSON.stringify(project),
    headers,
    method: "post",
  })

const getProject = async (name: string) =>
  fetch(
    `https://api.vercel.com/v9/projects/${name}?teamId=${process.env.VERCEL_TEAM}`,
    {
      headers,
      method: "get",
    }
  )

const getProjectDeployments = async (app: string) =>
  fetch(
    `https://api.vercel.com/v2/deployments?app=${app}&teamId=${process.env.VERCEL_TEAM}`,
    {
      headers,
      method: "get",
    }
  )

const getDeploymentAliases = async (deploymentId: string) =>
  fetch(
    `https://api.vercel.com/v2/deployments/${deploymentId}/aliases?teamId=${process.env.VERCEL_TEAM}`,
    {
      headers,
      method: "get",
    }
  )

const redeployProject = async (deploymentId: string, name: string) =>
  fetch(`https://api.vercel.com/v13/deployments?teamId=${process.env.VERCEL_TEAM}`, {
    body: JSON.stringify({
      name,
      deploymentId,
    }),
    headers,
    method: "post",
  })

const cancelDeployment = async (deploymentId: string) =>
  fetch(
    `https://api.vercel.com/v12/deployments/${deploymentId}/cancel?teamId=${process.env.VERCEL_TEAM}`,
    {
      headers,
      method: "patch",
    }
  )

const addEnvironmentVariables = async (
  projectName: string,
  variables: ProjectEnvVariableInput[]
) =>
  fetch(
    `https://api.vercel.com/v10/projects/${projectName}/env?teamId=${process.env.VERCEL_TEAM}`,
    {
      body: JSON.stringify(variables),
      headers,
      method: "post",
    }
  )

const getDeployment = async (deploymentId: string) =>
  fetch(
    `https://api.vercel.com/v13/deployments/${deploymentId}?teamId=${process.env.VERCEL_TEAM}`,
    {
      headers,
      method: "get",
    }
  )

const getDeploymentEvents = async (deploymentId: string) =>
  fetch(
    `https://api.vercel.com/v2/deployments/${deploymentId}/events?builds=1&direction=forward&follow=1&teamId=${process.env.VERCEL_TEAM}`,
    {
      headers,
      method: "get",
    }
  )

export {
  createProject,
  getProject,
  getProjectDeployments,
  getDeploymentAliases,
  redeployProject,
  cancelDeployment,
  addEnvironmentVariables,
  getDeployment,
  getDeploymentEvents,
}
