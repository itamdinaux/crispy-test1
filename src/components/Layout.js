import React from "react"
//components
import Branding from "../components/Branding"
import Footer from "../components/Footer"
//css
import "../css/reset.scss"
import "../css/global.scss"
import "../css/gird.scss"
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Branding />
      Adresse
      {children}
      <Footer/>
    </div>
  )
}

export default Layout
