import { LandingCms, LandingProps } from "@/components/landingPage"
import { DEFAULT_PROPS } from "@/components/landingPage/constants"
import { SxProps } from "@mui/material"
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react"
import { UnAuthContext } from "./unAuth"
import { useSession } from "next-auth/react"

export type LandingPageContextProps = {
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
    accentColor,
    secondaryAccentColor,
    actionStatement,
    actionDestination,
    backgroundImage,
    backgroundColor,
    headshotSrc,
    title,
    name,
    subtitle,
    socialUrls,
    linkNewTab,
    topComponents,
    editable,
    cms,
    cache,
  },
}) => {
  const { redisId } = useContext(UnAuthContext)
  const session = useSession()
  const hideButtons = useState(false)
  const newSocial = useState("")
  const hideNewSocial = useState(true)
  const newBackground = useState("")
  const hideNewBackground = useState(true)
  const confirmActionStatement = useState(false)
  const editActionStatement = useState(false)
  const editDestination = useState(false)

  const cacheOrDefault = (key: "LINK_NEW_TAB" | "SOCIAL_URLS") => {
    if (!!cache?.[key]) {
      try {
        return JSON.parse(String(cache[key]))
      } catch (err) {
        console.log(err)
      }
    }
    return DEFAULT_PROPS[key]
  }

  const ACCENT_COLOR =
    cms?.accentColor.getter() ||
    accentColor ||
    cache?.ACCENT_COLOR ||
    DEFAULT_PROPS.ACCENT_COLOR
  const SECONDARY_ACCENT_COLOR =
    cms?.secondaryAccentColor.getter() ||
    secondaryAccentColor ||
    cache?.SECONDARY_ACCENT_COLOR ||
    DEFAULT_PROPS.SECONDARY_ACCENT_COLOR
  const ACTION_STATEMENT =
    cms?.actionStatement.getter() ||
    actionStatement ||
    cache?.ACTION_STATEMENT ||
    DEFAULT_PROPS.ACTION_STATEMENT
  const ACTION_DESTINATION =
    cms?.actionDestination.getter() || actionDestination || cache?.ACTION_DESTINATION
  const BACKGROUND_IMAGE =
    cms?.backgroundImage.getter() ||
    backgroundImage ||
    cache?.BACKGROUND_IMAGE ||
    DEFAULT_PROPS.BACKGROUND_IMAGE
  const BACKGROUND_COLOR =
    cms?.backgroundColor.getter() ||
    backgroundColor ||
    cache?.BACKGROUND_COLOR ||
    DEFAULT_PROPS.BACKGROUND_COLOR
  const HEADSHOT_SRC =
    cms?.headshotSrc.getter() || headshotSrc || cache?.HEADSHOT_SRC
  const TITLE = cms?.title.getter() || title || cache?.TITLE || DEFAULT_PROPS.TITLE
  const NAME = cms?.name.getter() || name || cache?.NAME || DEFAULT_PROPS.NAME
  const SUBTITLE =
    cms?.subtitle.getter() || subtitle || cache?.SUBTITLE || DEFAULT_PROPS.SUBTITLE
  const SOCIAL_URLS =
    cms?.socialUrls.getter() || socialUrls || cacheOrDefault("SOCIAL_URLS")

  const LINK_NEW_TAB =
    cms?.linkNewTab.getter() || linkNewTab || cacheOrDefault("LINK_NEW_TAB")

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
    const cachable = {
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
      LINK_NEW_TAB,
    }

    const cache = {
      ...cachable,
      SOCIAL_URLS: JSON.stringify(SOCIAL_URLS),
      hideButtons: hideButtons[0],
      newSocial: newSocial[0],
      hideNewSocial: hideNewSocial[0],
      newBackground: newBackground[0],
      hideNewBackground: hideNewBackground[0],
      confirmActionStatement: confirmActionStatement[0],
      editActionStatement: editActionStatement[0],
      editDestination: editDestination[0],
    }

    if (session.status === "unauthenticated") {
      ;(async () =>
        fetch("/api/cache/unAuthLanding", {
          body: JSON.stringify({ cache, id: redisId }),
          method: "post",
        }))()
    } else if (session.status === "authenticated") {
      ;(async () =>
        fetch("/api/cache/authLanding", {
          body: JSON.stringify(cache),
          method: "post",
        }))()
    }

    return {
      ...cachable,
      SOCIAL_URLS,
      hideButtons,
      newSocial,
      hideNewSocial,
      newBackground,
      hideNewBackground,
      confirmActionStatement,
      editActionStatement,
      editDestination,
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
    TopComponents,
    ADD_BTN_SX,
    cms,
    editable,
  ])

  return (
    <LandingPageContext.Provider value={contextValue}>
      {children}
    </LandingPageContext.Provider>
  )
}
