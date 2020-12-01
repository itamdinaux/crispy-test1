import React from "react"
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAW9k2r1z1hxFxg2IgqBGlv1md-EklqiEs&libraries=places"
      key="googleMap"
      type="text/javascript"
      async
    ></script>,
  ])
}
