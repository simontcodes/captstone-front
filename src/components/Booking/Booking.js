import "./Booking.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone";
import countries from "../../assets/json/countries.json";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const PaymentUrl = "http://localhost:8080/payment";
const googleCalendarUrl = "http://localhost:8080/googleCalendar";

function Booking({ handleBooking }) {
  //type of service
  const [service, setService] = useState(null);
  //error State for a user no to pay without the info
  const [errorMessage, setErrorMessage] = useState("");
  //error message from the backend
  const [backendError, setBackendError] = useState("");
  //state for react-calendar
  const [value, onChange] = useState(new Date());
  // state for available times
  const [availableHours, setAvailableHours] = useState([]);
  // state for hour chosen
  const [chosenTime, setChosenTime] = useState(
    "Please select an available time"
  );

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

  // -------------google calendar-----------------------------
  //needed an extra var because new Date alters the original var
  let startDate = value;

  const allHours = [
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  const takenHours = [];

  let hourOfAppointment;
  let hoursToPush = [];

  useEffect(() => {
    console.log("from:", startDate);
    axios
      .post(googleCalendarUrl, {
        startDate: JSON.stringify(startDate),
      })
      .then((response) => {
        console.log("to:", startDate.getDate() + 1);
        console.log("number of appointments that day:", response.data);
        response.data.map((appointment) => {
          hourOfAppointment = new Date(
            appointment.start.dateTime.toLocaleString("en-US", {
              timeZone: "America/Toronto",
            })
          );

          takenHours.push(`${hourOfAppointment}`.slice(16, 21));
        });

        // console.log(takenHours);
        for (let i = 0; i < allHours.length; i++) {
          let availHour = allHours[i];
          if (takenHours.includes(availHour)) {
            hoursToPush.push(0);
          } else {
            hoursToPush.push(availHour);
          }
        }

        setAvailableHours(hoursToPush);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [startDate]);

  // ---------------------------------------------------------
  function handleHour(hour) {
    setChosenTime(hour);
  }
  // -----------------------------------------------------------------

  const onSubmit = (data) => {
    console.log(data);
    setService(watch(service));
  };

  function handlePayment() {
    if (!value || !watch("service")) {
      setErrorMessage("Date/time and type of service has to be selected");
      return;
    }
    let dateToSave = value.toDateString().slice(0, 16);
    console.log(dateToSave);

    //saving data to be used after payment is successful
    sessionStorage.setItem("dateOfAppointment", dateToSave);
    sessionStorage.setItem("timeOfAppointment", chosenTime);
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
        <div>
          <Calendar
            onChange={onChange}
            minDate={new Date()}
            minDetail="year"
            value={value}
          />
        </div>
        <p>{backendError}</p>

        <div>{!availableHours.length && <p>Loading...</p>}</div>
        <div>
          {availableHours.length > 0 &&
            availableHours.map((hour, index) => {
              if (hour) {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      handleHour(hour);
                    }}
                  >
                    {hour}
                  </button>
                );
              }
            })}
        </div>

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
              Date and time of Appointment: {`${value}`.slice(0, 16)}at{" "}
              {chosenTime}
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
