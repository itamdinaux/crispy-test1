import React from "react"
import { Helmet } from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"
//data
const getData = graphql`
  {
    s: contentfulInfo {
      title
      siteDsc {
        siteDsc
      }
      siteUrl
    }
  }
`
const SEO = ({ title, dsc, img }) => {
  const data = useStaticQuery(getData)
  return (
    <Helmet
      htmlAttributes={{ lang: "fr" }}
      title={title ? `${title} | ${data.s.title} ` : data.s.title}
    >
      <meta name="description" content={dsc || data.s.siteDsc.siteDsc} />
      <meta name="image" content={img} />
      {/* facebook cards */}
      <meta property="og:url" content={data.s.siteUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={data.s.name} />
      <meta property="og:description" content={dsc || data.s.siteDsc.siteDsc} />
      <meta property="og:image" content={`https:${img}`} />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="300" />
      {/* twitter card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="Mirage" />
      <meta name="twitter:title" content={data.s.name} />
      <meta
        name="twitter:description"
        content={dsc || data.s.siteDsc.siteDsc}
      />
      <meta name="twitter:image" content={`https:${img}`} />
    </Helmet>
  )
}

export default SEO
