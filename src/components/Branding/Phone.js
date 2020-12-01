import React from "react"
import { graphql, useStaticQuery } from "gatsby"
//data
const getData = graphql`
  {
    c: contentfulInfo {
      phoneLink
      phoneTitle
    }
  }
`

const Phone = () => {
  const data = useStaticQuery(getData)
  return (
    <div className="phone">
      <a href={`tel:${data.c.phoneLink}`}>{data.c.phoneTitle}</a>
    </div>
  )
}

export default Phone
