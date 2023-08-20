import React, { Dispatch, ReactNode, SetStateAction } from "react"
import { LandingPageContextProvider } from "@/context/landingPage"
import { Info } from "./components/info"
import { EditControlPanel } from "./components/editControlPanel"
import { Headshot } from "./components/headshot"
import { LandingWrapper } from "./components/landingWrapper"

export type CmsGetSet<T = string> = {
  useGetter: () => T
  setter: (prop: T) => void
}

export type LandingCms = {
  title: CmsGetSet
  name: CmsGetSet
  subtitle: CmsGetSet
  socialUrls: CmsGetSet<string[] | undefined>
  backgroundImage: CmsGetSet<string | undefined>
  backgroundColor: CmsGetSet<string | undefined>
  accentColor: CmsGetSet<string | undefined>
  secondaryAccentColor: CmsGetSet<string | undefined>
  actionDestination: CmsGetSet<string | undefined>
  actionStatement: CmsGetSet<string | undefined>
  headshotSrc: CmsGetSet<string | undefined>
  headshotContent: CmsGetSet<string | undefined>
  headshotFileName: CmsGetSet
  linkNewTab: CmsGetSet<boolean>
}

export type LandingProps = {
  title?: string
  name?: string
  subtitle?: string
  socialUrls?: string[]
  backgroundImage?: string
  backgroundColor?: string
  accentColor?: string
  secondaryAccentColor?: string
  headshotSrc?: string
  topComponents?: ReactNode
  actionDestination?: string
  actionStatement?: string
  linkNewTab?: boolean
  editable?: [boolean, Dispatch<SetStateAction<boolean>>]
  cms?: LandingCms
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
