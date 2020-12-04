import React, { useContext } from "react"
import { navigate } from "gatsby"
//context
import { Context } from "../../context/Context"
const ButtonValide = () => {
  const context = useContext(Context)

  const change = () => {
    navigate("/commande")
    if (context.mobilePanier) {
      context.changeMobilePanier()
    }
    if (context.mobileMenu) {
      context.changeMobileMenu()
    }
  }
  return (
    <div className="buttonCommande">
      <button onClick={() => change()}>Valider</button>
    </div>
  )
}

export default ButtonValide
