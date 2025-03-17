import { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { db } from "./firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = { lat: 28.6139, lng: 77.209 }; // Default location

const LiveCarTracking = ({ carId }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const [carLocation, setCarLocation] = useState(center);

  useEffect(() => {
    const carRef = doc(db, "cars", carId);
    const unsubscribe = onSnapshot(carRef, (doc) => {
      if (doc.exists()) {
        const { latitude, longitude } = doc.data();
        setCarLocation({ lat: latitude, lng: longitude });
      }
    });

    return () => unsubscribe();
  }, [carId]);

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={carLocation}
      zoom={15}
    >
      <Marker position={carLocation} />
    </GoogleMap>
  );
};

export default LiveCarTracking;
