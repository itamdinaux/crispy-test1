import React from "react"
import { graphql, useStaticQuery } from "gatsby"
//components
import Phone from "../Branding/Phone"
//data
const getData = graphql`
  {
    c: contentfulInfo {
      title
      adressText
    }
  }
`
const Emporter = () => {
  //data
  const data = useStaticQuery(getData)
  return (
    <>
      <h2>Emporter</h2>
      <div className="flex">
        <div>
          <p>
            Vous n'avez plus qu'à appeler pour que nous préparions votre
            commande. Le délais de préparation est de +/- 30min. N'hésitez pas à
            nous poser la question.
          </p>
        </div>
        <div>
          <h3>{data.c.title}</h3>
          <p>{data.c.adressText}</p>
          <Phone />
        </div>
      </div>
    </>
  )
}

export default Emporter
