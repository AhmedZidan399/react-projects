import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiAuth } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => apiAuth({ email, password }),

    onSuccess: (user) => {
      toast.success("You have successfully logged in");
      queryClient.setQueryData(["user", user]);
      navigate("/dashboard", { replace: true });
    },

    onError: () => {
      toast.error("Provided email or password is incorrect");
    },
  });

  return { login, isLoggingIn };
}
