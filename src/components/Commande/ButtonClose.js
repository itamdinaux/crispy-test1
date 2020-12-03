import React from "react"
import { navigate } from "gatsby"
//components
const ButtonClose = () => {
  return (
    <div className="buttonCommande">
      <button onClick={() => navigate("/commande")}>Restaurant fermé</button>
    </div>
  )
}

export default ButtonClose
