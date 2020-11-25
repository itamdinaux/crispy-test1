import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
//data
const getData = graphql`
  {
    c: allContentfulLegalInfo(sort: { fields: contentful_id, order: ASC }) {
      nodes {
        slug
        title
      }
    }
  }
`
const MenuLegal = () => {
  const data = useStaticQuery(getData)
  return (
    <ul className="legalMenu">
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

export default MenuLegal
