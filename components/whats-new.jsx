import React, { useState, useEffect } from "react"
export const WhatsNew = ({ endpoint }) => {
  const [content, setContent] = useState() //{"id":3,"title":"How to be happy","img":null,"domain":"https://introspective20s.wordpress.com/2022/04/09/how-to-be-happy/","summary":"A framework for maintaining enjoyment and satisfaction"}) //{"id":1,"title":"big title","img":"https://product-image.juniqe-production.juniqe.com/media/catalog/product/seo-cache/x800/34/83/34-83-101P/Stay-Cool-Balazs-Solti-Poster.jpg","domain":"https://google.com","summary":"sick"}) // {"id":1,"title":"big title","img":"https://product-image.juniqe-production.juniqe.com/media/catalog/product/seo-cache/x800/34/83/34-83-101P/Stay-Cool-Balazs-Solti-Poster.jpg","domain":"https://google.com","summary":"sick"} }

  useEffect(() => {
    ;(async () => {
      await fetch(endpoint).then((res) =>
        res.json().then((data) => setContent(data))
      )
    })()
  }, [])

  return content ? (
    <div
      id="link-preview"
      style={{
        display: "flex",
        border: "solid #aaa",
        borderRadius: "15px",
        alignItems: "stretch",
        flex: "1 1 0px",
      }}
      onClick={() => window.open(content.domain, "_blank").focus()}
      onMouseOver={() =>
        document.getElementById(`link-preview`).classList.add("tweet-hover")
      }
      onMouseLeave={() =>
        document.getElementById(`link-preview`).classList.remove("tweet-hover")
      }
    >
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
          {content.summary}
        </p>
        <a
          href={content.domain}
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
          <img width="15px" src="/images/link.svg" alt="link" />
          {content.domain.split("://")[1]}
        </a>
      </div>
    </div>
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
