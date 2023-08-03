import { useState } from "react";

const geoLocationHook = () => {
  const [errorLoading, setErrorLoading] = useState(false);
  const [errorMsg, setError] = useState("");
  const [address, setAddress] = useState({});
  async function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // Get address from latitude & longitude.
    const apiKey = process.env.NEXT_PUBLIC_MAPQUEST_KEY;
    const url = `https://www.mapquestapi.com/geocoding/v1/reverse?key=${apiKey}&location=${latitude},${longitude}`;
    setErrorLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.results && data.results.length > 0) {
          const addressComponents = data.results[0].locations[0];
          setAddress(addressComponents);
          setErrorLoading(false);
        } else {
          console.log("No results found");
        }
      })
      .catch((error) => {
        console.error("Error fetching zip code:", error);
      });
  }

  function error() {
    setErrorLoading(true);
  }

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      setError("unable to retrive location");
    } else {
      setErrorLoading(true);
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    address,
    errorMsg,
    errorLoading,
    handleTrackLocation,
  };
};
export default geoLocationHook;
