import styled from "styled-components";

import { useCabins } from "../cabins/useCabins";
import { useRecentStays } from "./useRecentStays";
import { useRecentBookings } from "./useRecentBookings";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isRecentStaysLoading, confirmedStays } = useRecentStays();

  const { recentBookings, isRecentBookingLoading, numDays } =
    useRecentBookings();

  const { cabins, isLoading } = useCabins();

  if (isRecentStaysLoading || isRecentBookingLoading || isLoading) {
    return <Spinner />;
  }

  return (
    <StyledDashboardLayout>
      <Stats
        recentBookings={recentBookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        numCabins={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart numDays={numDays} recentBookings={recentBookings} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
