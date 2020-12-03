import React, { useContext } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
//components
import Panier from "../components/Panier"
import Time from "../components/Branding/Time"
//context
import { Context } from "../context/Context"
//css
import "../css/productPage.scss"
//data
const getData = graphql`
  {
    c: allContentfulBoisson(sort: { fields: order, order: ASC }) {
      nodes {
        title
        slug
        type
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
const BoissonPage = () => {
  const t = "boisson"

  const data = useStaticQuery(getData)
  //context
  const context = useContext(Context)
  //addPanier
  const addPanier = (title, prix, quantity, description, t) => {
    const nom = title
    const tailleName = description
    const basePrice = prix
    let supList = []
    supList.push("0")
    const supSum = 0
    const total = basePrice + supSum
    const type = t
    context.changePanier(
      nom,
      tailleName,
      basePrice,
      supList,
      supSum,
      total,
      quantity,
      type
    )
  }

  return (
    <div className={`container product`}>
      <div className="contentSide">
        <div className="contentMain">
          {data.c.nodes.map((item, index) => {
            return (
              <div key={index} className={`productOne`}>
                <BackgroundImage
                  fluid={item.image.fluid}
                  className="bgProduct"
                />
                <h2>{item.title}</h2>
                <div className="price">
                  à partir de <span>{item.prixRegular} €</span>
                  <div className="more">+</div>
                </div>
                {item.type.length > 1 ? (
                  <Link to={`/boisson/${item.slug}`}>aller aux options</Link>
                ) : (
                  <button
                    onClick={() =>
                      addPanier(item.title, item.prixRegular, 1, "33cl", t)
                    }
                  >
                    aller aux options
                  </button>
                )}
              </div>
            )
          })}
        </div>
        <div className="sideBar">
          <Panier />
          <Time />
        </div>
      </div>
    </div>
  )
}

export default BoissonPage
