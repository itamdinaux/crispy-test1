import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
//components
import Panier from "../components/Panier"
//css
import "../css/productPage.scss"
//data
const getData = graphql`
  {
    c: allContentfulBoisson(sort: { fields: order, order: ASC }) {
      nodes {
        title
        slug
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
const BoissonPage = () => {
  const data = useStaticQuery(getData)


  return (
    <div
      className={`container product`}
    >
      
      <div className="contentSide">
        <div className="contentMain">
          {data.c.nodes.map((item, index) => {
            return (
              <div key={index} className={`productOne ${item.catgory}`}>
                <BackgroundImage fluid={item.image.fluid} className="bgProduct" />
                <h2>{item.title}</h2>
                <div>
                  à partir de <span>{item.prixRegular} €</span>
                  <div className="more">+</div>
                </div>
                <Link to={`/boisson/${item.slug}`}>aller aux options</Link>
              </div>
            )
          })}
        </div>
        <div className="sideBar"><Panier /></div>
      </div>
    </div>
  )
}

export default BoissonPage
