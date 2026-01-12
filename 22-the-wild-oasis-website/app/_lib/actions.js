"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "@/app/_lib/auth";
import {
  createBooking,
  deleteBooking,
  getBooking,
  getSettings,
  updateBooking,
  updateGuestService,
} from "@/app/_lib/data-service";

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  const session = await auth();

  if (!session.user)
    throw new Error("Unauthorized Guest Please Sign In First.");

  const nationalID = formData.get("nationalID");

  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[A-Za-z0-9]{6,12}$/.test(nationalID))
    throw new Error("National ID must be between 6 and 12 characters.");

  const updateData = { nationalID, nationality, countryFlag };

  const data = await updateGuestService(session.user.guestId, updateData);

  revalidatePath("/account/profile");

  redirect("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();

  if (!session.user)
    throw new Error("Unauthorized Guest Please Sign In First.");

  const booking = await getBooking(bookingId);
  if (!booking) throw new Error("Booking Not Found");

  if (booking.guestId !== session.user.guestId)
    throw new Error("You are not allowed to delete this booking");

  await deleteBooking(bookingId);

  revalidatePath("/account/reservations");
}

export async function editReservation(formData) {
  const session = await auth();

  if (!session.user)
    throw new Error("Unauthorized Guest Please Sign In First.");

  const bookingId = +formData.get("bookingId");
  const numGuests = +formData.get("numGuests");
  const observations = formData.get("observations");

  const booking = await getBooking(bookingId);

  const {
    guestId,
    hasBreakfast,
    totalPrice,
    extrasPrice,
    cabinPrice,
    numNights,
  } = booking;

  if (guestId !== session.user.guestId)
    throw new Error("You are not allowed to edit this booking");

  const { breakfastPrice } = await getSettings();

  let newTotalPrice = totalPrice;
  let newExtrasPrice = extrasPrice;

  if (hasBreakfast) {
    newExtrasPrice = Math.round(numGuests * breakfastPrice * numNights);
    newTotalPrice = newExtrasPrice + cabinPrice;
  }

  await updateBooking(bookingId, {
    numGuests,
    observations,
    extrasPrice: newExtrasPrice,
    totalPrice: newTotalPrice,
  });

  redirect("/account/reservations");
}

export async function createReservation(bookingData, formData) {
  const session = await auth();

  if (!session.user)
    throw new Error("Unauthorized Guest Please Sign In First.");

  const newBooking = {
    ...bookingData,
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations"),
    guestId: session.user.guestId,
    hasBreakfast: false,
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    status: "unconfirmed",
    isPaid: false,
  };

  await createBooking(newBooking);

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}
