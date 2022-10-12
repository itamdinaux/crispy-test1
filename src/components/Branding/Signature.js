import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import BackgroundImage from "gatsby-background-image"
//component
import Horaire from "../Branding/Horaire"
import Phone from "../Branding/Phone"
import Closed from "../Service/Closed"
//data
const getData = graphql`
  {
    c: contentfulInfo {
      logoSombre {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      title
      adressText
    }
  }
`
const Signature = ({ mode }) => {
  //data
  const data = useStaticQuery(getData)

  return (
    <div className="signature">
      <BackgroundImage fluid={data.c.logoSombre.fluid} className="logo" />
      <div className="contenu">
        <h1>{data.c.title}</h1>
        <p className="adrs">{data.c.adressText}</p>
        <Horaire />
        <div className="box">
          <Phone />
          {mode ? "" : <Closed />}
        </div>
      </div>
    </div>
  )
}

export default Signature
