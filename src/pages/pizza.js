import React from "react"
import { graphql, useStaticQuery } from "gatsby"

// data
const getData = graphql`
  {
    trad: allStripePrice(
      filter: {
        product: {
          metadata: {
            type: { eq: "pizza" }
            sousType: { eq: "traditionnelle" }
          }
        }
      }
    ) {
      nodes {
        product {
          name
          description
          metadata {
            sousType
            taille
          }
        }
        unit_amount
        id
      }
    }
  }
`
const Pizza = () => {
  const data = useStaticQuery(getData)
  let order = JSON.parse(localStorage.getItem("order"))
  let table = JSON.parse(localStorage.getItem("table"))

  const addElement = (price, quantity, name, dsc, amount) => {
    if (order.findIndex(i => i.price === price) !== -1) {
      let i = order.findIndex(i => i.price === price)
      order[i] = { price: price, quantity: order[i].quantity + 1 }
      table[i] = {
        name: name,
        dsc: dsc,
        quantity: table[i].quantity + 1,
        amount: amount,
      }
      localStorage.setItem("order", JSON.stringify(order))
      localStorage.setItem("table", JSON.stringify(table))
    } else {
      order = [...order, { price, quantity }]
      table = [...table, { name, dsc, quantity, amount }]
      localStorage.setItem("order", JSON.stringify(order))
      localStorage.setItem("table", JSON.stringify(table))
    }
    console.log(localStorage.order)
  }

  return (
    <div>
      <h2>Pizza</h2>
      <div>
        <h3>Traditionnelle</h3>
        {data.trad.nodes.map((item, index) => {
          return (
            <div key={index}>
              <h4>{item.product.name}</h4>
              <button
                onClick={() =>
                  addElement(
                    item.id,
                    1,
                    item.product.name,
                    item.product.description,
                    item.unit_amount
                  )
                }
              >
                Ajouter
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Pizza
