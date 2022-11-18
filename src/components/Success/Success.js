import "./Success.scss";
import axios from "axios";

const URLPostForm = "http://localhost:8080/clientsPost";

function Success() {
  function handleGoForm() {
    window.location.href = "http://localhost:3000/questionnaire";
  }

  //getting appointment info from session storage to be pass in the post request
  let dateAndTime = sessionStorage.getItem("dateAndTime").slice(0, 24);
  let dateOfAppointment = dateAndTime.substring(0, 15);
  let timeOfAppointment = dateAndTime.substring(16);
  let firstName = sessionStorage.getItem("firstName");
  let lastName = sessionStorage.getItem("lastName");
  let email = sessionStorage.getItem("email");
  let phoneNumber = sessionStorage.getItem("phoneNumber");

  axios
    .post(URLPostForm, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      dateOfAppointment: dateOfAppointment,
      timeOfAppointment: timeOfAppointment,
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
            <p>
              Please fill out the form to help us provide a better service for
              you{" "}
            </p>
            <button onClick={handleGoForm} className="button">
              {" "}
              Go to Form
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Success;
