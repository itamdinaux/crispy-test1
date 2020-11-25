import React from "react"
import { navigate } from "gatsby"

const Index = () => {
  const command = () => {
    localStorage.setItem("adrs", "Rue Steppé, 23 - 1030 Bruxelles")
    localStorage.setItem("order", JSON.stringify([]))
    localStorage.setItem("table", JSON.stringify([]))
    navigate("/pizza")
  }

  return (
    <div>
      {localStorage.getItem("adrs") ? (
        "Un problème ? "
      ) : (
        <div className="adresse">
          <h2>Quel est votre adresse?</h2>
          <input type="text" />
          <button onClick={command}>commencer ma commande</button>
        </div>
      )}
    </div>
  )
}

export default Index
