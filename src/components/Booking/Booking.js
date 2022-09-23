import "./Booking.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

const PaymentUrl = "http://localhost:8080/payment";

function Booking({ handleBooking }) {
  //state that captures date and time of appointment
  const [selectedDate, setSelectedDate] = useState("");
  //type of service
  const [service, setService] = useState(null);
  //error State for a user no to pay without the info
  const [errorMessage, setErrorMessage] = useState("");
  //error message from the backend
  const [backendError, setBackendError] = useState("");
  //react hook form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // ------------------------------
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );
  // -------------------------------

  const onSubmit = (data) => {
    console.log(data);
    setService(watch(service));
  };
  console.log(watch("service"));


  function handlePayment() {
    if (!selectedDate || !watch("service")) {
      setErrorMessage("Date/time and type of service has to be selected");
      return;
    }
    //saving data to be uses to post when questionnaire is filled
    sessionStorage.setItem("dateAndTime", selectedDate);
    sessionStorage.setItem("typeOfService", watch("service"));

    axios
      .post(PaymentUrl, {
        items: JSON.stringify([
          { id: parseInt(watch("service")), quantity: 1 },
        ]),
      })
      .then((response) => {
        console.log(response);
        window.location.href = `${response.data.url}`;
        handleBooking();
      })
      .catch((error) => {
        console.log(error);
        setBackendError(error.message);
      });
  }
  

  return (
    <>
      <h1>this is the booking page</h1>

      <div className="date__container">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
          }}
          // dateFormat="dd/MM/yyyy"
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
          inline
          excludeTimes={[
            setHours(setMinutes(new Date(), 0), 17),
            setHours(setMinutes(new Date(), 30), 18),
            setHours(setMinutes(new Date(), 30), 19),
            setHours(setMinutes(new Date(), 30), 17),
          ]}

          // monthsShown={2}
        />
        {console.log(selectedDate)}
      </div>
      <div>
        <p>Select type of service</p>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="">
            30 Min Consultation $100
            <input
              {...register("service")}
              type="radio"
              name="service"
              value={1}
            />
          </label>
          1 Hour Consultation $150
          <label htmlFor="">
            <input
              {...register("service")}
              type="radio"
              name="service"
              value={2}
            />
          </label>
          <label htmlFor="">
            Program Options Consultation $250
            <input
              {...register("service")}
              type="radio"
              name="service"
              value={3}
            />
          </label>
        </form>
      </div>
      <p>{backendError}</p>
      <div>
        <h2>Confirm date, time and type of service:</h2>
        <p>service is: {watch("service")}</p>
        <p>Date and time of Appointment: {`${selectedDate}`}</p>
      </div>
      <div>
        <button onClick={handlePayment}>Make Payment</button>
        <p>{errorMessage}</p>
      </div>
    </>
  );
}

export default Booking;
