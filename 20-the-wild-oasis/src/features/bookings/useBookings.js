import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status") ?? "all";
  const filter =
    !status || status === "all" ? null : { field: "status", value: status };

  const sortBy = searchParams.get("sortBy")
    ? searchParams.get("sortBy").split("-")
    : ["startDate", "desc"];
  const sortFilter = { field: sortBy[0], value: sortBy[1] };

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const {
    data: { data: bookings, count } = {},
    error,
    isPending: isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sortFilter, page],
    queryFn: () => getBookings(filter, sortFilter, page),
  });

  // PRE-FETCHING
  const queryClient = useQueryClient();
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortFilter, page + 1],
      queryFn: () => getBookings(filter, sortFilter, page + 1),
    });

  return { bookings, error, isLoading, count };
}
