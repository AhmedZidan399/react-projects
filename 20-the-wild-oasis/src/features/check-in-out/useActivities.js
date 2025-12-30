import { getStaysTodayActivity } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export function useActivities() {
  const { data: activities, isPending: isLoading } = useQuery({
    queryKey: ["activities"],
    queryFn: getStaysTodayActivity,
  });

  return { activities, isLoading };
}
