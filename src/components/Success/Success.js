import "./Success.scss";
import axios from "axios";

const URLPostForm = "http://localhost:8080/clientsPost";

function Success() {
  function handleGoHome() {
    window.location.href = "http://localhost:3000";
  }

  //getting appointment info from session storage to be passed in the post request
  let dateAndTime =
    sessionStorage.getItem("dateOfAppointment") +
    " " +
    sessionStorage.getItem("timeOfAppointment") +
    ":00";
  let phoneNumber =
    sessionStorage.getItem("country") + sessionStorage.getItem("phoneNumber");

  axios
    .post(URLPostForm, {
      firstName: sessionStorage.getItem("firstName"),
      lastName: sessionStorage.getItem("lastName"),
      email: sessionStorage.getItem("email"),
      phoneNumber: phoneNumber,
      dateOfAppointment: sessionStorage.getItem("dateOfAppointment"),
      timeOfAppointment: sessionStorage.getItem("timeOfAppointment"),
      dateAndTime: dateAndTime,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <>
      <div className="modal">
        <div className="modal__popup">
          <div className="modal__photo"></div>
          <div className="modal__text">
            <h1>Your Appointment has been schedule!</h1>
            <p>Please log in and fill out the form before the apppointment</p>
            <button onClick={handleGoHome} className="button">
              {" "}
              Go to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Success;
