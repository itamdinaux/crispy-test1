import React, { useContext } from "react"
import { graphql, Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
//components
import Panier from "../components/Panier"
import Time from "../components/Branding/Time"
// seo
import SEO from "../components/SEO"
//context
import { Context } from "../context/Context"
//css
import "../css/productPage.scss"

const BoissonPage = ({ data }) => {
  const t = "boisson"

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
    <>
      <SEO
        title={data.d.title}
        dsc={data.d.metaDsc.metaDsc}
        img={data.d.metaImg.fixed.src}
      />
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
    </>
  )
}
export const query = graphql`
  query($id: String) {
    d: contentfulTypeProduct(id: { eq: $id }) {
      title
      metaDsc {
        metaDsc
      }
      metaImg {
        fixed {
          src
        }
      }
    }
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

export default BoissonPage
