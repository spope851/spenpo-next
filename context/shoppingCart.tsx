import { LandingCms } from "@/components/landingPage"
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
  const [title, setTitle] = useState("your title")
  const [subtitle, setSubtitle] = useState<string>("something interesting about you")
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
  const [actionDestination, setActionDestination] = useState<string>()
  const [actionStatement, setActionStatement] = useState<string | undefined>(
    "your action statement"
  )
  const [headshotContent, setHeadshotContent] = useState<string>()
  const [headshotFileName, setHeadshotFileName] = useState("headshot.jpeg")
  const [headshotSrc, setHeadshotSrc] = useState<string>()
  const [backgroundColor, setBackgroundColor] = useState<string>()
  const [backgroundImage, setBackgroundImage] = useState<string>()
  const [accentColor, setAccentColor] = useState<string>()
  const [secondaryAccentColor, setSecondaryAccentColor] = useState<string>()
  const [linkNewTab, setLinkNewTab] = useState("true")
  const [password, setPassword] = useState<string>()
  const [secret] = useState(randBase64(32))

  const nameGetSet: LandingCms["name"] = {
    useGetter: () => useMemo(() => clientName, [clientName]),
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
    useGetter: () => useMemo(() => JSON.parse(linkNewTab), [linkNewTab]),
    setter: (newTab: boolean) => {
      setLinkNewTab(JSON.stringify(newTab))
    },
  }

  const socialsGetSet: LandingCms["socialUrls"] = {
    useGetter: () => useMemo(() => JSON.parse(socialUrls || "[]"), [socialUrls]),
    setter: (socials?: string[]) => {
      setSocialUrls(JSON.stringify(socials))
    },
  }

  const titleGetSet: LandingCms["title"] = {
    useGetter: () => useMemo(() => title, [title]),
    setter: setTitle,
  }

  const subtitleGetSet: LandingCms["subtitle"] = {
    useGetter: () => useMemo(() => subtitle, [subtitle]),
    setter: setSubtitle,
  }

  const actionDestinationGetSet: LandingCms["actionDestination"] = {
    useGetter: () => useMemo(() => actionDestination, [actionDestination]),
    setter: setActionDestination,
  }

  const actionStatementGetSet: LandingCms["actionStatement"] = {
    useGetter: () => useMemo(() => actionStatement, [actionStatement]),
    setter: setActionStatement,
  }

  const headshotContentGetSet: LandingCms["headshotContent"] = {
    useGetter: () => useMemo(() => headshotContent, [headshotContent]),
    setter: setHeadshotContent,
  }

  const headshotFileNameGetSet: LandingCms["headshotFileName"] = {
    useGetter: () => useMemo(() => headshotFileName, [headshotFileName]),
    setter: setHeadshotFileName,
  }

  const headshotSrcGetSet: LandingCms["headshotSrc"] = {
    useGetter: () => useMemo(() => headshotSrc, [headshotSrc]),
    setter: setHeadshotSrc,
  }

  const backgroundColorGetSet: LandingCms["backgroundColor"] = {
    useGetter: () => useMemo(() => backgroundColor, [backgroundColor]),
    setter: setBackgroundColor,
  }

  const backgroundImageGetSet: LandingCms["backgroundImage"] = {
    useGetter: () => useMemo(() => backgroundImage, [backgroundImage]),
    setter: setBackgroundImage,
  }

  const accentColorGetSet: LandingCms["accentColor"] = {
    useGetter: () => useMemo(() => accentColor, [accentColor]),
    setter: setAccentColor,
  }

  const secondaryAccentColorGetSet: LandingCms["secondaryAccentColor"] = {
    useGetter: () => useMemo(() => secondaryAccentColor, [secondaryAccentColor]),
    setter: setSecondaryAccentColor,
  }

  const environmentVariables = useLandEnvVars({
    NEXT_PUBLIC_TITLE: title,
    NEXT_PUBLIC_NAME: clientName,
    NEXT_PUBLIC_SUBTITLE: subtitle,
    NEXT_PUBLIC_SOCIALS: socialUrls,
    NEXT_PUBLIC_ACTION_STATEMENT: actionStatement,
    NEXT_PUBLIC_HEADSHOT: headshotFileName,
    NEXT_PUBLIC_ACTION: actionDestination,
    NEXT_PUBLIC_BG_COLOR: backgroundColor,
    NEXT_PUBLIC_BG_IMAGE: backgroundImage,
    NEXT_PUBLIC_ACCENT_COLOR: accentColor,
    NEXT_PUBLIC_SECONDARY_ACCENT_COLOR: secondaryAccentColor,
    NEXT_PUBLIC_HIDE_ADMIN: "false",
    NEXT_PUBLIC_LINK_NEW_TAB: linkNewTab,
    NEXT_AUTH_USERNAME: session.data?.user.email,
    NEXT_AUTH_PASSWORD: password,
    NEXTAUTH_SECRET: secret,
  })

  const contextValue: ShoppingCartContextProps = useMemo(() => {
    return {
      setPassword,
      deployLandingPageBody: {
        clientName,
        headshot: {
          content: headshotContent,
          fileName: headshotFileName,
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
        title: titleGetSet,
        subtitle: subtitleGetSet,
        actionDestination: actionDestinationGetSet,
        actionStatement: actionStatementGetSet,
        headshotContent: headshotContentGetSet,
        headshotFileName: headshotFileNameGetSet,
        headshotSrc: headshotSrcGetSet,
        backgroundColor: backgroundColorGetSet,
        backgroundImage: backgroundImageGetSet,
        accentColor: accentColorGetSet,
        secondaryAccentColor: secondaryAccentColorGetSet,
        linkNewTab: linkNewTabGetSet,
      },
    }
  }, [headshotContent, headshotFileName, environmentVariables])

  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
