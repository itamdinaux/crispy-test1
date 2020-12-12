import React, { useState, useContext } from "react"
import { Link, navigate, graphql } from "gatsby"
//components
import Livraison from "../components/Commande/Livraison"
import Emporter from "../components/Commande/Emporter"
import Signature from "../components/Branding/Signature"
// seo
import SEO from "../components/SEO"
//context
import { Context } from "../context/Context"
//css
import "../css/commandePage.scss"
const Commande = ({ data }) => {
  const context = useContext(Context)
  const [commande] = useState(context)

  let total = 0
  if (typeof window !== "undefined") {
    commande.panier.map(item => {
      console.log(context)
      total = total + (item.basePrice + item.supSum) * item.quantity
      return true
    })
  }
  const type = ["pain", "pizza", "pate", "salade", "dessert", "boisson"]
  const selection = () => {
    navigate("/")
  }
  return (
    <>
      <SEO
        title="Votre commande"
        dsc={data.c.siteDsc.siteDsc}
        img={data.c.homeImage.fixed.src}
      />
      <div className="container">
        <div className="return">
          <Link to="/pizza">Ma commande n'est pas finie</Link>
        </div>
        <div className="panier panierCommande">
          <h2>Ma commande</h2>
          <table className="panier">
            <tbody>
              {typeof window !== "undefined" ? (
                commande.panier.length !== 0 ? (
                  type.map(element => {
                    let i = 0
                    return (
                      <>
                        {commande.panier.map((item, index) => {
                          if (element === item.type) {
                            i++
                            return (
                              <>
                                {i === 1 ? (
                                  <tr className="subtitle" key={index[i]}>
                                    <td colSpan="3">{element}</td>
                                  </tr>
                                ) : (
                                  false
                                )}
                                <tr key={index}>
                                  <td>
                                    {item.type === "salade" ||
                                    item.type === "pizza" ||
                                    item.type === "pate" ? (
                                      <span className="type">{item.type} </span>
                                    ) : (
                                      false
                                    )}
                                    {item.nom} {item.tailleName}
                                    <div
                                      className={`supp ${item.supList.map(
                                        item => {
                                          if (item === "0") {
                                            return "none"
                                          }
                                          return false
                                        }
                                      )}`}
                                    >
                                      Supp. :
                                      {item.supList.map((item, index) => {
                                        return <span key={index}>{item}</span>
                                      })}
                                    </div>
                                  </td>
                                  <td className="quantity">x{item.quantity}</td>
                                  <td>{item.total} €</td>
                                </tr>
                              </>
                            )
                          } else {
                            return false
                          }
                        })}
                      </>
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
                    <td colSpan="3">Total : {total} €</td>
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
        <div className="afterCommande">
          {typeof window !== "undefined" ? (
            context.service ? (
              context.service === 1 ? (
                <Livraison />
              ) : context.service === 2 ? (
                <Emporter />
              ) : (
                <Signature />
              )
            ) : (
              <div className="flex">
                <p>
                  Vous n'avez pas choisi de service (livraison ou à emporter)
                </p>
                <button onClick={() => selection()}>sélectionner</button>
              </div>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  )
}
export const query = graphql`
  query($id: String) {
    c: contentfulInfo(id: { eq: $id }) {
      title
      siteDsc {
        siteDsc
      }
      homeImage {
        fixed {
          src
        }
      }
    }
  }
`

export default Commande
