import "./Modal.scss";


function Modal() {
    function handleGoHome () {
        window.location.href = "http://localhost:3000";
    }
  return (
    <>

      <div className="modal">
        <div className="modal__popup">
          
            <div className="modal__photo">
            </div>
            <div className="modal__text">
              <h1>Your booking is completed!</h1>
              <p>Check your email for details of your appointment</p>
            <button onClick={handleGoHome} className="button"> Home</button>
       
            </div>
            
          
        </div>
       
      </div>
    </>
  );
}

export default Modal;
