import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"

const getData = graphql`
  {
    c: allContentfulPromo {
      nodes {
        id
        objConditionNbr
        objConditionOp
        objConditionProd {
          slug
        }
        objPromoPrice
        timeCondition
        title
        msgToGetPromo {
          msgToGetPromo
        }
      }
    }
    t: allContentfulTypeProduct {
      nodes {
        slug
      }
    }
  }
`
const PromoTable = ({ context }) => {
  const data = useStaticQuery(getData)
  const [myPromo, setMyPromo] = useState([])

  //listPormo
  let promo = []
  data.c.nodes.map((item, index) => {
    let id = item.id
    let obj = item.objConditionNbr
    let prod = item.objConditionProd
    let count = 0
    let state = 0
    setMyPromo(myPromo => [...myPromo, { state }])

    promo = [...promo, { id, obj, prod, count }]

    return true
  })
  useEffect(() => {
    //listProduct
    let listProduct = []
    data.t.nodes.map(item => {
      listProduct[item.slug] = 0
      return true
    })

    context.panier.map(item => {
      listProduct[item.type] = listProduct[item.type] + item.quantity

      return true
    })

    //promo
    data.c.nodes.map((item, index) => {
      let count = 0
      item.objConditionProd.map(item => {
        count = count + listProduct[item.slug]

        return true
      })
      promo[index].count = count

      if (promo[index].count === promo[index].obj) {
        let state = 1
        setMyPromo(myPromo => [...myPromo, { state }])
      }
      return true
    })
    /*
    console.log("---------listProduct")
    console.log(listProduct)
    console.log("---------promo")
    console.log(promo)
    */
  })
  return (
    <thead>
      <tr>
        <td colSpan="2">PromoTable</td>
      </tr>
      {data.c.nodes.map((item, index) => {
        if (myPromo[index] === 1) {
          console.log(item)
        }
        return true
      })}
    </thead>
  )
}

export default PromoTable
