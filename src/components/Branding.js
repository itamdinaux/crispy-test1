import React from 'react'
//components
import Logo from "../components/Branding/Logo"
import MainMenu from "../components/Menu/MainMenu"
import Phone from "../components/Branding/Phone"
//css
import "../css/branding.scss"
const Branding = () => {
 return (
  <div className="branding container flex flex-space">
   <Logo />
   <MainMenu />
   <Phone />
  </div>
 )
}

export default Branding
