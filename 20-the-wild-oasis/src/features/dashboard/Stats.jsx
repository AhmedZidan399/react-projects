import { formatCurrency } from "../../utils/helpers";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";

function Stats({ recentBookings, confirmedStays, numDays, numCabins }) {
  // 1.
  const numBookings = recentBookings.length;

  // 2.
  const sales = recentBookings.reduce(
    (total, booking) => total + booking.totalPrice,
    0
  );

  // 3.
  const checkIns = confirmedStays.length;

  // 4.
  // occupancy rate
  // checkins numnights / all avilable nights
  const occupancyRate =
    confirmedStays.reduce((acc, item) => acc + item.numNights, 0) /
    (numDays * numCabins);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={numBookings}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check Ins"
        value={checkIns}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy Rate"
        value={Math.round(occupancyRate * 100) + "%"}
        color="yellow"
      />
    </>
  );
}

export default Stats;
