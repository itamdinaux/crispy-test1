import React from "react"
import { navigate } from "gatsby"

const ButtonValide = () => {
  return (
    <div className="buttonCommande">
      <button onClick={() => navigate("/commande")}>Valider</button>
    </div>
  )
}

export default ButtonValide
