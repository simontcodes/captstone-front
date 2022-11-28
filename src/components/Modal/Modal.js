import "./Modal.scss";
import { useNavigate } from "react-router-dom";

function Modal() {
  const navigate = useNavigate();
  function handleGoHome() {
    navigate(`/clients/client/${localStorage.getItem("id")}`);
  }
  return (
    <>
      <div className="modal">
        <div className="modal__popup">
          <div className="modal__photo"></div>
          <div className="modal__text">
            <h1>Your profile has been Updated!</h1>
            {/* <p>Check your email for details of your appointment</p> */}
            <button onClick={handleGoHome} className="button">
              {" "}
              Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
