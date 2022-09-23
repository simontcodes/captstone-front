import Booking from "../components/Booking/Booking";
import Payment from "../components/Payment/Payment";
import Questionnaire from "../components/Questionnaire/Questionnaire";
import { useState } from "react";
import axios from "axios";

// only show payment if booking has been made with usestate
const PaymentUrl = "http://localhost:8080/payment";
const testPaymentArr = [{ id: 1, quantity: 1 }];

function BookingPage() {
  const [bookingCompleted, setBookingCompleted] = useState("booking");

  function handleBooking() {
    if (bookingCompleted === "booking") {
      setBookingCompleted("payment");
    }
    
  }
  return (
    <>
      {bookingCompleted === "booking" && (
        <Booking handleBooking={handleBooking} />
      )}

      {/* {bookingCompleted === "payment" && (
        <Questionnaire handleBooking={handleBooking} />
      )} */}
    </>
  );
}

export default BookingPage;
