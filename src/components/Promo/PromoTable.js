import React, { useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"

const getData = graphql`
  {
    c: allContentfulPromo {
      nodes {
        objConditionNbr
        objConditionOp
        objConditionProd {
          slug
        }
        objPromoPrice
      }
    }
  }
`
const PromoTable = ({ context }) => {
  const data = useStaticQuery(getData)

  useEffect(() => {
    let promo = []
    data.c.nodes.map((item, index) => {
      promo[index] = [
        item.objConditionNbr,
        [
          item.objConditionProd.map(elm => {
            return elm.slug
          }),
        ],
        item.objConditionOp[0],
        item.objPromoPrice,
      ]
      return true
    })
    /*
    console.log("---------promo")
    console.log(promo)
*/
    context.panier.map(item => {
      return true
    })
  }, [context.panier, data.c.nodes])

  return (
    <thead>
      <tr>
        <td colSpan="2">PromoTable</td>
      </tr>
      <tr></tr>
    </thead>
  )
}

export default PromoTable
