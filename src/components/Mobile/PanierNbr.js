import React, { useState, useEffect, useContext } from "react"
import { Context } from "../../context/Context"
import Basket from "../../assets/icon/basket.svg"

/* components */

const PanierNbr = () => {
  const context = useContext(Context)
  const [nbr, setNbr] = useState(0)

  useEffect(() => {
    let t = 0
    if (context.panier.length > 0) {
      context.panier.map(item => {
        t = t + item.quantity
        return true
      })
    }
    setNbr(nbr => t)
  }, [context])
  return (
    <div className="icon">
      <Basket />
      <span className="nbr">{nbr}</span>
    </div>
  )
}

export default PanierNbr
