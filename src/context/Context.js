import React, { useState } from "react"

export const Context = React.createContext()

const Provider = props => {
  let [panier, setPanier] = useState([])
  const[panierState, setPanierState] = useState (0)

  return (
    <Context.Provider
      value={{
        panier,
        panierState,
        
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
            ]), setPanierState(panierState => 1)
          ),
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
export default ({ element }) => <Provider>{element}</Provider>
