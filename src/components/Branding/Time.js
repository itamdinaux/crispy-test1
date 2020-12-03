import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import NumberFormat from "react-number-format"
import { OpenClose } from "../../utils/openCheck"
//css
import "../../css/time.scss"
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

const Time = () => {
  //data
  const data = useStaticQuery(getData)
  //check if open
  const magOpen = data.c.ouverture ? OpenClose(data.c.horaire) : false
  const [mode] = useState(magOpen)
  const [ouverture, setOuverture] = useState(0)
  return (
    <>
      {mode ? (
        ""
      ) : (
        <div className="time">
          <button onClick={() => setOuverture(ouverture => !ouverture)}>
            voir les horaires d'ouverture
          </button>
          {ouverture ? (
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
            ""
          )}
        </div>
      )}
    </>
  )
}

export default Time
