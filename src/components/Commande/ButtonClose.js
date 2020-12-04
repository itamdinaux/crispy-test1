import React, { useContext } from "react"
import { navigate } from "gatsby"
//components
//context
import { Context } from "../../context/Context"
const ButtonClose = () => {
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
      <button onClick={() => change()}>Restaurant fermé</button>
    </div>
  )
}

export default ButtonClose
