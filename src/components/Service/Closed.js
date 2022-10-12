import React, { useContext } from "react"
import { navigate } from "gatsby"
//context
import { Context } from "../../context/Context"
const Closed = () => {
  const context = useContext(Context)

  const nav = service => {
    context.changeService(service)

    navigate("/pizza")
  }
  return (
    <div className="closed">
      {/*}<p>Nous sommes fermé. Mais vous pouvez quand même consulter notre menu. </p>{*/}
      <button onClick={() => nav(3)}>Aller au menu</button>
    </div>
  )
}

export default Closed
