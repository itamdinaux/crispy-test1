import React, { useState, useContext, useEffect } from "react"
import { graphql } from "gatsby"
//component

import Livraison from "../components/Service/Livraison"
import Emporter from "../components/Service/Emporter"
import Closed from "../components/Service/Closed"
import Signature from "../components/Branding/Signature"
// seo
import SEO from "../components/SEO"
//context
import { Context } from "../context/Context"
//css
import "../css/index.scss"

const Index = ({ data }) => {
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
    <>
      <SEO
        title="Accueil"
        dsc={data.c.siteDsc.siteDsc}
        img={data.c.homeImage.fixed.src}
      />
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
                Le restaurant est fermé
              </button>
            </div>
            <div className="modeContent">
              <Closed />
            </div>
          </div>
        )}

        <Signature />
      </div>
    </>
  )
}
export const query = graphql`
  query($id: String) {
    c: contentfulInfo(id: { eq: $id }) {
      title
      siteDsc {
        siteDsc
      }
      homeImage {
        fixed {
          src
        }
      }
    }
  }
`
export default Index
