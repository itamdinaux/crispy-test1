import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

const Order = () => {
  let table = JSON.parse(localStorage.getItem("table"))
  const [commande, setCommande] = useState(table)

  useEffect(() => {
    const interval = setInterval(() => {
      let table = JSON.parse(localStorage.getItem("table"))
      setCommande(commande => table)
    }, 100)
    return () => clearInterval(interval)
  }, [])
  return (
    <div>
      <h2>Commande</h2>
      {commande ? (
        <>
          <table className="table-order">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Quantity</th>
                <th>Prix</th>
              </tr>
            </thead>
            <tbody>
              {commande.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {item.name}
                      <span>{item.dsc}</span>
                    </td>
                    <td>{item.quantity}</td>
                    <td className="total">{item.amount * item.quantity}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <Link to="/order">modifier</Link>
          <Link to="/validate">valider</Link>
        </>
      ) : (
        "Panier vide"
      )}
    </div>
  )
}

export default Order
