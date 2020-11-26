import React, { useState } from "react"

export const Context = React.createContext()

const Provider = props => {
  let [panier, setPanier] = useState([])
  let [service, setService] = useState("")
  // objToCheck
  const objToCheck = panier[panier.length - 1]

  // tmp array
  let tmp = [...panier]
  tmp.splice(tmp.length - 1, 1)

  const checkPanier = () => {
    // panier 2 lignes
    if (panier.length > 0) {
      //decompose
      tmp.map((item, index) => {
        // check correspondance
        if (
          item.nom === objToCheck.nom &&
          item.taille === objToCheck.taille &&
          item.basePrice === objToCheck.basePrice &&
          JSON.stringify(item.supList) === JSON.stringify(objToCheck.supList)
        ) {
          // change quantity
          tmp[index].quantity = tmp[index].quantity + 1
          // change total
          tmp[index].total =
            (tmp[index].supSum + tmp[index].basePrice) * tmp[index].quantity
          // supprime dernière ligne panier
          panier.splice(panier.length - 1, 1)
        }

        return false
      })
    }
  }
  checkPanier()

  return (
    <Context.Provider
      value={{
        panier,
        service,
        changePanier: (
          nom,
          tailleName,
          basePrice,
          supList,
          supSum,
          total,
          quantity
        ) =>
          setPanier(
            (panier = [
              ...panier,
              {
                nom: nom,
                tailleName: tailleName,
                basePrice: basePrice,
                supList: supList,
                supSum: supSum,
                total: total,
                quantity: quantity,
              },
            ])
          ),
        changeService: type => setService(service => type),
        deletePanier: index =>
          setPanier(panier => panier.filter((item, i) => i !== index)),

        addPanier: (objIndex, objQuant, objPrice, objSup) =>
          setPanier(
            panier.map((item, index) =>
              index === objIndex
                ? {
                    ...item,
                    quantity: objQuant + 1,
                    total: (objPrice + objSup) * (objQuant + 1),
                  }
                : item
            )
          ),
        removePanier: (objIndex, objQuant, objPrice, objSup) =>
          setPanier(
            panier.map((item, index) =>
              index === objIndex
                ? {
                    ...item,
                    quantity: objQuant - 1,
                    total: (objPrice + objSup) * (objQuant - 1),
                  }
                : item
            )
          ),
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
export default ({ element }) => <Provider>{element}</Provider>
