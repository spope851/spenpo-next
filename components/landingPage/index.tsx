import React, { Dispatch, ReactNode, SetStateAction } from "react"
import {
  LandingPageContextProps,
  LandingPageContextProvider,
} from "@/context/landingPage"
import { Info } from "./components/info"
import { EditControlPanel } from "./components/editControlPanel"
import { Headshot } from "./components/headshot"
import { LandingWrapper } from "./components/landingWrapper"

export type CmsGetSet<T = string | undefined> = {
  getter: () => T
  setter: (prop: T) => void
}

export type LandingCms = {
  title: CmsGetSet
  name: CmsGetSet
  subtitle: CmsGetSet
  socialUrls: CmsGetSet<string[] | undefined>
  backgroundImage: CmsGetSet
  backgroundColor: CmsGetSet
  accentColor: CmsGetSet
  secondaryAccentColor: CmsGetSet
  actionDestination: CmsGetSet
  actionStatement: CmsGetSet
  headshotSrc: CmsGetSet
  linkNewTab: CmsGetSet<boolean>
}

export interface LandingPage {
  title?: string
  name?: string
  subtitle?: string
  socialUrls?: string[]
  backgroundImage?: string
  backgroundColor?: string
  accentColor?: string
  secondaryAccentColor?: string
  headshotSrc?: string
  actionDestination?: string
  actionStatement?: string
  linkNewTab?: boolean
}

export type LandingCache = Partial<Record<keyof LandingPageContextProps, string>>

export interface LandingProps extends LandingPage {
  topComponents?: ReactNode
  editable?: [boolean, Dispatch<SetStateAction<boolean>>]
  cms?: LandingCms
  cache?: LandingCache
}

const Landing: React.FC<LandingProps> = (props) => {
  return (
    <LandingPageContextProvider landingProps={props}>
      <EditControlPanel />
      <LandingWrapper>
        <Headshot />
        <Info />
      </LandingWrapper>
    </LandingPageContextProvider>
  )
}

export default Landing
