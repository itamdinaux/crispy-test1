import React, { useState, useContext, useEffect } from "react"
//context
import { Context } from "../context/Context"
const Panier = () => {
  const context = useContext(Context)

  const [commande, setCommande] = useState(context)

  useEffect(() => {
    setCommande(commande => context)
    console.log(commande.panier)
  }, [context, commande])

  return (
    <div>
      <h2>Ma commande</h2>
      <table className="panier">
        <tbody>
          {commande.panier.length !== 0 ? (
            commande.panier.map((item, index) => {
              return (
                <tr key={index}>
                  <td key={index}>
                    {item.nom} {item.taille}
                    <div>
                      Supp. :{" "}
                      {item.supList.map((item, index) => {
                        return <span key={index}>{item}</span>
                      })}
                    </div>
                  </td>
                  <td>{item.total}</td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td>Panier vide</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Panier
