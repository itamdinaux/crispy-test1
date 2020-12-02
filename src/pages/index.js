import React, { useState, useContext, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import BackgroundImage from "gatsby-background-image"
//component
import Livraison from "../components/Service/Livraison"
import Emporter from "../components/Service/Emporter"
import Closed from "../components/Service/Closed"
import Horaire from "../components/Branding/Horaire"
import Phone from "../components/Branding/Phone"

//context
import { Context } from "../context/Context"
//css
import "../css/index.scss"
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
      adresse {
        lon
        lat
      }
      adressText
    }
  }
`
const Index = () => {
  //data
  const data = useStaticQuery(getData)
  //adressMag
  const adressMag = data.c.adressText
  //context
  const context = useContext(Context)
  // ouvert - fermé
  const [mode, setMode] = useState(0)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMode(mode => context.mode)
    }
  }, [context])

  const [service, setService] = useState(0)

  return (
    <div className="container">
      {mode ? (
        <div className={`mode ${mode ? "open" : "closed"}`}>
          <div className="modeHeader">
            <button
              className={`active-${service ? "true" : "false"}`}
              onClick={() => setService(service => 1)}
            >
              Livraison
            </button>
            <button
              className={`active-${service ? "false" : "true"}`}
              onClick={() => setService(service => 0)}
            >
              A emporter
            </button>
          </div>
          <div className="modeContent">
            {service ? <Livraison /> : <Emporter />}
          </div>
        </div>
      ) : (
        <div className={`mode ${mode ? "open" : "closed"}`}>
          <div className="modeHeader">
            <button className={`active-${service ? "true" : "false"}`}>
              Le magasin est fermé
            </button>
          </div>
          <div className="modeContent">
            <Closed />
          </div>
        </div>
      )}

      <div className="signature">
        <BackgroundImage fluid={data.c.logoSombre.fluid} className="logo" />
        <div className="contenu">
          <h1>{data.c.title}</h1>
          <p className="adrs">{adressMag}</p>
          <Horaire />
          <Phone />
        </div>
      </div>
    </div>
  )
}

export default Index
