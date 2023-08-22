import { CmsGetSet, LandingCms } from "@/components/landingPage"
import { useLandEnvVars } from "@/hooks/useLandEnvVars"
import { randBase64 } from "@/utils/randStr"
import { useSession } from "next-auth/react"
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react"

interface ProjectEnvVariable {
  key: string
  target: string
  type: string
  value?: string
}

export interface ProjectEnvVariableInput extends ProjectEnvVariable {
  value: string
}

interface VercelProject {
  name?: string
  environmentVariables: ProjectEnvVariable[]
  framework: string
  gitRepository: {
    repo: string
    type: string
  }
}

export interface VercelProjectInput extends VercelProject {
  name: string
  environmentVariables: ProjectEnvVariableInput[]
}

type DeployLandingPageBody = {
  clientName?: string
  headshot: {
    content?: string
    fileName?: string
  }
  project: VercelProject
}

export type DeployLandingPageBodyInput = {
  clientName: string
  headshot: {
    content: string
    fileName: string
  }
  project: VercelProjectInput
}

type ShoppingCartContextProps = {
  setPassword: Dispatch<SetStateAction<string | undefined>>
  deployLandingPageBody: DeployLandingPageBody
  landingCms: LandingCms
}

export const ShoppingCartContext = createContext({} as ShoppingCartContextProps)

export const ShoppingCartContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const session = useSession()
  const [projectName, setProjectName] = useState<string>()
  const [clientName, setClientName] = useState("your name")
  const title = useState("your title")
  const subtitle = useState<string>("something interesting about you")
  const [socialUrls, setSocialUrls] = useState<string | undefined>(
    JSON.stringify([
      "https://twitter.com",
      "https://www.instagram.com",
      "https://www.facebook.com",
      "https://www.youtube.com",
      "https://www.twitch.tv",
      "mailto:e@mail.com",
      "https://github.com",
      "https://reddit.com",
      "https://whatsapp.com",
      "https://spotify.com",
    ])
  )
  const actionDestination = useState<string>()
  const actionStatement = useState<string | undefined>("your action statement")
  const headshotContent = useState<string>()
  const headshotFileName = useState("headshot.jpeg")
  const headshotSrc = useState<string>()
  const backgroundColor = useState<string>()
  const backgroundImage = useState<string>()
  const accentColor = useState<string>()
  const secondaryAccentColor = useState<string>()
  const [linkNewTab, setLinkNewTab] = useState("true")
  const [password, setPassword] = useState<string>()
  const secret = useState(randBase64(32))

  const nameGetSet: LandingCms["name"] = {
    getter: () => clientName,
    setter: (name: string) => {
      setClientName(name)
      setProjectName(
        `${name
          ?.replace(/['".,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
          .replaceAll(" ", "")
          .toLocaleLowerCase()}-landing`
      )
    },
  }

  const linkNewTabGetSet: LandingCms["linkNewTab"] = {
    getter: () => JSON.parse(linkNewTab),
    setter: (newTab: boolean) => {
      setLinkNewTab(JSON.stringify(newTab))
    },
  }

  const socialsGetSet: LandingCms["socialUrls"] = {
    getter: () => JSON.parse(socialUrls || "[]"),
    setter: (socials?: string[]) => {
      setSocialUrls(JSON.stringify(socials))
    },
  }

  function getSet<T>([state, setState]: [
    T,
    Dispatch<SetStateAction<T>>
  ]): CmsGetSet<T> {
    return {
      getter: () => state,
      setter: setState,
    }
  }

  const environmentVariables = useLandEnvVars({
    NEXT_PUBLIC_TITLE: title[0],
    NEXT_PUBLIC_NAME: clientName,
    NEXT_PUBLIC_SUBTITLE: subtitle[0],
    NEXT_PUBLIC_SOCIALS: socialUrls,
    NEXT_PUBLIC_ACTION_STATEMENT: actionStatement[0],
    NEXT_PUBLIC_HEADSHOT: headshotFileName[0],
    NEXT_PUBLIC_ACTION: actionDestination[0],
    NEXT_PUBLIC_BG_COLOR: backgroundColor[0],
    NEXT_PUBLIC_BG_IMAGE: backgroundImage[0],
    NEXT_PUBLIC_ACCENT_COLOR: accentColor[0],
    NEXT_PUBLIC_SECONDARY_ACCENT_COLOR: secondaryAccentColor[0],
    NEXT_PUBLIC_HIDE_ADMIN: "false",
    NEXT_PUBLIC_LINK_NEW_TAB: linkNewTab,
    NEXT_AUTH_USERNAME: session.data?.user.email,
    NEXT_AUTH_PASSWORD: password,
    NEXTAUTH_SECRET: secret[0],
    NEXT_PUBLIC_GH_TOKEN: process.env.NEXT_PUBLIC_GH_TOKEN,
    NEXT_PUBLIC_VERCEL_TOKEN: process.env.NEXT_PUBLIC_VERCEL_TOKEN,
  })

  const contextValue: ShoppingCartContextProps = useMemo(() => {
    return {
      setPassword,
      deployLandingPageBody: {
        clientName,
        headshot: {
          content: headshotContent[0],
          fileName: headshotFileName[0],
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
      landingCms: {
        name: nameGetSet,
        socialUrls: socialsGetSet,
        title: getSet(title),
        subtitle: getSet(subtitle),
        actionDestination: getSet(actionDestination),
        actionStatement: getSet(actionStatement),
        headshotContent: getSet(headshotContent),
        headshotFileName: getSet(headshotFileName),
        headshotSrc: getSet(headshotSrc),
        backgroundColor: getSet(backgroundColor),
        backgroundImage: getSet(backgroundImage),
        accentColor: getSet(accentColor),
        secondaryAccentColor: getSet(secondaryAccentColor),
        linkNewTab: linkNewTabGetSet,
      },
    }
  }, [
    projectName,
    clientName,
    title,
    subtitle,
    socialUrls,
    actionStatement,
    actionDestination,
    accentColor,
    secondaryAccentColor,
    backgroundColor,
    backgroundImage,
    linkNewTab,
    headshotSrc,
    headshotContent,
    headshotFileName,
    environmentVariables,
  ])

  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
