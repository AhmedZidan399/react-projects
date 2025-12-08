import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { CContext } from "../context/CContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity, crudOperation } = CContext();
  return (
    <li>
      <Link
        to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
        className={`${styles.cityItem} ${
          city.id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{city.emoji}</span>
        <p className={styles.name}>{city.cityName}</p>
        <time className={styles.date}>( {formatDate(city.date)} )</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.preventDefault();
            const res = confirm("Are You Sure to Delete This Erea?");
            if (res) crudOperation(deleteCity(city.id));
          }}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
