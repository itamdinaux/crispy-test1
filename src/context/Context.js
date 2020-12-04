import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
//utils
import { OpenClose } from "../utils/openCheck.js"

export const Context = React.createContext()

//data
const getData = graphql`
  {
    c: contentfulInfo {
      ouverture
      horaire {
        day
        hour {
          debut
          fin
        }
      }
    }
  }
`

const Provider = props => {
  const data = useStaticQuery(getData)
  // check if open mode
  const magOpen = data.c.ouverture ? OpenClose(data.c.horaire) : false
  const [mode] = useState(magOpen)
  //livraison, emporter, non-defini
  let [service, setService] = useState(0)
  //adrs
  let [adrs, setAdrs] = useState("")

  //commande
  let [panier, setPanier] = useState([])
  // objToCheck
  const objToCheck = panier[panier.length - 1]

  //mobileMenu
  const [mobileMenu, setMobileMenu] = useState(0)
  //mobileMenu
  const [mobilePanier, setMobilePanier] = useState(0)

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
        mode,
        adrs,
        mobileMenu,
        mobilePanier,
        changePanier: (
          nom,
          tailleName,
          basePrice,
          supList,
          supSum,
          total,
          quantity,
          type
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
                type: type,
              },
            ])
          ),
        // livraison ou emporter
        changeService: type => setService(service => type),
        // changeMobileMenu
        changeMobileMenu: () => setMobileMenu(mobileMenu => !mobileMenu),
        // changeMobileMenu
        changeMobilePanier: () =>
          setMobilePanier(mobilePanier => !mobilePanier),
        // adrs
        changeAdrs: element => setAdrs(adrs => element),
        // delete element de panier
        deletePanier: index =>
          setPanier(panier => panier.filter((item, i) => i !== index)),
        // ajout 1 element panier
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
        //enleve 1 element panier
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
