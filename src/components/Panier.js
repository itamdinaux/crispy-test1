import React, { useState, useContext, useEffect } from "react"
//context
import { Context } from "../context/Context"
const Panier = () => {
  const context = useContext(Context)

  const [commande, setCommande] = useState(context)
  const [calculTotal, setCalculTotal] = useState(0)

  useEffect(() => {
    setCommande(commande => context)
    //calcul Total
    setCalculTotal(0)
    commande.panier.map(item => {
      setCalculTotal(calculTotal => calculTotal + item.total)
      return false
    })
  }, [context, commande])

  return (
    <div>
      <h2>Ma commande</h2>

      <table className="panier">
        <tbody>
          {typeof window !== "undefined" ? (
            commande.panier.length !== 0 ? (
              commande.panier.map((item, index) => {
                return (
                  <tr key={index}>
                    <td key={index}>
                      {item.nom} {item.taille}
                      <div>
                        Supp. :
                        {item.supList.map((item, index) => {
                          return <span key={index}>{item}</span>
                        })}
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
        {commande.panier.length !== 0 ? (
          <tfoot>
            <tr>
              <td>Total</td>
              <td>{calculTotal} €</td>
            </tr>
          </tfoot>
        ) : (
          <></>
        )}
      </table>
    </div>
  )
}

export default Panier
