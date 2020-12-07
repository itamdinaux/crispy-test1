import React, { useContext } from "react"
import { graphql, Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import { navigate } from "gatsby"

//components
import Panier from "../components/Panier"
import Time from "../components/Branding/Time"
// seo
import SEO from "../components/SEO"
//context
import { Context } from "../context/Context"
//css

const BoissonPage = ({ data }) => {
  //context
  const context = useContext(Context)
  const t = "boisson"

  const result = (nom, tailleName, price, quantity, t) => {
    let supList = []
    supList.push("0")
    const supSum = 0
    const total = price + supSum
    const type = t
    context.changePanier(
      nom,
      tailleName,
      price,
      supList,
      supSum,
      total,
      quantity,
      type
    )
    navigate("/boisson")
  }
  return (
    <>
      <SEO
        title={data.c.title}
        dsc={data.c.metaDsc.metaDsc}
        img={data.c.image.fixed.src}
      />
      <div className={`container pizzaOption boisson`}>
        <div className="fullWidth return">
          <Link to="/boisson">Retour</Link>
        </div>
        <div className="contentSide">
          <div className="contentMain">
            <BackgroundImage fluid={data.c.image.fluid} className="bgPizza" />
            <div className="contentPizza">
              <h1>{data.c.title}</h1>

              <div className="action ">
                <button
                  onClick={() =>
                    result(data.c.title, "33cl", data.c.prixRegular, 1, t)
                  }
                >
                  33cl <span>{data.c.prixRegular}€</span>
                </button>
                <button
                  onClick={() =>
                    result(data.c.title, "1,5l", data.c.prixMaxi, 1, t)
                  }
                >
                  1,5l <span>{data.c.prixMaxi} €</span>
                </button>
              </div>
            </div>
          </div>
          <div className="sideBar">
            <Panier /> <Time />
          </div>
        </div>
      </div>
    </>
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
        fixed {
          src
        }
      }
      metaDsc {
        metaDsc
      }
    }
  }
`

export default BoissonPage
