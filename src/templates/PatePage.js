import React from "react"
import { graphql, useStaticQuery } from "gatsby"

//component
import ProductPage from "../components/ProductPage"
//css
import "../css/productPage.scss"
//data
const getData = graphql`
  {
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
const PatePage = () => {
  const data = useStaticQuery(getData)

  return <ProductPage data={data} />
}

export default PatePage
