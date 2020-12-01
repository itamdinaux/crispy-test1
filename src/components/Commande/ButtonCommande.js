import React, { useState, useContext, useEffect } from "react"
//component
import ButtonValide from "../Commande/ButtonValide"
import ButtonClose from "../Commande/ButtonClose"
//context
import { Context } from "../../context/Context"
const ButtonCommande = () => {
  const context = useContext(Context)
  const [mode, setMode] = useState()
  useEffect(() => {
    setMode(mode => context.mode)
  }, [context])

  return <div>{mode ? <ButtonValide /> : <ButtonClose />}</div>
}

export default ButtonCommande
