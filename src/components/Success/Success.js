import "./Success.scss";


function Success() {
    function handleGoForm () {
        window.location.href = "http://localhost:3000/questionnaire";
    }
  return (
    <>

      <div className="modal-payment">
        <div className="modal-payment__popup">
          
            <div className="modal-payment__photo">
            </div>
            <div className="modal-payment__text">
              <h1>Your payment has been received!</h1>
              <p>Please fill out the next form to gather information for your appointment.  </p>
            <button onClick={handleGoForm} className="button"> Go to Form</button>
       
            </div>
            
          
        </div>
       
      </div>
    </>
  );
}

export default Success;