import React, { useState, useEffect } from "react"

const OrderModif = ({ location }) => {
  let order = JSON.parse(localStorage.getItem("order"))
  let table = JSON.parse(localStorage.getItem("table"))

  const [commande, setCommande] = useState(table)

  const addElement = (index, price, quantity, name, dsc, amount) => {
    order[index] = { price: price, quantity: quantity + 1 }
    table[index] = {
      name: name,
      dsc: dsc,
      quantity: quantity + 1,
      amount: amount,
    }
    localStorage.setItem("order", JSON.stringify(order))
    localStorage.setItem("table", JSON.stringify(table))
  }
  const removeElement = (index, price, quantity, name, dsc, amount) => {
    if (quantity === 1) {
      deleteElement(index)
    } else {
      order[index] = { price: price, quantity: quantity - 1 }
      table[index] = {
        name: name,
        dsc: dsc,
        quantity: quantity - 1,
        amount: amount,
      }
      localStorage.setItem("order", JSON.stringify(order))
      localStorage.setItem("table", JSON.stringify(table))
    }
  }
  const deleteElement = index => {
    console.log(index)
    if (order.length > 1) {
      order.splice(index, 1)
      table.splice(index, 1)
      localStorage.setItem("order", JSON.stringify(order))
      localStorage.setItem("table", JSON.stringify(table))
    } else {
      order = []
      table = []
      localStorage.setItem("order", JSON.stringify(order))
      localStorage.setItem("table", JSON.stringify(table))
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setCommande(commande => JSON.parse(localStorage.getItem("table")))
    }, 100)
    return () => clearInterval(interval)
  }, [setCommande])
  return (
    <div>
      <h2>Modification de la commande</h2>
      {commande.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>-</th>
              <th>Produit</th>
              <th>Quantité</th>
              <th>Prix / unité</th>
              <th>Prix </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {commande.map((item, index) => {
              return (
                <tr key={index} className="table-order">
                  <td>
                    <button onClick={() => deleteElement(index)}>x</button>
                  </td>
                  <td>
                    {item.name}
                    <span className="dsc">{item.dsc}</span>
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.amount} cent</td>
                  <td>{item.amount * item.quantity} cent</td>
                  <td>
                    <button
                      onClick={() =>
                        removeElement(
                          index,
                          item.price,
                          item.quantity,
                          item.name,
                          item.dsc,
                          item.amount
                        )
                      }
                    >
                      -
                    </button>
                    <button
                      onClick={() =>
                        addElement(
                          index,
                          item.price,
                          item.quantity,
                          item.name,
                          item.dsc,
                          item.amount
                        )
                      }
                    >
                      +
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        "votre panier est vide"
      )}
    </div>
  )
}

export default OrderModif
