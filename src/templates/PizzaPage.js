import React, { useState } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
//components
//css
import "../css/pizza-page.scss"
//data
const getData = graphql`
  {
    c: allContentfulPizza(sort: { fields: order, order: ASC }) {
      nodes {
        title
        slug
        catgory
        description {
          description
        }
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
const PizzaPage = () => {
  const data = useStaticQuery(getData)
  const [trad, setTrad] = useState(0)
  const [spec, setSpec] = useState(0)
  const [blc, setBlc] = useState(0)

  return (
    <div
      className={`container pizza ${trad ? "traditionnelle" : ""} ${
        spec ? "speciale" : ""
      } ${blc ? "blanche" : ""}`}
    >
      <div className="fullWidth">
        Filtre :
        <div className="filtre">
          <button onClick={() => setTrad(trad => !trad)}>Traditionnelle</button>
          <button onClick={() => setSpec(spec => !spec)}>Spéciale</button>
          <button onClick={() => setBlc(blc => !blc)}>Blanche</button>
        </div>
      </div>
      <div className="contentSide">
        <div className="contentMain">
          {data.c.nodes.map((item, index) => {
            return (
              <div key={index} className={`pizzaOne ${item.catgory}`}>
                <BackgroundImage fluid={item.image.fluid} className="bgPizza" />
                <h2>{item.title}</h2>
                <p>{item.description.description}</p>
                <div>
                  à partir de <span>{item.prixRegular} €</span>
                  <div className="more">+</div>
                </div>
                <Link to={`/pizza/${item.slug}`}>aller aux options</Link>
              </div>
            )
          })}
        </div>
        <div className="sideBar">sidebar</div>
      </div>
    </div>
  )
}

export default PizzaPage
