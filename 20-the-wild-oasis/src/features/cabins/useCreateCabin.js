import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  // create cabin
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: ({ newCabinData }) => createEditCabin(newCabinData),
    onSuccess: () => {
      toast.success("cabin created successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return { createCabin, isCreating };
}
