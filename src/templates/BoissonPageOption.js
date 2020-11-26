import React, { useContext } from "react"
import { graphql, Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import { navigate } from "gatsby"

//components
import Panier from "../components/Panier"
//context
import { Context } from "../context/Context"
//css

const BoissonPage = ({ data }) => {
  //context
  const context = useContext(Context)

  const result = (nom, tailleName, price, quantity) => {
    let supList = []
    supList.push("0")
    const supSum = 0
    const total = price + supSum

    context.changePanier(
      nom,
      tailleName,
      price,
      supList,
      supSum,
      total,
      quantity
    )
    navigate("/boisson")
  }
  return (
    <div className={`container pizzaOption `}>
      <div className="fullWidth return">
        <Link to="/pizza">Retour</Link>
      </div>
      <div className="contentSide">
        <div className="contentMain">
          <BackgroundImage fluid={data.c.image.fluid} className="bgPizza" />
          <div className="contentPizza">
            <h1>{data.c.title}</h1>

            <div className="action">
              <button
                onClick={() =>
                  result(data.c.title, "33cl", data.c.prixRegular, 1)
                }
              >
                33cl {data.c.prixRegular}€
              </button>
              <button
                onClick={() => result(data.c.title, "1,5l", data.c.prixMaxi, 1)}
              >
                1,5l {data.c.prixMaxi} €
              </button>
            </div>
          </div>
        </div>
        <div className="sideBar">
          sidebar
          <Panier />
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
  query($id: String) {
    c: contentfulBoisson(id: { eq: $id }) {
      title
      prixRegular
      prixMaxi
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`

export default BoissonPage
