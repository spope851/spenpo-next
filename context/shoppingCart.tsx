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

export type DeployLandingPageBody = {
  clientName?: string
  headshot: {
    content?: string
    fileExtension?: string
  }
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
  setHeadshotContent: Dispatch<SetStateAction<string | undefined>>
  setFileExtension: Dispatch<SetStateAction<string | undefined>>
  setBackgroundColor: Dispatch<SetStateAction<string | undefined>>
  setBackgroundImage: Dispatch<SetStateAction<string | undefined>>
  setAccentColor: Dispatch<SetStateAction<string | undefined>>
  setSecondaryAccentColor: Dispatch<SetStateAction<string | undefined>>
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
  const [headshotContent, setHeadshotContent] = useState<string>()
  const [fileExtension, setFileExtension] = useState<string>()
  const [backgroundColor, setBackgroundColor] = useState<string>()
  const [backgroundImage, setBackgroundImage] = useState<string>()
  const [accentColor, setAccentColor] = useState<string>()
  const [secondaryAccentColor, setSecondaryAccentColor] = useState<string>()

  const environmentVariables = useMemo(() => {
    const required = [
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
        key: "NEXT_PUBLIC_ACTION_STATEMENT",
        target: "production",
        type: "encrypted",
        value: actionStatement,
      },
      {
        key: "NEXT_PUBLIC_HEADSHOT",
        target: "production",
        type: "encrypted",
        value: `headshot.${fileExtension}`,
      },
    ]

    const variables = [...required]

    if (action)
      variables.push({
        key: "NEXT_PUBLIC_ACTION",
        target: "production",
        type: "encrypted",
        value: action,
      })

    if (backgroundColor)
      variables.push({
        key: "NEXT_PUBLIC_BG_COLOR",
        target: "production",
        type: "encrypted",
        value: backgroundColor,
      })

    if (backgroundImage)
      variables.push({
        key: "NEXT_PUBLIC_BG_IMAGE",
        target: "production",
        type: "encrypted",
        value: backgroundImage,
      })

    if (accentColor)
      variables.push({
        key: "NEXT_PUBLIC_ACCENT_COLOR",
        target: "production",
        type: "encrypted",
        value: accentColor,
      })

    if (secondaryAccentColor)
      variables.push({
        key: "NEXT_PUBLIC_SECONDARY_ACCENT_COLOR",
        target: "production",
        type: "encrypted",
        value: secondaryAccentColor,
      })

    return variables
  }, [action, backgroundColor, backgroundImage, accentColor, secondaryAccentColor])

  const contextValue = useMemo(() => {
    return {
      setProjectName,
      setClientName,
      setTitle,
      setSubtitle,
      setSocialUrls,
      setAction,
      setActionStatement,
      setHeadshotContent,
      setFileExtension,
      setBackgroundColor,
      setBackgroundImage,
      setAccentColor,
      setSecondaryAccentColor,
      deployLandingPageBody: {
        clientName,
        headshot: {
          content: headshotContent,
          fileExtension,
        },
        project: {
          name: projectName,
          environmentVariables,
          framework: "nextjs",
          gitRepository: {
            repo: `spenpo-landing/${projectName}`,
            type: "github",
          },
        },
      },
    }
  }, [
    projectName,
    clientName,
    title,
    subtitle,
    socialUrls,
    actionStatement,
    headshotContent,
    fileExtension,
    environmentVariables,
  ])

  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
