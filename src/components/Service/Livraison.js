import React, { useState, useContext } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { navigate } from "gatsby"

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"
import useOnclickOutside from "react-cool-onclickoutside"
import { getDistance } from "geolib"

//context
import { Context } from "../../context/Context"
//data
const getData = graphql`
  {
    c: contentfulConfig {
      homeLivraison {
        homeLivraison
      }
      homeAdressOk {
        homeAdressOk
      }
      homeAdressPasOk {
        homeAdressPasOk
      }
      homeEmporter {
        homeEmporter
      }
      distanceLivraison
      distanceLivraisonTitle
    }
    d: contentfulInfo {
      adresse {
        lon
        lat
      }
    }
  }
`
const Livraison = () => {
  const mydata = useStaticQuery(getData)
  const context = useContext(Context)

  const nav = service => {
    context.changeService(service)
    navigate("/pizza")
  }
  const livraison = (service, value) => {
    context.changeAdrs(value)
    context.changeService(service)
    navigate("/pizza")
  }
  //AUTOCOMPLETE

  const [valide, setValide] = useState(0)
  const maxDistance = mydata.c.distanceLivraison

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  })
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions()
  })

  const handleInput = e => {
    // Update the keyword of the input element
    setValue(e.target.value)
  }

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false)
    clearSuggestions()

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        let distance = getDistance(
          { latitude: lat, longitude: lng },
          { latitude: mydata.d.adresse.lat, longitude: mydata.d.adresse.lon }
        )
        distance > maxDistance ? setValide(valide => 1) : setValide(valide => 2)
      })
      .catch(error => {
        console.log("Error: ", error)
        setValide(valide => 3)
      })
  }

  const renderSuggestions = () =>
    data.map(suggestion => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion

      return (
        <li key={place_id}>
          <button onClick={handleSelect(suggestion)}>
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </button>
        </li>
      )
    })

  return (
    <div ref={ref}>
      {valide === 1 ? (
        <>
          <p>{mydata.c.homeAdressPasOk.homeAdressPasOk}</p>

          <button onClick={() => nav(2)}>Commander à emporter</button>
        </>
      ) : valide === 2 ? (
        <>
          <p>{mydata.c.homeAdressOk.homeAdressOk}</p>
          <button onClick={() => livraison(1, value)}>
            Commander à livrer
          </button>
        </>
      ) : valide === 3 ? (
        <>
          <p>
            Une erreur est survenue, veuillez ressayer ultérieurement ou
            commander à emporter
          </p>
          <button onClick={() => nav(2)}>Commander à emporter</button>
          <a href="/">Réessayer</a>
        </>
      ) : (
        <>
          <div>
            <p>{mydata.c.homeLivraison.homeLivraison}</p>
            <p>
              {mydata.c.distanceLivraisonTitle} :{" "}
              {mydata.c.distanceLivraison / 1000} km
            </p>
            <input
              value={value}
              onChange={handleInput}
              disabled={!ready}
              name="address"
              placeholder="Où souhaitez vous être livré?"
            />
            <div className="sugg">
              {status === "OK" && (
                <ul className="sugg">{renderSuggestions()}</ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Livraison
