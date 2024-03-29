import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import NumberFormat from "react-number-format"

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

const Horaire = () => {
  //data
  const data = useStaticQuery(getData)
  //check if open

  const [horaire] = useState(1)

  return (
    <div className="horaire">
      {/*}
      <h2>{mode ? "Le restaurant est ouvert" : "Le restaurant est fermé"}</h2>
      <button onClick={() => show()}>
        {horaire ? "masquer nos horaires" : "voir nos horaires"}
      </button>
      {*/}
      <h2 className="title">Horaire d'ouverture</h2>
      {horaire ? (
        <div className="table">
          {data.c.horaire.map((item, index) => {
            return (
              <div key={index} className="cell">
                <div className="titleCell">{item.day}</div>
                <div className="horaireCell">
                  {item.hour.map((item, index) => {
                    return (
                      <span key={index}>
                        <NumberFormat
                          value={item.debut}
                          displayType={"text"}
                          format="##:##"
                        />
                        -
                        <NumberFormat
                          value={item.fin}
                          displayType={"text"}
                          format="##:##"
                        />
                      </span>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Horaire
