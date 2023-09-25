import React from "react"
import {
  LinkPreviewProps,
  LinkPreview as ReactLinkPreview,
} from "@dhaiwat10/react-link-preview"
import { LINK_PREVIEW_FALLBACK } from "@/constants/image"

export const LinkPreview: React.FC<LinkPreviewProps> = ({ url, ...rest }) => {
  return (
    <ReactLinkPreview
      {...rest}
      url={url}
      fetcher={async (url: string) => {
        const req = await fetch(`/api/getLinkPreview?url=${url}`, {
          method: "get",
        })
        const json = await req.json()
        return json
      }}
      fallbackImageSrc={LINK_PREVIEW_FALLBACK}
    />
  )
}
