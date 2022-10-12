import React from "react"
import { graphql } from "gatsby"

//component
import ProductPage from "../components/ProductPage"
// seo
import SEO from "../components/SEO"
//css
import "../css/productPage.scss"

const DessertPage = ({ data }) => {
  return (
    <>
      <SEO
        title={data.d.metaTitle}
        dsc={data.d.metaDsc.metaDsc}
        img={data.d.metaImg.fixed.src}
      />
      <ProductPage data={data} type="dessert" />
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
    c: allContentfulDessert(sort: { fields: order, order: ASC }) {
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

export default DessertPage
