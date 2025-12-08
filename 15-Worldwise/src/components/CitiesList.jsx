import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
import { CContext } from "../context/CContext";
import styles from "./CitiesList.module.css";

function CitiesList() {
  const { cities, isLoading } = CContext();
  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="No cities found" />;

  return (
    <ul className={styles.citiesList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CitiesList;
