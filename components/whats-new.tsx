import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"

export interface Content {
  id: string
  title: string
  img?: string
  href: string
  description: string
  target_blank: boolean
}

const StyledBox = styled(Box)(() => ({
  display: "flex",
  border: "solid #aaa",
  borderRadius: "15px",
  alignItems: "stretch",
  flex: "1 1 0px",
  ":hover": {
    cursor: "pointer",
    backgroundColor: "#ddd",
  },
}))

export const WhatsNew: React.FC<{ content: Content }> = ({ content }) => {
  const router = useRouter()
  // const [content, setContent] = useState<Content>() //{"id":3,"title":"How to be happy","img":null,"domain":"https://introspective20s.wordpress.com/2022/04/09/how-to-be-happy/","summary":"A framework for maintaining enjoyment and satisfaction"}) //{"id":1,"title":"big title","img":"https://product-image.juniqe-production.juniqe.com/media/catalog/product/seo-cache/x800/34/83/34-83-101P/Stay-Cool-Balazs-Solti-Poster.jpg","domain":"https://google.com","summary":"sick"}) // {"id":1,"title":"big title","img":"https://product-image.juniqe-production.juniqe.com/media/catalog/product/seo-cache/x800/34/83/34-83-101P/Stay-Cool-Balazs-Solti-Poster.jpg","domain":"https://google.com","summary":"sick"} }

  return content ? (
    <StyledBox
      id="link-preview"
      onClick={() =>
        content.target_blank
          ? window.open(content.href, "_blank")
          : router.push(content.href)
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        style={{ objectFit: "cover", borderRadius: "15px 0 0 15px", width: 100 }}
        src={content.img || "/favicon.ico"}
        alt="image"
      />
      <div
        style={{
          padding: "20px 5px",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          flex: "1 1 0px",
          width: 0,
        }}
      >
        <strong
          style={{
            margin: 0,
          }}
        >
          {content.title}
        </strong>
        <p
          style={{
            margin: 0,
            fontSize: "14px",
          }}
        >
          {content.description}
        </p>
        <a
          href={content.href}
          style={{
            textDecoration: "none",
            color: "#aaa",
            fontSize: "14px",
            display: "inline-block",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            maxWidth: "inherit",
          }}
        >
          <Image width={15} height={15} src="/images/link.svg" alt="link" />
          {content.href.split("://")[1]}
        </a>
      </div>
    </StyledBox>
  ) : (
    <div
      style={{
        textAlign: "center",
        margin: 10,
        padding: 10,
        border: "dotted #aaa",
        display: "flex",
        flexDirection: "column",
        flex: "1 1 0%",
      }}
    >
      <span>loading preview...</span>
    </div>
  )
}
