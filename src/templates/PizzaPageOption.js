import React, { useContext, useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import { navigate } from "gatsby"

//components
import Panier from "../components/Panier"
import Time from "../components/Branding/Time"
// seo
import SEO from "../components/SEO"
//context
import { Context } from "../context/Context"
//css
import "../css/pizza-page-option.scss"
const PizzaPage = ({ data }) => {
  const t = "pizza"
  //context
  const context = useContext(Context)

  //taille
  const choiceTaille = [data.c.prixRegular, data.c.prixMaxi]
  const [taille, setTaille] = useState(0)
  // category
  const [catSup, setCatSup] = useState(0)

  const category = c => {
    setCatSup(catSup => c)
  }
  //order
  const [supp, setSupp] = useState("")
  //reset
  const reset = () => {
    setSupp(supp => "")
    setTaille(taille => 0)
  }
  //result
  let total = 0
  const result = (nom, tailleName, basePrice, sup, quantity, t) => {
    let supSum = 0
    let supList = []
    if (sup) {
      sup.map(item => {
        supSum = supSum + item.price
        supList.push(item.name)
        return false
      })
    } else {
      supList.push("aucun")
    }
    total = basePrice + supSum
    const type = t
    context.changePanier(
      nom,
      tailleName,
      basePrice,
      supList,
      supSum,
      total,
      quantity,
      type
    )
    navigate("/pizza")
  }

  useEffect(() => {
    if (total) {
      console.log(context.panier)
    }
  }, [context, total])

  return (
    <>
      <SEO
        title={data.c.title}
        dsc={data.c.metaDsc.metaDsc}
        img={data.c.image.fixed.src}
      />
      <div className={`container pizzaOption `}>
        <div className="fullWidth return">
          <Link to="/pizza">Retour</Link>
        </div>
        <div className="contentSide">
          <div className="contentMain">
            <BackgroundImage fluid={data.c.image.fluid} className="bgPizza" />
            <div className="contentPizza">
              <h1>{data.c.title}</h1>
              <p>{data.c.description.description}</p>

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
                  className={`taille active-${taille === 1 ? "true" : "false"}`}
                >
                  Regular (30cm)<span>{data.c.prixRegular} €</span>
                </button>
                <button
                  onClick={() => setTaille(taille => 2)}
                  disabled={taille ? true : false}
                  className={`taille active-${taille === 2 ? "true" : "false"}`}
                >
                  Maxi (40cm)<span>{data.c.prixMaxi} €</span>
                </button>
              </div>

              {taille !== 0 ? (
                <>
                  <h2>Supplément sélectionné</h2>
                  {supp ? (
                    <div className="supSelect">
                      {supp.map((item, index) => {
                        return (
                          <div key={index} className="element">
                            {item.name} <span>+{item.price}€</span>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="supSelect">Aucun</div>
                  )}
                  <h2>Supplément</h2>
                  <div className={`supp cat-${catSup}`}>
                    {data.d.nodes.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={`cat-${index + 1} catTitle`}
                        >
                          <button
                            onClick={() => category(index + 1)}
                            className="cat"
                          >
                            {item.title}
                          </button>
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
                                              price: item.priceRegular,
                                            },
                                          ])
                                      : () =>
                                          setSupp(supp => [
                                            ...supp,
                                            {
                                              name: item.title,
                                              price: item.priceMaxi,
                                            },
                                          ])
                                  }
                                >
                                  {item.title}
                                  {taille === 1 ? (
                                    <span>+{item.priceRegular}€</span>
                                  ) : (
                                    <span>+{item.priceMaxi}€</span>
                                  )}
                                </button>
                              )
                            })}
                          </div>
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
                  disabled={taille ? false : true}
                  onClick={() =>
                    result(
                      data.c.title,
                      taille === 1 ? "Regular" : "Maxi",
                      choiceTaille[taille - 1],
                      supp ? supp : 0,
                      1,
                      t
                    )
                  }
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
          <div className="sideBar">
            <Panier /> <Time />
          </div>
        </div>
      </div>
    </>
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
        fixed {
          src
        }
      }
      metaDsc {
        metaDsc
      }
    }
    d: allContentfulSupplementType(
      sort: { fields: [order, supplement___title], order: ASC }
    ) {
      nodes {
        title
        prixMaxi
        prixRegular
        supplement {
          title
          priceMaxi
          priceRegular
        }
      }
    }
  }
`

export default PizzaPage
