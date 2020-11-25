import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

//data
const getData = graphql`
  {
    c: allContentfulTypeProduct(sort: { fields: order, order: ASC }) {
      nodes {
        slug
        title
      }
    }
  }
`
const MainMenu = () => {
  const data = useStaticQuery(getData)
  return (
    <ul className="mainMenu">
      {data.c.nodes.map((item, index) => {
        return (
          <li key={index}>
            <Link to={`/${item.slug}`}>{item.title}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default MainMenu
