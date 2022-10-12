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
  const t = "pate"
  //context
  const context = useContext(Context)

  //order
  const [supp, setSupp] = useState("")
  const [nbrSupp, setNbrSupp] = useState(0)
  const [nbrType, setNbrType] = useState(0)
  //reset
  const reset = () => {
    setSupp(supp => "")
    setNbrSupp(nbrSupp => 0)
    setNbrType(nbrType => 0)
  }
  //result
  let total = 0
  const result = (nom, basePrice, sup, t) => {
    let supSum = 0
    let supList = []
    if (sup.length > 0) {
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
    const tailleName = ""
    const quantity = 1

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
    navigate("/pate")
  }

  useEffect(() => {
    if (total) {
      console.log(context.panier)
    }
  }, [context, total])

  // rewrite metaTitle
  const metaTitleTable = data.e.pateMetaTitle.split(" ")
  const metaDscTable = data.e.pateMetaDsc.pateMetaDsc.split(" ")
  const findName = e => e === "[*]"
  const metaTitleIndex = metaTitleTable.findIndex(findName)
  const metaDscIndex = metaDscTable.findIndex(findName)
  metaTitleTable[metaTitleIndex] = data.c.title
  metaDscTable[metaDscIndex] = data.c.title
  const metaTitle = metaTitleTable.join(" ")
  const metaDsc = metaDscTable.join(" ")

  return (
    <>
      <SEO title={metaTitle} dsc={metaDsc} img={data.c.image.fixed.src} />
      <div className={`container pizzaOption `}>
        <div className="fullWidth return">
          <Link to="/pate">Retour</Link>
        </div>
        <div className="contentSide">
          <div className="contentMain">
            <BackgroundImage fluid={data.c.image.fluid} className="bgPizza" />
            <div className="contentPizza">
              <h1>{data.c.title}</h1>
              <p>{data.c.description.description}</p>

              <>
                <h2>
                  Supplément sélectionné
                  {supp !== "" ? (
                    <button onClick={() => reset()}>Réinitialiser</button>
                  ) : (
                    ""
                  )}
                </h2>
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
                <div className={`supp `}>
                  {data.d.nodes.map((item, index) => {
                    return (
                      <div key={index} className={`cat-${index + 1} catTitle`}>
                        <div className="suppList">
                          <div className="taille">
                            <button
                              key={index}
                              className={`taille active-${
                                nbrSupp ? "true" : "false"
                              }`}
                              disabled={nbrSupp ? true : false}
                              onClick={() => {
                                setSupp(supp => [
                                  ...supp,
                                  {
                                    name: item.title,
                                    price: item.priceRegular,
                                  },
                                ])
                                setNbrSupp(nbrSupp => 1)
                              }}
                            >
                              {item.title}
                              <span>+{item.priceRegular}€</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <h2>Changer le type de pate</h2>
                <div className={`supp `}>
                  {data.f.nodes.map((item, index) => {
                    return (
                      <div key={index} className={`cat-${index + 1} catTitle`}>
                        <div className="suppList">
                          <div className="taille">
                            <button
                              key={index}
                              disabled={nbrType ? true : false}
                              className={`taille active-${
                                supp.length > 0
                                  ? supp.filter(e => e.name === item.title)
                                      .length
                                    ? "true"
                                    : "false"
                                  : ""
                              }`}
                              onClick={() => {
                                setSupp(supp => [
                                  ...supp,
                                  {
                                    name: item.title,
                                    price: item.priceRegular,
                                  },
                                ])
                                setNbrType(nbrType => 1)
                              }}
                            >
                              {item.title}
                              <span>+{item.priceRegular}€</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>

              <div className="action">
                <button
                  onClick={() =>
                    result(data.c.title, data.c.prix, supp ? supp : 1, t)
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
    c: contentfulPate(id: { eq: $id }) {
      title
      description {
        description
      }
      prix
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
        fixed {
          src
        }
      }
    }
    d: allContentfulSupplementPate {
      nodes {
        priceRegular
        title
      }
    }
    f: allContentfulSupplementTypePate {
      nodes {
        priceRegular
        title
      }
    }
    e: contentfulConfig {
      pateMetaTitle
      pateMetaDsc {
        pateMetaDsc
      }
    }
  }
`

export default PizzaPage
