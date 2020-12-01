import {useState} from "react"
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAW9k2r1z1hxFxg2IgqBGlv1md-EklqiEs");

export function Localise(lat,lon) {
  const [adrs, setAdrs] = useState()
  Geocode.fromLatLng(lat, lon).then(
  response => {
    const address = response.results[0].formatted_address;
    setAdrs(adrs=>address)
  },
  error => {
    console.error(error);
  }

);
return adrs
  
}
