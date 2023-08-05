import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react"

type ProjectEnvVariable = {
  key: string
  target: string
  type: string
  value?: string
}

type VercelProject = {
  name?: string
  environmentVariables: ProjectEnvVariable[]
  framework: string
  gitRepository: {
    repo: string
    type: string
  }
}

type DeployLandingPageBody = {
  project: VercelProject
}

type ShoppingCartContextProps = {
  setProjectName: Dispatch<SetStateAction<string | undefined>>
  setClientName: Dispatch<SetStateAction<string | undefined>>
  setTitle: Dispatch<SetStateAction<string | undefined>>
  setSubtitle: Dispatch<SetStateAction<string | undefined>>
  setSocialUrls: Dispatch<SetStateAction<string | undefined>>
  setAction: Dispatch<SetStateAction<string | undefined>>
  setActionStatement: Dispatch<SetStateAction<string | undefined>>
  deployLandingPageBody: DeployLandingPageBody
}

export const ShoppingCartContext = createContext({} as ShoppingCartContextProps)

export const ShoppingCartContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [projectName, setProjectName] = useState<string>()
  const [clientName, setClientName] = useState<string>()
  const [title, setTitle] = useState<string>()
  const [subtitle, setSubtitle] = useState<string>()
  const [socialUrls, setSocialUrls] = useState<string>()
  const [action, setAction] = useState<string>()
  const [actionStatement, setActionStatement] = useState<string>()
  const contextValue = useMemo(() => {
    return {
      setProjectName,
      setClientName,
      setTitle,
      setSubtitle,
      setSocialUrls,
      setAction,
      setActionStatement,
      deployLandingPageBody: {
        project: {
          name: projectName,
          environmentVariables: [
            {
              key: "NEXT_PUBLIC_TITLE",
              target: "production",
              type: "encrypted",
              value: title,
            },
            {
              key: "NEXT_PUBLIC_NAME",
              target: "production",
              type: "encrypted",
              value: clientName,
            },
            {
              key: "NEXT_PUBLIC_SUBTITLE",
              target: "production",
              type: "encrypted",
              value: subtitle,
            },
            {
              key: "NEXT_PUBLIC_SOCIALS",
              target: "production",
              type: "encrypted",
              value: socialUrls,
            },
            {
              key: "NEXT_PUBLIC_ACTION",
              target: "production",
              type: "encrypted",
              value: action,
            },
            {
              key: "NEXT_PUBLIC_ACTION_STATEMENT",
              target: "production",
              type: "encrypted",
              value: actionStatement,
            },
          ],
          framework: "nextjs",
          gitRepository: {
            repo: `spenpo-landing/${projectName}`,
            type: "github",
          },
        },
      },
    }
  }, [projectName, clientName, title, subtitle, socialUrls, action, actionStatement])

  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
