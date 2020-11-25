import React from "react"
import { graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"

//components
//css
import "../css/pizza-page-option.scss"
const PizzaPage = ({ data }) => {
  return (
    <div className={`container pizzaOption `}>
      <div className="fullWidth return">Return</div>
      <div className="contentSide">
        <div className="contentMain">
          <BackgroundImage fluid={data.c.image.fluid} className="bgPizza" />
          <div className="contentPizza">
            <h1>{data.c.title}</h1>
            <p>{data.c.description.description}</p>
            <h2>Taille</h2>
            <div className="taille">
              <button>
                Regular<span>{data.c.prixRegular} €</span>
              </button>
              <button>
                Maxi<span>{data.c.prixMaxi} €</span>
              </button>
            </div>
            <h2>Supplément</h2>
            <h3>Légumes</h3>
            {data.d.nodes.map((item, index) => {
              return (
                <button key={index}>
                  {item.title}
                  <span>{item.priceRegular}</span>
                </button>
              )
            })}
            <h3>Viandes</h3>
            {data.e.nodes.map((item, index) => {
              return (
                <button key={index}>
                  {item.title}
                  <span>{item.priceRegular}</span>
                </button>
              )
            })}
            <h3>Poisson</h3>
            {data.f.nodes.map((item, index) => {
              return (
                <button key={index}>
                  {item.title}
                  <span>{item.priceRegular}</span>
                </button>
              )
            })}
            <div className="action">
              <button>Ajouter au panier</button>
            </div>
          </div>
        </div>
        <div className="sideBar">sidebar</div>
      </div>
    </div>
  )
}

export const query = graphql`
  query($id: String) {
    c: contentfulPizza(id: { eq: $id }) {
      title
      description {
        description
      }
      prixRegular
      prixMaxi
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }
    d: allContentfulSupplement(
      filter: { type: { eq: "légumes" } }
      sort: { fields: title, order: ASC }
    ) {
      nodes {
        title
        prixRegular
        prixMaxi
      }
    }
    e: allContentfulSupplement(
      filter: { type: { eq: "viandes" } }
      sort: { fields: title, order: ASC }
    ) {
      nodes {
        title
        prixRegular
        prixMaxi
      }
    }
    f: allContentfulSupplement(
      filter: { type: { eq: "poissons" } }
      sort: { fields: title, order: ASC }
    ) {
      nodes {
        title
        prixRegular
        prixMaxi
      }
    }
  }
`

export default PizzaPage
