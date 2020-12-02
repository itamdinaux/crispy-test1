import React, { useContext } from "react"
import BackgroundImage from "gatsby-background-image"
//components
import Panier from "../components/Panier"
import Time from "../components/Branding/Time"

//context
import { Context } from "../context/Context"
//css
import "../css/productPage.scss"

const DessertPage = ({ data }) => {
  //context
  const context = useContext(Context)
  //addPanier
  const addPanier = (title, prix, quantity) => {
    const nom = title
    const tailleName = ""
    const basePrice = prix
    let supList = []
    supList.push("0")
    const supSum = 0
    const total = basePrice + supSum

    context.changePanier(
      nom,
      tailleName,
      basePrice,
      supList,
      supSum,
      total,
      quantity
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
                <p className="dsc">{item.description.description}</p>
                <div className="price">
                  à partir de <span>{item.prix} €</span>
                  <div className="more">+</div>
                </div>
                <button
                  to={`/pizza/${item.slug}`}
                  onClick={() => addPanier(item.title, item.prix, 1)}
                >
                  aller aux options
                </button>
              </div>
            )
          })}
        </div>
        <div className="sideBar">
          <Panier /> <Time />
        </div>
      </div>
    </div>
  )
}

export default DessertPage
