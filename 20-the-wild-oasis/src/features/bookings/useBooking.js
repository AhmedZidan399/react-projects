import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { id } = useParams();

  const {
    data: booking,
    error,
    isPending: isLoading,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
    retry: false,
  });

  return { booking, error, isLoading };
}
