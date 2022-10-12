import React from "react"
import { graphql } from "gatsby"

//component
import ProductPage from "../components/ProductPage"
// seo
import SEO from "../components/SEO"
//css
import "../css/productPage.scss"

const SaladePage = ({ data }) => {
  return (
    <>
      <SEO
        title={data.d.metaTitle}
        dsc={data.d.metaDsc.metaDsc}
        img={data.d.metaImg.fixed.src}
      />
      <ProductPage data={data} type="salade" />
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
    c: allContentfulSalade(sort: { fields: order, order: ASC }) {
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

export default SaladePage
