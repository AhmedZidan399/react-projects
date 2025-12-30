import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isPending: isSigningUp } = useMutation({
    mutationFn: signUpApi,

    onSuccess: () => {
      toast.success("User Created Successfully, ");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signUp, isSigningUp };
}
