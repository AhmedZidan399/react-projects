import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  // eslint-disable-next-line
  const navigate = useNavigate();

  const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
    mutationFn: deleteBookingApi,

    onSuccess: () => {
      toast.success(`Booking deleted successfully`);
      queryClient.invalidateQueries({
        // queryKey: ["bookings"],
        active: true,
      });
    },

    onError: () => {
      toast.error(`Booking could not be deleted`);
    },
  });

  return { deleteBooking, isDeleting };
}
