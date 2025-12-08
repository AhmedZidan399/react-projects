import styles from "./CountryList.module.css";

import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import { CContext } from "../context/CContext";

function CountryList() {
  const { cities, isLoading } = CContext();
  if (isLoading) return <Spinner />;

  const countries = cities.reduce((acc, city) => {
    if (!acc.some((country) => country.country === city.country)) {
      return [...acc, { country: city.country, emoji: city.emoji }];
    }
    return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem key={index} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
