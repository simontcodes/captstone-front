import "./Success.scss";


function Success() {
    function handleGoForm () {
        window.location.href = "http://localhost:3000/questionnaire";
    }
  return (
    <>

      <div className="modal">
        <div className="modal__popup">
          
            <div className="modal__photo">
            </div>
            <div className="modal__text">
              <h1>Your Appointment has been schedule!</h1>
              <p>Please fill out the form to help us provide a better service for you  </p>
            <button onClick={handleGoForm} className="button"> Go to Form</button>
       
            </div>
            
          
        </div>
       
      </div>
    </>
  );
}

export default Success;