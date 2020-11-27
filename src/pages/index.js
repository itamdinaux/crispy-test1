import React from "react"
//css
import "../css/index.scss"
const Index = () => {
  return (
    <div className="container">
      <div className="mode">
        <div className="modeHeader">
          <button>Livraison</button>
          <button>A emporter</button>
        </div>
        <div className="modeContent">Contenu</div>
      </div>
      <div className="signature">
        Image
        <div>
          <h1>Title</h1>
          <p></p>
          <a href="/">Lien</a>
        </div>
      </div>
    </div>
  )
}

export default Index
