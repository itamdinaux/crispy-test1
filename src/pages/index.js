import React, { useState, useContext, useEffect } from "react"
//component
import Livraison from "../components/Service/Livraison"
import Emporter from "../components/Service/Emporter"
import Closed from "../components/Service/Closed"
//context
import { Context } from "../context/Context"
//css
import "../css/index.scss"

const Index = () => {
  const context = useContext(Context)
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
              Fermé
            </button>
          </div>
          <div className="modeContent">
            <Closed />
          </div>
        </div>
      )}

      <div className="signature">
        Image
        <div>
          <h1>Title</h1>
          <p></p>
          <a href="/">Lien</a>
        </div>
      </div>
    </div>
  )
}

export default Index
