import "./Booking.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

import axios from "axios";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone";
import countries from "../../assets/json/countries.json";

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

  // ----------------Yup validation------------------------
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup.string().phone().required(),
    country: yup.string().required(),
  });
  //------------react hook form-----------------------------

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );
  // -----------------------------------------------

  const onSubmit = (data) => {
    console.log(data);
    setService(watch(service));
  };

  function handlePayment() {
    if (!selectedDate || !watch("service")) {
      setErrorMessage("Date/time and type of service has to be selected");
      return;
    }
    //saving data to be uses to post when questionnaire is filled
    sessionStorage.setItem("dateAndTime", selectedDate);
    sessionStorage.setItem("typeOfService", watch("service"));
    sessionStorage.setItem("firstName", watch("firstName"));
    sessionStorage.setItem("lastName", watch("lastName"));
    sessionStorage.setItem("email", watch("email"));
    sessionStorage.setItem("phoneNumber", watch("phoneNumber"));
    sessionStorage.setItem("country", watch("country"));

    axios
      .post(PaymentUrl, {
        items: JSON.stringify([
          { id: parseInt(watch("service")), quantity: 1 },
        ]),
        email: watch("email"),
      })
      .then((response) => {
        console.log(response);
        window.location.href = `${response.data.url}`;
        handleBooking();
      })
      .catch((error) => {
        console.log(error);
        setBackendError(error.response.data.message);
      });
  }

  return (
    <>
      <h1 className="booking__title">Start your booking</h1>
      <div className="booking">
        <div className="form__two-inputs">
          <label className="form__label form__full-name" htmlFor="firstName">
            First Name
            <input
              type="text"
              name="firstName"
              className="form__first-name form__input-text"
              placeholder="First Name"
              {...register("firstName")}
            />
            <span className="form__error"> {errors.firstName?.message} </span>
          </label>

          <label className="form__label form__full-name" htmlFor="last-name">
            Last Name
            <input
              type="text"
              name="lastName"
              className="form__last-name form__input-text"
              placeholder="Last Name"
              {...register("lastName")}
            />
            <span className="form__error"> {errors.lastName?.message} </span>
          </label>
        </div>
        <div className="form__two-inputs">
          <label className="form__label" htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              className="form__email form__input-text"
              placeholder="Email"
              {...register("email")}
            />
            <span className="form__error"> {errors.email?.message} </span>
          </label>
        </div>
        {/* ------------------------------------------------------------------------------------- */}
        <div className="form__two-inputs">
          <label>
            country code
            <select
              className="form__input-text"
              {...register("country")}
              name="country"
            >
              <option value={""} selected disabled>
                --country code--
              </option>
              {countries.map((country, index) => {
                return (
                  <option key={index} value={country.dial_code}>
                    {/* <img
                        src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                      /> */}
                    {country.dial_code} {country.name}
                  </option>
                );
              })}
            </select>
            <span className="form__error"> {errors.country?.message} </span>
          </label>

          <label className="form__label" htmlFor="phone-number">
            Phone Number
            <input
              type="tel"
              name="phoneNumber"
              className="form__phone form__input-text"
              placeholder="Phone Number"
              {...register("phoneNumber")}
            />
            <span className="form__error"> {errors.phoneNumber?.message} </span>
          </label>
        </div>
        {/* ----------------------------------------------------------------- */}

        <div className="booking__form-container">
          <h2>Select type of service</h2>
          <form className="booking__form" onSubmit={handleSubmit(onSubmit)}>
            <div className="booking__inputs">
              <input
                {...register("service")}
                type="radio"
                name="service"
                value={1}
              />
              <label htmlFor="service">30 Min Consultation $100</label>
            </div>
            <div className="booking__inputs">
              <input
                {...register("service")}
                type="radio"
                name="service"
                value={2}
              />
              <label htmlFor="service">1 Hour Consultation $150</label>
            </div>
            <div className="booking__inputs">
              <input
                {...register("service")}
                type="radio"
                name="service"
                value={3}
              />
              <label htmlFor="">Program Options Consultation $250</label>
            </div>
          </form>
        </div>

        <div className="booking__date-picker-container">
          <DatePicker
            className="booking__date-picker"
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

        <p>{backendError}</p>
        <div className="booking__confirm">
          <div className="booking__confirm-text">
            <h2 className="booking__confirm-title">
              Confirm date, time and type of service:
            </h2>
            <h3>
              service is:{" "}
              {watch("service") == 1
                ? "30 Min Consultation"
                : watch("service") == 2
                ? "1 Hour Consultation"
                : watch("service") == 3
                ? "Option Program Consultation"
                : null}
            </h3>
            <h3>
              Date and time of Appointment: {`${selectedDate}`.slice(0, 21)}
            </h3>
          </div>
          <div className="booking__payment">
            <button className="booking__payment-button" onClick={handlePayment}>
              Make Payment
            </button>
            <p>{errorMessage}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Booking;
