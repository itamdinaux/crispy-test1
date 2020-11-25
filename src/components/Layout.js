import React from "react"
import { navigate } from "gatsby"

//component
import MainMenu from "../components/Menu/MainMenu"
import Adress from "../components/Adress"
import Order from "../components/Order"
//css
import "../css/global.scss"

const Layout = ({ children, location }) => {
  let local = 0
  if (typeof window !== "undefined") {
    local = localStorage
  }
  return (
    <div>
      <MainMenu />
      {local.length !== 0 ? <Adress /> : navigate("/")}
      <div className="flex">
        {typeof window !== "undefined" ? (
          <div className="mainContent">{children}</div>
        ) : (
          ""
        )}

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
