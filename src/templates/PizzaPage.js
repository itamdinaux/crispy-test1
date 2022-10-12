import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
//components
import Panier from "../components/Panier"
import Time from "../components/Branding/Time"
// seo
import SEO from "../components/SEO"
//css
import "../css/productPage.scss"

const PizzaPage = ({ data }) => {
  const [trad, setTrad] = useState(0)
  const [spec, setSpec] = useState(0)
  const [blc, setBlc] = useState(0)
  const [mer, setMer] = useState(0)

  const changeFiltre = filtre => {
    if (filtre === "trad") {
      setTrad(trad => 1)
      setSpec(spec => 0)
      setBlc(blc => 0)
      setMer(mer => 0)
    } else if (filtre === "spec") {
      setTrad(trad => 0)
      setSpec(spec => 1)
      setBlc(blc => 0)
      setMer(mer => 0)
    } else if (filtre === "blc") {
      setTrad(trad => 0)
      setSpec(spec => 0)
      setBlc(blc => 1)
      setMer(mer => 0)
    } else if (filtre === "mer") {
      setTrad(trad => 0)
      setSpec(spec => 0)
      setBlc(blc => 0)
      setMer(mer => 1)
    } else {
      setTrad(trad => 0)
      setSpec(spec => 0)
      setBlc(blc => 0)
      setMer(mer => 0)
    }
  }
  console.log(mer)
  return (
    <>
      <SEO
        title={data.d.metaTitle}
        dsc={data.d.metaDsc.metaDsc}
        img={data.d.metaImg.fixed.src}
      />
      <div
        className={`container product ${trad ? "traditionnelle" : ""} ${
          spec ? "speciale" : ""
        } ${blc ? "blanche" : ""} ${mer ? "mer" : ""}`}
      >
        <div className="fullWidth">
          Filtre :
          <div className="filtre">
            <button
              onClick={() => changeFiltre("trad")}
              className={`active-${trad ? "true" : "false"}`}
            >
              Traditionnelle
            </button>
            <button
              onClick={() => changeFiltre("spec")}
              className={`active-${spec ? "true" : "false"}`}
            >
              Spéciale
            </button>
            <button
              onClick={() => changeFiltre("blc")}
              className={`active-${blc ? "true" : "false"}`}
            >
              Blanche
            </button>
            <button
              onClick={() => changeFiltre("mer")}
              className={`active-${mer ? "true" : "false"}`}
            >
              De la mer
            </button>
            {trad || spec || blc || mer ? (
              <button onClick={() => changeFiltre()} className="delete">
                x
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="contentSide">
          <div className="contentMain">
            {data.c.nodes.map((item, index) => {
              return (
                <div key={index} className={`productOne ${item.catgory}`}>
                  <BackgroundImage
                    fluid={item.image.fluid}
                    className="bgProduct"
                  />
                  <h2>{item.title}</h2>
                  <p className="dsc">{item.description.description}</p>
                  <div className="price">
                    à partir de <span>{item.prixRegular} €</span>
                    <div className="more">+</div>
                  </div>
                  <Link to={`/pizza/${item.slug}`}>aller aux options</Link>
                </div>
              )
            })}
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
    d: contentfulTypeProduct(id: { eq: $id }) {
      title
      metaTitle
      metaDsc {
        metaDsc
      }
      metaImg {
        fixed {
          src
        }
      }
    }
    c: allContentfulPizza(sort: { fields: order, order: ASC }) {
      nodes {
        title
        slug
        catgory
        description {
          description
        }
        prixRegular
        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`
export default PizzaPage
