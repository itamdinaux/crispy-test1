import React, { useState, useContext, useEffect } from "react"
//context
import { Context } from "../context/Context"
//css
import "../css/panier.scss"
const Panier = () => {
  const context = useContext(Context)

  const [service, setService] = useState(context.service)

  const [commande, setCommande] = useState(context)
  const [calculTotal, setCalculTotal] = useState(0)

  useEffect(() => {
    setService(service => context.service)
    setCommande(commande => context)
    //calcul Total
    setCalculTotal(0)
    commande.panier.map(item => {
      setCalculTotal(calculTotal => calculTotal + item.total)
      return false
    })
  }, [context, commande])

  const addItem = (index, quantity, basePrice, supSum) => {
    context.addPanier(index, quantity, basePrice, supSum)
  }
  const removeItem = (index, quantity, basePrice, supSum) => {
    if (quantity === 1) {
      context.deletePanier(index)
    } else {
      context.removePanier(index, quantity, basePrice, supSum)
    }
  }
  const deleteItem = (index) => {
      context.deletePanier(index)
    
  }

  return (
    <div>
      <h2>Ma commande ({service ? service === 1 ? "Livraison" : service === 2 ?"Emporter" :"Magazin fermé": "non defini"})</h2>

      <table className="panier">
        <tbody>
          {typeof window !== "undefined" ? (
            commande.panier.length !== 0 ? (
              commande.panier.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {item.nom} {item.tailleName}
                      <div
                        className={`supp ${item.supList.map(item => {
                          if (item === "0") {
                            return "none"
                          }
                          return false
                        })}`}
                      >
                        Supp. :
                        {item.supList.map((item, index) => {
                          return <span key={index}>{item}</span>
                        })}
                      </div>
                      <div className="quantity">
                        <button
                          onClick={() =>
                            removeItem(
                              index,
                              item.quantity,
                              item.basePrice,
                              item.supSum
                            )
                          }
                        >
                          -
                        </button>
                        {item.quantity}
                        <button
                          onClick={() =>
                            addItem(
                              index,
                              item.quantity,
                              item.basePrice,
                              item.supSum
                            )
                          }
                        >
                          +
                        </button>
                        <button
                          onClick={() =>
                            deleteItem(
                              index
                            )
                          }
                        >
                          x
                        </button>
                      </div>
                    </td>
                    <td>{item.total} €</td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td>panier vide</td>
              </tr>
            )
          ) : (
            ""
          )}
        </tbody>
        {typeof window !== "undefined" ? (
          commande.panier.length !== 0 ? (
            <tfoot>
              <tr>
                <td>Total</td>
                <td>{calculTotal} €</td>
              </tr>
            </tfoot>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </table>
    </div>
  )
}

export default Panier
