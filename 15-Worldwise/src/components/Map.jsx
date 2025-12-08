import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";

import styles from "./Map.module.css";
import { CContext } from "../context/CContext";
import { useEffect } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function Map() {
  const { cities } = CContext();
  const [lat, lng] = useUrlPosition();

  const [position, setPosition] = useState([40, 0]);

  const {
    position: geolocationPosition,
    isLoading: isLoadingPosition,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (geolocationPosition.lat && geolocationPosition.lng)
        setPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  useEffect(
    function () {
      if (lat && lng) setPosition([Number(lat), Number(lng)]);
    },
    [lat, lng]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && <Button type="position" onClick={getPosition}>
        {!isLoadingPosition ? "Use my location" : "Loading..."}
      </Button>}
      <MapContainer
        center={position}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
              <span>{formatDate(city.date)}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter p={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ p }) {
  const map = useMap();
  map.setView(p);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
