import React from "react"
//component
import OrderModif from "../components/OrderModif"
const Validate = () => {
  return (
    <div>
      <OrderModif />
      <h2>Coordonnées</h2>
      <h2>Adresse de livraison</h2>
      <p>{localStorage.getItem("adrs")}</p>
    </div>
  )
}

export default Validate
