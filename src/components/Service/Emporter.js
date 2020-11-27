import React, { useContext } from "react"
import { navigate } from "gatsby"
//context
import { Context } from "../../context/Context"
const Emporter = () => {
  const context = useContext(Context)

  const nav = service => {
    context.changeService(service)

    navigate("/pizza")
  }
  return (
    <div>
      <p>text</p>
      <button onClick={() => nav(2)}>Commander à emporter</button>
    </div>
  )
}

export default Emporter
