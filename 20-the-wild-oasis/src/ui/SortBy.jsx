import { useSearchParams } from "react-router";
import Select from "./Select";

function SortBy({ options, filterField }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSortBy = searchParams.get(filterField) || options[0].value;

  function handleClick(e) {
    const value = e.target.value;
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <Select options={options} value={currentSortBy} onChange={handleClick} />
  );
}

export default SortBy;
