import React from "react"

//components
import BrandingHome from "../components/BrandingHome"
import Branding from "../components/Branding"
import Adress from "../components/Service/Adress"
import Footer from "../components/Footer"

//css
import "../css/reset.scss"
import "../css/global.scss"
import "../css/gird.scss"
import "../css/sidebar.scss"

const Layout = ({ children, pageContext, location }) => {
  const pageLayout = "home"
  if (location.pathname === "/") {
    return (
      <>
        <div
          className={`layout layout-${
            pageContext.type !== undefined
              ? pageContext.type
              : pageLayout
              ? pageLayout
              : "other"
          }`}
        >
          <BrandingHome />
          <div className="mainContent">{children}</div>
          <Footer />
        </div>
      </>
    )
  } else {
    return (
      <>
        <div
          className={`layout layout-${
            pageContext.type !== undefined
              ? pageContext.type
              : pageLayout
              ? pageLayout
              : "other"
          }`}
        >
          <Branding />
          <Adress />
          <div className="mainContent">{children}</div>

          <Footer />
        </div>
      </>
    )
  }
}

export default Layout
