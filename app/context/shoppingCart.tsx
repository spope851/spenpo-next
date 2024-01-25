'use client'
import { SpenpoLandingCmsGetSet, SpenpoLandingCms } from 'spenpo-landing'
import { useLandEnvVars } from '../hooks/useLandEnvVars'
import { randBase64 } from '../utils/randStr'
import { useSession } from 'next-auth/react'
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from 'react'

interface ProjectEnvVariable {
  key: string
  target: string[]
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

export type DeployLandingPageBodyInput = {
  clientName: string
  headshot: {
    content: string
    fileName: string
  }
  project: VercelProjectInput
}

interface PaymentIntentMetadata {
  clientName?: string
  projectName?: string
  domainName?: string
  headshotExtension?: string
  environmentVariables: ProjectEnvVariableInput[]
  price?: number
  renew: boolean
}

type ShoppingCartContextProps = {
  setPassword: Dispatch<SetStateAction<string | undefined>>
  domainName: [string | undefined, Dispatch<SetStateAction<string | undefined>>]
  price: [number | undefined, Dispatch<SetStateAction<number | undefined>>]
  renew: [boolean, Dispatch<SetStateAction<boolean>>]
  passwordSet: boolean
  paymentIntentMetadata: PaymentIntentMetadata
  landingCms: SpenpoLandingCms
}

export const ShoppingCartContext = createContext({} as ShoppingCartContextProps)

export const ShoppingCartContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const session = useSession()
  const [domainName, setDomainName] = useState<string>()
  const [price, setPrice] = useState<number>()
  const [renew, setRenew] = useState<boolean>(true)
  const [clientName, setClientName] = useState<string>()
  const title = useState<string>()
  const subtitle = useState<string>()
  const [socialUrls, setSocialUrls] = useState<string>()
  const actionDestination = useState<string>()
  const actionStatement = useState<string | undefined>('your action statement')
  const headshotSrc = useState<string>()
  const backgroundColor = useState<string>()
  const backgroundImage = useState<string>()
  const accentColor = useState<string>()
  const secondaryAccentColor = useState<string>()
  const [password, setPassword] = useState<string>()
  const secret = useState(randBase64(32))

  const file = useState<File>()

  const socialsGetSet: SpenpoLandingCms['socialUrls'] = {
    getter: () => {
      if (socialUrls) return JSON.parse(socialUrls)
    },
    setter: (socials?: string[]) => {
      setSocialUrls(JSON.stringify(socials))
    },
  }

  function getSet<T>([state, setState]: [
    T,
    Dispatch<SetStateAction<T>>
  ]): SpenpoLandingCmsGetSet<T> {
    return {
      getter: () => state,
      setter: setState,
    }
  }

  const environmentVariables = useLandEnvVars({
    NEXT_PUBLIC_TITLE: title[0],
    NEXT_PUBLIC_NAME: clientName,
    NEXT_PUBLIC_SUBTITLE: subtitle[0],
    NEXT_PUBLIC_SOCIALS: socialUrls || '[]',
    NEXT_PUBLIC_ACTION_STATEMENT: actionStatement[0],
    NEXT_PUBLIC_HEADSHOT: `headshot.${file[0]?.name.split('.').at(-1)}`,
    NEXT_PUBLIC_ACTION: actionDestination[0],
    NEXT_PUBLIC_BG_COLOR: backgroundColor[0],
    NEXT_PUBLIC_BG_IMAGE: backgroundImage[0],
    NEXT_PUBLIC_ACCENT_COLOR: accentColor[0],
    NEXT_PUBLIC_SECONDARY_ACCENT_COLOR: secondaryAccentColor[0],
    NEXT_PUBLIC_HIDE_ADMIN: 'false',
    NEXT_AUTH_USERNAME: session.data?.user?.email ?? '',
    NEXT_AUTH_PASSWORD: password,
    NEXTAUTH_SECRET: secret[0],
  })

  const contextValue: ShoppingCartContextProps = useMemo(() => {
    const value: ShoppingCartContextProps = {
      setPassword,
      passwordSet: !!password,
      domainName: [domainName, setDomainName],
      price: [price, setPrice],
      renew: [renew, setRenew],
      paymentIntentMetadata: {
        clientName,
        projectName: domainName?.split('.')[0],
        domainName,
        headshotExtension: file[0]?.name.split('.').at(-1),
        environmentVariables,
        price,
        renew,
      },
      landingCms: {
        name: getSet([clientName, setClientName]),
        socialUrls: socialsGetSet,
        title: getSet(title),
        subtitle: getSet(subtitle),
        actionDestination: getSet(actionDestination),
        actionStatement: getSet(actionStatement),
        headshotSrc: getSet(headshotSrc),
        headshotFile: getSet(file),
        backgroundColor: getSet(backgroundColor),
        backgroundImage: getSet(backgroundImage),
        accentColor: getSet(accentColor),
        secondaryAccentColor: getSet(secondaryAccentColor),
      },
    }
    return value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    domainName,
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
    headshotSrc,
    environmentVariables,
    password,
    file,
    price,
    renew,
  ])

  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
