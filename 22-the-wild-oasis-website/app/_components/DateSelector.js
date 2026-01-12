"use client";

import { differenceInDays, isSameDay, isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "../_context/useReservation";

function isAlreadyBooked(range, datesArr) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ cabin, bookedDates, settings }) {
  const { range, setRange, resetRange, setCabinId } = useReservation();

  const { regularPrice, discount } = cabin;

  const displayedRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const numNights = differenceInDays(displayedRange?.to, displayedRange?.from);

  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex-1 items-center flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center text-sm"
        classNames={{
          months: "flex flex-row gap-6",
        }}
        selected={displayedRange}
        onSelect={(range) => (setRange(range), setCabinId(cabin.id))}
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        defaultMonth={new Date()}
        disabled={[
          { before: new Date() },
          { after: new Date(new Date().getFullYear() + 5, 11, 31) },
          (date) => bookedDates.some((d) => isSameDay(date, d)),
        ]}
        captionLayout="dropdown"
        numberOfMonths={2}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
