import React, { useState } from "react"
import { graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"

//components
//css
import "../css/pizza-page-option.scss"
const PizzaPage = ({ data }) => {
  //taille
  const choiceTaille = [data.c.prixRegular, data.c.prixMaxi]
  const [taille, setTaille] = useState(0)
  //order
  const [supp, setSupp] = useState("")
  //reset
  const reset = () => {
    setSupp(supp => "")
    setTaille(taille => 0)
  }
  //result
  let order = []
  const result = (nom, tailleName, taillePrice, sup) => {
    let supSum = 0
    let supList = []
    supp.map(item => {
      supSum = supSum + item.price
      supList.push(item.name)
      return false
    })
    let total = taillePrice + supSum
    order = [
      {
        nom: nom,
        taille: tailleName,
        prixBase: taillePrice,
        supList: supList,
        supSum: supSum,
        total: total,
      },
    ]
    console.log(order)
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
            {supp ? (
              <div>
                {supp.map((item, index) => {
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
            <h2>
              Taille
              {taille ? (
                <button onClick={() => reset()}>Réinitialiser</button>
              ) : (
                ""
              )}
            </h2>
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
                                          setSupp(supp => [
                                            ...supp,
                                            {
                                              name: item.title,
                                              price: item.type.prixRegular,
                                            },
                                          ])
                                      : () =>
                                          setSupp(supp => [
                                            ...supp,
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
              <button
                onClick={() =>
                  result(
                    data.c.title,
                    taille === 1 ? "Regular" : "Maxi",
                    choiceTaille[taille - 1],
                    supp
                  )
                }
              >
                Ajouter au panier
              </button>
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
