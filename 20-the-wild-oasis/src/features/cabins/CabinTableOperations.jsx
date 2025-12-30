import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { label: "All", value: "all" },
          { label: "With Discount", value: "with-discount" },
          { label: "No Discount", value: "no-discount" },
        ]}
      />

      <SortBy
        filterField="sortBy"
        options={[
          { value: "name-asc", label: "Sort By Name (A-Z)" },
          { value: "name-desc", label: "Sort By Name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort By Price (Low-High)" },
          { value: "regularPrice-desc", label: "Sort By Price (High-Low)" },
          { value: "maxCapacity-asc", label: "Sort BY Capacity (Low-High)" },
          { value: "maxCapacity-desc", label: "Sort BY Capacity (High-Low)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
