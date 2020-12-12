import React from "react"
import { graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"
//component

// seo
import SEO from "../components/SEO"

//css
import "../css/promo.scss"

const Promo = ({ data }) => {
  return (
    <>
      <SEO
        title="Accueil"
        dsc={data.c.siteDsc.siteDsc}
        img={data.c.homeImage.fixed.src}
      />
      <div className="wrapper">
        <div className="container promoPage">
          <div className="flex">
            {data.d.nodes.map((item, index) => {
              if (item.timeCondition) {
                return (
                  <div className="promo" key={index}>
                    <BackgroundImage fluid={item.img.fluid} className="bgPromo">
                      <div className="contentPromo">
                        <h3>{item.title}</h3>
                        <p className="dsc">{item.dsc.dsc}</p>
                        <p className="validity">
                          valable le{" "}
                          {item.timeCondition.map((item, i) => {
                            return <span key={i}>{item}</span>
                          })}
                        </p>
                      </div>
                    </BackgroundImage>
                  </div>
                )
              } else {
                return false
              }
            })}
          </div>
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
    d: allContentfulPromo {
      nodes {
        title
        img {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
        dsc {
          dsc
        }
        timeCondition
      }
    }
  }
`
export default Promo
