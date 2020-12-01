import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
//data
const getData = graphql`
  {
    c: contentfulInfo {
      logoClair {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      logoSombre {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      
    }
  }
`
const Logo = ({theme}) => {
  const data = useStaticQuery(getData)
  return (
    theme === "clair" ? (
    <>
    <div className="logo">
      <Link to="/">
        <BackgroundImage fluid={data.c.logoClair.fluid} className="bgLogo" />
      </Link>
    </div>
    </>
    ): (<>
    <div className="logo">
      <Link to="/">
        <BackgroundImage fluid={data.c.logoSombre.fluid} className="bgLogo" />
      </Link>
    </div>
    </>)
  )
}

export default Logo
