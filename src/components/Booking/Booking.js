import "./Booking.scss";
// import "@mobiscroll/react/dist/css/mobiscroll.min.css";
// import { Datepicker, setOptions } from "@mobiscroll/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

function Booking() {
  //   setOptions({
  //     theme: "ios",
  //     themeVariant: "light",
  //   });

  const [selectedDate, setSelectedDate] = useState(null);

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
    </>
  );
}

export default Booking;
