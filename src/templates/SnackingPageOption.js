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
  const t = "snacking"

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
    navigate("/snacking")
  }
  console.log(data)
  // rewrite metaTitle
  const metaTitleTable = data.e.snackingMetaTitle.split(" ")
  const metaDscTable = data.e.snackingMetaDsc.snackingMetaDsc.split(" ")
  const findName = e => e === "[*]"
  const metaTitleIndex = metaTitleTable.findIndex(findName)
  const metaDscIndex = metaDscTable.findIndex(findName)
  metaTitleTable[metaTitleIndex] = data.c.title
  metaDscTable[metaDscIndex] = data.c.title
  const metaTitle = metaTitleTable.join(" ")
  const metaDsc = metaDscTable.join(" ")
  return (
    <>
      <SEO title={metaTitle} dsc={metaDsc} img={data.c.image.fixed.src} />
      <div className={`container pizzaOption boisson`}>
        <div className="fullWidth return">
          <Link to="/snacking">Retour</Link>
        </div>
        <div className="contentSide">
          <div className="contentMain">
            <BackgroundImage fluid={data.c.image.fluid} className="bgPizza" />
            <div className="contentPizza">
              <h1>{data.c.title}</h1>

              <div className="action ">
                <button
                  onClick={() =>
                    result(
                      data.c.title,
                      data.c.sizeRegular,
                      data.c.prixRegular,
                      1,
                      t
                    )
                  }
                >
                  {data.c.sizeRegular} <span>{data.c.prixRegular}€</span>
                </button>
                <button
                  onClick={() =>
                    result(data.c.title, data.c.sizeMaxi, data.c.prixMaxi, 1, t)
                  }
                >
                  {data.c.sizeMaxi} <span>{data.c.prixMaxi} €</span>
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
    c: contentfulSnacking(id: { eq: $id }) {
      title
      prixRegular
      prixMaxi
      sizeRegular
      sizeMaxi
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
        fixed {
          src
        }
      }
    }
    e: contentfulConfig {
      snackingMetaTitle
      snackingMetaDsc {
        snackingMetaDsc
      }
    }
  }
`

export default BoissonPage
