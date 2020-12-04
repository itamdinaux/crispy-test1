import React, { useState, useContext, useEffect } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

//components
import Panier from "../Panier"
import PanierNbr from "../Mobile/PanierNbr"
//context
import { Context } from "../../context/Context"
//css
import "../../css/mobile.scss"
//data
const getData = graphql`
  {
    c: allContentfulTypeProduct(sort: { fields: order, order: ASC }) {
      nodes {
        slug
        title
      }
    }
  }
`
const Mobile = () => {
  const data = useStaticQuery(getData)
  const context = useContext(Context)

  const [menu, setMenu] = useState(0)
  const [panier, setPanier] = useState(0)

  const changeMenu = () => {
    context.changeMobileMenu()
    if (panier) {
      context.changeMobilePanier()
    }
  }
  const changePanier = () => {
    context.changeMobilePanier()
    if (menu) {
      context.changeMobileMenu()
    }
  }
  useEffect(() => {
    setMenu(menu => context.mobileMenu)
    setPanier(menu => context.mobilePanier)
  }, [context])

  return (
    <div
      className={`mobileElement menu-${menu ? "true" : "false"} panier-${
        panier ? "true" : "false"
      }`}
    >
      <button className="mobileButtonMenu" onClick={() => changeMenu()}>
        <div className="content">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <ul className="mobileMenu">
        <li>
          <Link to="/" onClick={() => changeMenu()}>
            Crispy Pizza
          </Link>
        </li>
        {data.c.nodes.map((item, index) => {
          return (
            <li key={index}>
              <Link
                to={`/${item.slug}`}
                activeClassName="active"
                partiallyActive={true}
                onClick={() => changeMenu()}
              >
                {item.title}
              </Link>
            </li>
          )
        })}
      </ul>
      <button className="mobileButtonPanier" onClick={() => changePanier()}>
        Votre commande
        <span>
          <PanierNbr />
        </span>
      </button>

      <div className="mobilePanier">
        <div className="content">
          <Panier />
          {panier ? (
            <button
              className="mobileButtonPanierClose"
              onClick={() => changePanier()}
            >
              x
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  )
}

export default Mobile
