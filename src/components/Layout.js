import React from "react"
import { navigate } from "gatsby"

//component
import MainMenu from "../components/Menu/MainMenu"
import Adress from "../components/Adress"
import Order from "../components/Order"
//css
import "../css/global.scss"

const Layout = ({ children, location }) => {
  const local = window.localStorage
  return (
    <div>
      <MainMenu />
      {local.length !== 0 ? <Adress /> : navigate("/")}
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
