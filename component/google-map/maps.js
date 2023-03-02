import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function GoogleMaps({ lng, lat }) {
  const defaultProps = {
    center: {
      lat: lat,
      lng: lng,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly

    <GoogleMapReact
      bootstrapURLKeys={{ key: "" }}
      center={defaultProps.center}
      defaultZoom={defaultProps.zoom}
    >
      <AnyReactComponent lat={lat} lng={lng} text="My Marker" />
    </GoogleMapReact>
  );
}
