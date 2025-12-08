// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";

import styles from "./MapForm.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useEffect } from "react";
import Spinner from "./Spinner";
import Message from "./Message";
import { convertToEmoji } from "../utils/convertToEmoji";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CContext } from "../context/CContext";
import { useNavigate } from "react-router-dom";

function MapForm() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingPosition, setIsLoadingPosition] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [error, setError] = useState("");
  const [lat, lng] = useUrlPosition();

  const navigate = useNavigate();

  const { createCity, crudOperation } = CContext();

  useEffect(
    function () {
      async function fetchCityName() {
        try {
          setIsLoadingPosition(true);
          setError("");
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const data = await response.json();

          if (!data.countryCode)
            throw new Error("No country found, Click somewhere else.");

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName || "");
          setCountryCode(data.countryCode || "");
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoadingPosition(false);
        }
      }
      fetchCityName();
    },
    [lat, lng]
  );

  if (isLoadingPosition) return <Spinner />;

  if (error) return <Message message={error} />;

  function handleSubmit(e) {
    e.preventDefault();
    crudOperation(
      createCity({
        cityName,
        country,
        emoji: convertToEmoji(countryCode),
        date,
        notes,
        position: {
          lat,
          lng,
        },
      })
    );
    navigate("/app/cities");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{convertToEmoji(countryCode)}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default MapForm;
