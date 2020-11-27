import React, { useContext } from "react"
import { navigate } from "gatsby"

//components
import BrandingHome from "../components/BrandingHome"
import Branding from "../components/Branding"
import Footer from "../components/Footer"
//context
import { Context } from "../context/Context"
//css
import "../css/reset.scss"
import "../css/global.scss"
import "../css/gird.scss"
const Layout = ({ children, pageContext, location }) => {
  const context = useContext(Context)
  let service = ""
  if (typeof window !== "undefined") {
    service = context.service
  }

  const pageLayout = "home"
  if (location.pathname === "/") {
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
        <BrandingHome />
        {children}
        <Footer />
      </div>
    )
  } else {
    return (
      <>
        {service ? (
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
        ) : typeof window !== "undefined" ? (
          navigate("/")
        ) : (
          false
        )}
      </>
    )
  }
}

export default Layout
