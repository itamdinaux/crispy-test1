import React, { useState } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

//components
import Panier from "../Panier"
import PanierNbr from "../Mobile/PanierNbr"
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
const Mobile = ({ location }) => {
  const data = useStaticQuery(getData)
  const [menu, setMenu] = useState(0)
  const [panier, setPanier] = useState(0)

  const changeMenu = () => {
    setMenu(menu => !menu)
    setPanier(panier => 0)
  }
  const changePanier = () => {
    setPanier(panier => !panier)
    setMenu(menu => 0)
  }
  const change = () => {
    setPanier(panier => 0)
    setMenu(menu => 0)
  }

  return (
    <div
      className={`mobileElement menu-${menu ? "true" : "false"} panier-${
        panier ? "true" : "false"
      }`}
    >
      <button className="mobileButtonMenu" onClick={() => changeMenu()}>
        <span></span>
        <span></span>
        <span></span>
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
      {panier ? (
        <button
          className="mobileButtonPanierClose"
          onClick={() => changePanier()}
        >
          Fermer
        </button>
      ) : (
        ""
      )}

      <div
        className="mobilePanier"
        onClick={() => change()}
        onKeyDown={() => change()}
        role="button"
        tabIndex={0}
      >
        <Panier />
      </div>
    </div>
  )
}

export default Mobile
