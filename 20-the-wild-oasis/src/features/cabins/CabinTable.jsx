import styled from "styled-components";
import { useSearchParams } from "react-router";

import { useCabins } from "./useCabins";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  const { cabins = [], error, isLoading } = useCabins();

  const [searchParams] = useSearchParams();

  // filter
  const discount = searchParams.get("discount") || "all";

  if (isLoading) return <Spinner />;

  let filterdCabins;
  if (discount === "all") filterdCabins = cabins;
  if (discount === "with-discount")
    filterdCabins = cabins.filter((cabin) => cabin.discount > 0);
  if (discount === "no-discount")
    filterdCabins = cabins.filter((cabin) => cabin.discount === 0);

  // sort
  const sortBy = searchParams.get("sortBy") || "name-asc";

  const [sortByFeild, sortByOrder] = sortBy.split("-");
  const sortMultiplier = sortByOrder === "asc" ? 1 : -1;

  const filterdCabinsAfterSortBy = filterdCabins.sort(
    (a, b) => (a[sortByFeild] - b[sortByFeild]) * sortMultiplier
  );

  if (!cabins.length) return <Empty resourceName="Cabins" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 0.5fr">
        <Table.Header>
          <div></div>
          <div>Name</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        {error && <p>Something went wrong</p>}

        <Table.Body
          data={filterdCabinsAfterSortBy}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
