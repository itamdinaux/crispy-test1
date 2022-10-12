import React from "react"

import { graphql, Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
//components
import Panier from "../components/Panier"
import Time from "../components/Branding/Time"
// seo
import SEO from "../components/SEO"
//css
import "../css/productPage.scss"

const PatePage = ({ data }) => {
  return (
    <>
      <SEO
        title={data.d.metaTitle}
        dsc={data.d.metaDsc.metaDsc}
        img={data.d.metaImg.fixed.src}
      />
      <div className={`container product `}>
        <div className="contentSide">
          <div className="contentMain">
            {data.c.nodes.map((item, index) => {
              return (
                <div key={index} className={`productOne `}>
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
                  <Link to={`/pate/${item.slug}`}>aller aux options</Link>
                </div>
              )
            })}
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
    d: contentfulTypeProduct(id: { eq: $id }) {
      title
      metaTitle
      metaDsc {
        metaDsc
      }
      metaImg {
        fixed {
          src
        }
      }
    }
    c: allContentfulPate(sort: { fields: order, order: ASC }) {
      nodes {
        title
        slug
        description {
          description
        }
        prix
        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`
export default PatePage
