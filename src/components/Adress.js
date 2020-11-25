import React from "react"
import { navigate } from "gatsby"

const Adresse = () => {
  const reset = () => {
  localStorage.clear()
  navigate("/")
  }
  return (
    <div>
      <hr />
      Votre adresse : {localStorage.adrs}
      <button onClick={reset}>Ce n'est pas mon adresse</button>
      <hr />
    </div>
  )
}

export default Adresse
