import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: recentBookings, isPending: isRecentBookingLoading } = useQuery({
    queryKey: ["bookings", `last-${searchParams.get("last")}Days`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { recentBookings, isRecentBookingLoading, numDays };
}
