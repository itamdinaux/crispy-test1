import React, { useState } from "react"
import { graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"

//components
//css
import "../css/pizza-page-option.scss"
const PizzaPage = ({ data }) => {
  const choiceTaille = [{ "1": data.c.prixRegular }, { "2": data.c.prixMaxi }]
  const [taille, setTaille] = useState(0)
  console.log(choiceTaille[taille - 1])

  const [order, setOrder] = useState("")

  const reset = () => {
    setOrder(order => "")
    setTaille(taille => 0)
  }

  return (
    <div className={`container pizzaOption `}>
      <div className="fullWidth return">Return</div>
      <div className="contentSide">
        <div className="contentMain">
          <BackgroundImage fluid={data.c.image.fluid} className="bgPizza" />
          <div className="contentPizza">
            <h1>{data.c.title}</h1>
            <p>{data.c.description.description}</p>
            <h3>Supplément sélectionné</h3>
            {order ? (
              <div>
                {order.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.name}#{item.price}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div>Aucun</div>
            )}
            <h2>Taille </h2>
            <div className="taille">
              <button
                onClick={() => setTaille(taille => 1)}
                disabled={taille ? true : false}
              >
                Regular<span>{data.c.prixRegular} €</span>
              </button>
              <button
                onClick={() => setTaille(taille => 2)}
                disabled={taille ? true : false}
              >
                Maxi<span>{data.c.prixMaxi} €</span>
              </button>
            </div>
            {taille !== 0 ? (
              <>
                <h2>Supplément</h2>
                <div className="supp">
                  {data.d.nodes.map((item, index) => {
                    return (
                      <div key={index}>
                        <h3>
                          {item.title}
                          <span>
                            {taille === 1
                              ? item.prixRegular + "€/p"
                              : taille === 2
                              ? item.prixMaxi + "€/p"
                              : ""}
                          </span>
                          <div className="suppList">
                            {item.supplement.map((item, index) => {
                              return (
                                <button
                                  key={index}
                                  onClick={
                                    taille === 1
                                      ? () =>
                                          setOrder(order => [
                                            ...order,
                                            {
                                              name: item.title,
                                              price: item.type.prixRegular,
                                            },
                                          ])
                                      : () =>
                                          setOrder(order => [
                                            ...order,
                                            {
                                              name: item.title,
                                              price: item.type.prixMaxi,
                                            },
                                          ])
                                  }
                                >
                                  {item.title}
                                </button>
                              )
                            })}
                          </div>
                        </h3>
                      </div>
                    )
                  })}
                </div>
              </>
            ) : (
              ""
            )}

            <div className="action">
              <button>Ajouter au panier</button>
              <button onClick={() => reset()}>Réinitialiser</button>
            </div>
          </div>
        </div>
        <div className="sideBar">sidebar</div>
      </div>
    </div>
  )
}

export const query = graphql`
  query($id: String) {
    c: contentfulPizza(id: { eq: $id }) {
      title
      description {
        description
      }
      prixRegular
      prixMaxi
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }
    d: allContentfulSupplementPrix(
      sort: { fields: [order, supplement___title], order: ASC }
    ) {
      nodes {
        title
        prixMaxi
        prixRegular
        supplement {
          title
          type {
            prixMaxi
            prixRegular
          }
        }
      }
    }
  }
`

export default PizzaPage
