import React, { useContext } from "react"
import { graphql, useStaticQuery } from "gatsby"

import { navigate } from "gatsby"
//context
import { Context } from "../../context/Context"
//data
const getData = graphql`
  {
    c: contentfulConfig {
      homeEmporter {
        homeEmporter
      }

    }
  }
`
const Emporter = () => {
    const mydata = useStaticQuery(getData)

  const context = useContext(Context)

  const nav = service => {
    context.changeService(service)

    navigate("/pizza")
  }
  return (
    <div>
            <p>{mydata.c.homeEmporter.homeEmporter}</p>
      <button onClick={() => nav(2)}>Commander à emporter</button>
    </div>
  )
}

export default Emporter
