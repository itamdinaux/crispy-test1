import React, { useState, useContext, useEffect } from "react"
//components
import ButtonCommand from "../components/Commande/ButtonCommande"
//import PromoTable from "../components/Promo/PromoTable"
//context
import { Context } from "../context/Context"
//css
import "../css/panier.scss"
const Panier = () => {
  const context = useContext(Context)

  const [service, setService] = useState(0)

  const [commande, setCommande] = useState(context)
  //const [calculTotal, setCalculTotal] = useState(0)

  useEffect(() => {
    setService(service => context.service)
    setCommande(commande => context)
    //calcul Total
    //setCalculTotal(0)
    commande.panier.map(item => {
      //setCalculTotal(calculTotal => calculTotal + item.total)
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
  const deleteItem = index => {
    context.deletePanier(index)
  }

  return (
    <div className="sidebarContent">
      <h2 className="commandeTitle">
        Ma commande
        {service ? (
          service === 1 ? (
            <span>Livraison</span>
          ) : service === 2 ? (
            <span>Emporter</span>
          ) : (
            <span>Service non defini</span>
          )
        ) : (
          <span>Service non defini</span>
        )}
      </h2>

      <table className="panier">
        <tbody>
          {typeof window !== "undefined" ? (
            commande.panier.length !== 0 ? (
              commande.panier.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {item.type === "salade" ||
                      item.type === "pizza" ||
                      item.type === "pate" ? (
                        <span className="type">{item.type} </span>
                      ) : (
                        ""
                      )}
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
                          className="moins btn"
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
                          className="plus btn"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      {item.total} €
                      <div>
                        <button
                          onClick={() => deleteItem(index)}
                          className="delete btn"
                        >
                          x
                        </button>
                      </div>
                    </td>
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
            <>
              {/*}
              <tfoot>
                <tr>
                  <td colSpan="2">Total : {calculTotal} €</td>
                </tr>
              </tfoot>
              <PromoTable context={context} />
              {*/}
            </>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </table>
      <ButtonCommand />
    </div>
  )
}

export default Panier
