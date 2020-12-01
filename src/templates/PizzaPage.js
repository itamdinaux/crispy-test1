import React, { useState } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
//components
import Panier from "../components/Panier"
//css
import "../css/productPage.scss"
//data
const getData = graphql`
  {
    c: allContentfulPizza(sort: { fields: order, order: ASC }) {
      nodes {
        title
        slug
        catgory
        description {
          description
        }
        prixRegular
        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`
const PizzaPage = () => {
  const data = useStaticQuery(getData)
  const [trad, setTrad] = useState(0)
  const [spec, setSpec] = useState(0)
  const [blc, setBlc] = useState(0)

  const changeFiltre = filtre => {
    if (filtre === "trad") {
      setTrad(trad => 1)
      setSpec(spec => 0)
      setBlc(blc => 0)
    } else if (filtre === "spec") {
      setTrad(trad => 0)
      setSpec(spec => 1)
      setBlc(blc => 0)
    } else if (filtre === "blc") {
      setTrad(trad => 0)
      setSpec(spec => 0)
      setBlc(blc => 1)
    } else {
      setTrad(trad => 0)
      setSpec(spec => 0)
      setBlc(blc => 0)
    }
  }
  return (
    <div
      className={`container product ${trad ? "traditionnelle" : ""} ${
        spec ? "speciale" : ""
      } ${blc ? "blanche" : ""}`}
    >
      <div className="fullWidth">
        Filtre :
        <div className="filtre">
          <button
            onClick={() => changeFiltre("trad")}
            className={`active-${trad ? "true" : "false"}`}
          >
            Traditionnelle
          </button>
          <button
            onClick={() => changeFiltre("spec")}
            className={`active-${spec ? "true" : "false"}`}
          >
            Spéciale
          </button>
          <button
            onClick={() => changeFiltre("blc")}
            className={`active-${blc ? "true" : "false"}`}
          >
            Blanche
          </button>
          {trad || spec || blc ? <button onClick={() => changeFiltre()} className="delete">x</button> : ""}
          
        </div>
      </div>
      <div className="contentSide">
        <div className="contentMain">
          {data.c.nodes.map((item, index) => {
            return (
              <div key={index} className={`productOne ${item.catgory}`}>
                <BackgroundImage
                  fluid={item.image.fluid}
                  className="bgProduct"
                />
                <h2>{item.title}</h2>
                <p className="dsc">{item.description.description}</p>
                <div className="price">
                  à partir de <span>{item.prixRegular} €</span>
                  <div className="more">+</div>
                </div>
                <Link to={`/pizza/${item.slug}`}>aller aux options</Link>
              </div>
            )
          })}
        </div>
        <div className="sideBar">
          <Panier />
        </div>
      </div>
    </div>
  )
}

export default PizzaPage
