import Booking from "../components/Booking/Booking";
import Payment from "../components/Payment/Payment";
import { useState } from "react";

// only show payment if booking has been made with usestate

function BookingPage() {
  const [bookingCompleted, setBookingCompleted] = useState(false);
  return (
    <>
      {!bookingCompleted && <Booking />}
      {bookingCompleted && <Payment />}
    </>
  );
}

export default BookingPage;
