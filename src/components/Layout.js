import React from "react"
import { navigate } from "gatsby"

//component
import MainMenu from "../components/Menu/MainMenu"
import Adress from "../components/Adress"
import Order from "../components/Order"
//css
import "../css/global.scss"

const Layout = ({ children, location }) => {
  return (
    <div>
      <MainMenu />
      {localStorage.adrs ? <Adress /> : navigate("/")}
      <div className="flex">
        <div className="mainContent">{children}</div>
        {location.pathname === "/" ||
        location.pathname === "/order" ||
        location.pathname === "/validate" ? (
          ""
        ) : (
          <div className="sidebar">
            <Order />
          </div>
        )}
      </div>
    </div>
  )
}

export default Layout
