import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import BackgroundImage from "gatsby-background-image"
//components
import Logo from "../components/Branding/Logo"
//css
import "../css/branding.scss"
//data
const getData = graphql`
  {
    c: contentfulInfo {
      homeImage {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`

const BrandingHome = () => {
  const data = useStaticQuery(getData)
  return (
    <>
      <BackgroundImage fluid={data.c.homeImage.fluid} className="bgHome">
      <div className="bgDark"></div>
        <div className="brandingHome container">
          <div className="flex flex-space">
            <Logo theme="clair" />
          </div>
        </div>
      </BackgroundImage>
    </>
  )
}

export default BrandingHome
