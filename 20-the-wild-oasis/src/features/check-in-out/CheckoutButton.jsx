import { useCheckout } from "./useCheckout";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";

function CheckoutButton({ bookingId }) {
  const { checkout, inCheckingout } = useCheckout();

  return (
    <Button
      onClick={() => checkout(bookingId)}
      size="small"
      disabled={inCheckingout}
    >
      {inCheckingout ? <SpinnerMini /> : "Check out"}
    </Button>
  );
}

export default CheckoutButton;
