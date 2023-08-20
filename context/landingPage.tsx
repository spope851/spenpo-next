import { LandingCms, LandingProps } from "@/components/landingPage"
import { SxProps } from "@mui/material"
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react"

type LandingPageContextProps = {
  hideButtons: [boolean, Dispatch<SetStateAction<boolean>>]
  newSocial: [string, Dispatch<SetStateAction<string>>]
  hideNewSocial: [boolean, Dispatch<SetStateAction<boolean>>]
  newBackground: [string, Dispatch<SetStateAction<string>>]
  hideNewBackground: [boolean, Dispatch<SetStateAction<boolean>>]
  confirmActionStatement: [boolean, Dispatch<SetStateAction<boolean>>]
  editActionStatement: [boolean, Dispatch<SetStateAction<boolean>>]
  editDestination: [boolean, Dispatch<SetStateAction<boolean>>]
  ACCENT_COLOR: string
  SECONDARY_ACCENT_COLOR: string
  ACTION_STATEMENT?: string
  ACTION_DESTINATION?: string
  BACKGROUND_IMAGE: string
  BACKGROUND_COLOR: string
  HEADSHOT_SRC?: string
  TITLE?: string
  NAME?: string
  SUBTITLE?: string
  SOCIAL_URLS?: string[]
  LINK_NEW_TAB?: boolean
  TopComponents: ReactNode
  ADD_BTN_SX: SxProps
  cms?: LandingCms
  editable: LandingProps["editable"]
}

export const LandingPageContext = createContext({} as LandingPageContextProps)

export const LandingPageContextProvider: React.FC<{
  children: ReactNode
  landingProps: LandingProps
}> = ({
  children,
  landingProps: {
    accentColor = "#4f86f7",
    secondaryAccentColor = "#5FA052",
    actionStatement,
    actionDestination,
    backgroundImage = "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%20width%3D%22512%22%20height%3D%22512%22%20preserveAspectRatio%3D%22none%22%3E%20%3Cstyle%3E%20path%20%7B%20fill%3A%20none%3B%20stroke-width%3A%201.01px%3B%20stroke%3A%20rgba(0,0,0,0.09)%3B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D,20%3C%2Fstyle%3E%20%3Cpath%20d%3D%22M448%2C512c0-128-128-128-128-256S448%2C128%2C448%2C0%22%20%2F%3E%20%3Cpath%20d%3D%22M192%2C512c0-128-128-128-128-256S192%2C128%2C192%2C0%22%20%2F%3E%3C%2Fsvg%3E",
    backgroundColor = "#E6E1DF",
    headshotSrc,
    title,
    name,
    subtitle,
    socialUrls,
    linkNewTab,
    topComponents,
    editable,
    cms,
  },
}) => {
  const hideButtons = useState(false)
  const newSocial = useState("")
  const hideNewSocial = useState(true)
  const newBackground = useState("")
  const hideNewBackground = useState(true)
  const confirmActionStatement = useState(false)
  const editActionStatement = useState(false)
  const editDestination = useState(false)

  const ACCENT_COLOR = cms?.accentColor.useGetter() || accentColor
  const SECONDARY_ACCENT_COLOR =
    cms?.secondaryAccentColor.useGetter() || secondaryAccentColor
  const ACTION_STATEMENT = cms ? cms.actionStatement.useGetter() : actionStatement
  const ACTION_DESTINATION = cms
    ? cms.actionDestination.useGetter()
    : actionDestination
  const BACKGROUND_IMAGE = cms?.backgroundImage.useGetter() || backgroundImage
  const BACKGROUND_COLOR = cms?.backgroundColor.useGetter() || backgroundColor
  const HEADSHOT_SRC = cms ? cms.headshotSrc.useGetter() : headshotSrc
  const TITLE = cms ? cms.title.useGetter() : title
  const NAME = cms ? cms.name.useGetter() : name
  const SUBTITLE = cms ? cms.subtitle.useGetter() : subtitle
  const SOCIAL_URLS = cms?.socialUrls.useGetter() || socialUrls
  const LINK_NEW_TAB = cms ? cms.linkNewTab.useGetter() : linkNewTab

  const TopComponents = useMemo(() => {
    if (!hideButtons[0]) return topComponents
  }, [hideButtons])

  const ADD_BTN_SX = {
    stroke: ACCENT_COLOR,
    fill: ACCENT_COLOR,
    ":hover": {
      transform: "scale(1.08)",
      stroke: SECONDARY_ACCENT_COLOR,
      fill: SECONDARY_ACCENT_COLOR,
    },
  }

  const contextValue: LandingPageContextProps = useMemo(() => {
    return {
      hideButtons,
      newSocial,
      hideNewSocial,
      newBackground,
      hideNewBackground,
      confirmActionStatement,
      editActionStatement,
      editDestination,
      ACCENT_COLOR,
      SECONDARY_ACCENT_COLOR,
      ACTION_STATEMENT,
      ACTION_DESTINATION,
      BACKGROUND_IMAGE,
      BACKGROUND_COLOR,
      HEADSHOT_SRC,
      TITLE,
      NAME,
      SUBTITLE,
      SOCIAL_URLS,
      LINK_NEW_TAB,
      TopComponents,
      ADD_BTN_SX,
      cms,
      editable,
    }
  }, [
    hideButtons,
    newSocial,
    hideNewSocial,
    newBackground,
    hideNewBackground,
    confirmActionStatement,
    editActionStatement,
    editDestination,
    ACCENT_COLOR,
    SECONDARY_ACCENT_COLOR,
    ACTION_STATEMENT,
    ACTION_DESTINATION,
    BACKGROUND_IMAGE,
    BACKGROUND_COLOR,
    HEADSHOT_SRC,
    TITLE,
    NAME,
    SUBTITLE,
    SOCIAL_URLS,
    LINK_NEW_TAB,
  ])

  return (
    <LandingPageContext.Provider value={contextValue}>
      {children}
    </LandingPageContext.Provider>
  )
}
