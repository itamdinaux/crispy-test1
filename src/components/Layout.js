import React from "react"
//components
import Branding from "../components/Branding"
import Footer from "../components/Footer"
//context
//css
import "../css/reset.scss"
import "../css/global.scss"
import "../css/gird.scss"
const Layout = ({ children, pageContext, location }) => {
  const pageLayout = "home"
 
  return (
    <div
      className={`layout layout-${
        pageContext.type !== undefined
          ? pageContext.type
          : pageLayout
          ? pageLayout
          : ""
      }`}
    >
      <Branding />
      Adresse
      {children}
      <Footer />
    </div>
  )
}

export default Layout
