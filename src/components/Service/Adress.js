import React, { useState, useContext, useEffect } from "react"
import { navigate } from "gatsby"
//context
import { Context } from "../../context/Context"
//css
import "../../css/adress.scss"
const Adress = () => {
  const context = useContext(Context)
  const [service, setService] = useState(0)
  const [mode, setMode] = useState(0)
  const [adrs, setAdrs] = useState()
  useEffect(() => {
    setService(service => context.service)
    setMode(mode => context.mode)
    setAdrs(adrs => context.adrs)
  }, [context])
  const reinitialisation = () => {
    context.changeService(0)
    context.changeAdrs("")
    navigate("/")
  }
  const selection = () => {
    navigate("/")
  }
  return (
    <div className="adressWrapper">
      <div className="adress container">
        <div className="flex flex-space">
          {mode ? (
            service ? (
              service === 1 ? (
                <>
                  <div className="element">
                    <p>
                      Vous avez choisi : <strong>Livraison</strong>
                    </p>

                    {service === 1 ? (
                      adrs !== "" ? (
                        <p className="adrs">{adrs}</p>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  <button onClick={() => reinitialisation()}>changer</button>
                </>
              ) : service === 2 ? (
                <>
                  <div className="element">
                    <p>
                      Vous avez choisi : <strong>à emporter</strong>
                    </p>
                  </div>

                  <button onClick={() => reinitialisation()}>changer</button>
                </>
              ) : (
                <div className="element">
                  <p>
                    Le restaurant est fermé, n'hésitez pas à revenir d'ici peu
                    de temps
                  </p>
                </div>
              )
            ) : (
              <>
                <div className="element">
                  Vous n'avez pas choisi de service (livraison ou à emporter)
                </div>
                <button onClick={() => selection()}>sélectionner</button>
              </>
            )
          ) : (
            <div className="element">
              <p>
                Le restaurant est fermé, n'hésitez pas à revenir d'ici peu de
                temps
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Adress
