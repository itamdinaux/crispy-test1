import React, { useState } from "react"

export const Context = React.createContext()

const Provider = props => {
  let [panier, setPanier] = useState([])

  return (
    <Context.Provider
      value={{
        panier,
        
        changePanier: (nom, tailleName, taillePrice, supList, supSum, total) =>
          setPanier(
            (panier = [
              ...panier,
              {
                nom: nom,
                taille: tailleName,
                basePrice: taillePrice,
                supList: supList,
                supSum: supSum,
                total: total,
              },
            ]), 
          ),
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
export default ({ element }) => <Provider>{element}</Provider>
