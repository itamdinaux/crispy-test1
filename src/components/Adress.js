import React from "react"
import { navigate } from "gatsby"

const Adresse = () => {
  let local = 0
  if (typeof window !== "undefined") {
    local = localStorage.adrs
  }
  const reset = () => {
  localStorage.clear()
  navigate("/")
  }
  return (
    <div>
      <hr />
      Votre adresse : {local}
      <button onClick={reset}>Ce n'est pas mon adresse</button>
      <hr />
    </div>
  )
}

export default Adresse
