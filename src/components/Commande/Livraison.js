import React, { useState, useContext, useEffect } from "react"
//components
import Phone from "../Branding/Phone"
//context
import { Context } from "../../context/Context"
const Livraison = () => {
  const context = useContext(Context)
  const [adrs, setAdrs] = useState()

  useEffect(() => {
    setAdrs(adrs => context.adrs)
  }, [context])
  return (
    <>
      <h2>Livraison</h2>
      <div className="flex">
        <div>
          <p>
            Vous n'avez plus qu'à appeler pour que nous préparions votre
            commande. Le délais de préparation est de +/- 30min. N'hésitez pas à
            nous poser la question.
          </p>
        </div>
        <div>
          <h3>Adresse de livraison accepté</h3>
          <p>{adrs}</p>
          <Phone />
        </div>
      </div>
    </>
  )
}

export default Livraison
