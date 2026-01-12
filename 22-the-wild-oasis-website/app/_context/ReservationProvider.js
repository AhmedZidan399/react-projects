"use client";

import { useState } from "react";
import { ReservationContext } from "./useReservation";

const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);

  const [cabinId, setCabinId] = useState(null);

  function resetRange() {
    setRange(initialState);
  }

  return (
    <ReservationContext.Provider
      value={{ range, setRange, resetRange, cabinId, setCabinId }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export default ReservationProvider;
