import React from "react"
//components
import Logo from "../components/Branding/Logo"
import MainMenu from "../components/Menu/MainMenu"
import Mobile from "../components/Mobile/Mobile"
import Phone from "../components/Branding/Phone"
//css
import "../css/branding.scss"
const Branding = () => {
  return (
    <div className="brandingWrapper">
      <div className="branding container">
        <div className="flex flex-space">
          <Logo theme="sombre" />
          <MainMenu />
          <Mobile />
          <Phone />
        </div>
      </div>
    </div>
  )
}

export default Branding
