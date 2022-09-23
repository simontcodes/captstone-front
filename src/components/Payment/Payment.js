import "./Payment.scss";
import axios from "axios";

const PaymentUrl = "http://localhost:8080/payment";
const testPaymentArr = [{ id: 1, quantity: 1 }];

function Payment({ handleBooking }) {

  function handlePayment() {
    axios
      .post(PaymentUrl, {
        items: JSON.stringify(testPaymentArr),
      })
      .then((response) => {
        console.log(response);
        window.location.href = `${response.data.url}`;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    
      <div>
        <button onClick={handlePayment}>Make Payment</button>
      </div>
  );
}

export default Payment;
