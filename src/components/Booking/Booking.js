import "./Booking.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";

const PaymentUrl = 'http://localhost:8080/payment';
const testPaymentArr = [{id: 1, quantity: 1}];

function Booking() {
  
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  function handlePayment () {
    (console.log("making payment"));
    console.log(testPaymentArr)
    axios
    .post(PaymentUrl,{
      items: JSON.stringify(testPaymentArr),
    }).then((response) => {
      console.log(response)
      	
    window.location.href = `${response.data.url}`;
      // navigate(`https://${response.data.url}`)
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <>
      <h1>this is the booking page</h1>

      <div className="date__container">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          //   dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          // maxDate={new Date()}
          filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
          showYearDropdown
          scrollableYearDropdown
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          isOpen={true}
        />
        {console.log(selectedDate)}
        {/* <Datepicker controls={["calendar", "time"]} display="inline" /> */}
        {/* <Datepicker controls={["calendar", "timegrid"]} display="inline" /> */}
      </div>
      <button onClick={handlePayment}>Make Payment</button>
    </>
  );
}

export default Booking;
