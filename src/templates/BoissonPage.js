import React from "react"
//components
import Panier from "../components/Panier"
const BoissonPage = () => {
  return (
    <div className={`container pizza `}>
      <div className="contentSide">
        <div className="contentMain">content</div>
        <div className="sideBar">
          <Panier />
        </div>
      </div>
    </div>
  )
}

export default BoissonPage
