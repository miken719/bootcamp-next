import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ img }) => (
  <img
    src={"https://assets.mapquestapi.com/icon/v2/marker.png"}
    title="marker"
  />
);

export default function GoogleMaps({ lng, lat }) {
  console.log(lng, lat);
  const defaultProps = {
    center: {
      lat: lat,
      lng: lng,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div id="map" style={{ width: "100%", height: "300px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        center={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={lat}
          lng={lng}
          text="My Marker"
          img="/img/marker.png"
        />
      </GoogleMapReact>
    </div>
  );
}
