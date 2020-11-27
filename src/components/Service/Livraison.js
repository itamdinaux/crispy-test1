import React, { useState, useContext } from "react"
import {graphql, useStaticQuery} from "gatsby"
import { navigate } from "gatsby"
//context
import { Context } from "../../context/Context"
//data
const getData = graphql`
{
  c:contentfulConfig{
    distanceLivraison
  }
}`
const Livraison = () => {
  const data = useStaticQuery(getData)
  const context = useContext(Context)

  const [check, setCheck] = useState(0)

  const nav = service => {
    context.changeService(service)
    navigate("/pizza")
  }
  return (
    <div>
      {check === 1 ? (
        <>
          <input value="Avenue Théo Vanpé" readOnly={true} />
          <p>Vous êtes élligible à la livraison</p>
          <button onClick={() => nav(1)}>Commander à livrer</button>
        </>
      ) : check === 2 ? (
        <>
          <input value="Avenue Théo Vanpé" readOnly={true} />
          <p>
            Vous n'êtes pas élligible à la livraison. Mais vous pouvez toujours
            commander à emporter.
          </p>
          <button onClick={() => nav(2)}>Commander à emporter</button>
        </>
      ) : (
        <>
          <p>
            Nous ne livrons que dans un rayons de {data.c.distanceLivraison /1000}km. 
            Vérifiez que vous êtes élligible à la livraison.
          </p>
          <input />
          <button onClick={() => setCheck(check => 1)}>Check</button>
        </>
      )}
    </div>
  )
}

export default Livraison
