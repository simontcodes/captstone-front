import "./StartQ.scss";
import { Link } from "react-router-dom";

function StartQ() {
  return (
    <section className="start">
      <div className="start__container">
        <div className="start__container-left">
          <p>take our questionnaire and start your journey to Canada now!</p>
          <Link to="/questionnaire">
            <button>Start Now</button>
          </Link>
        </div>
        <div className="start__container-right">
          <p>pick your date for consultation!</p>
          <Link to="/booking">
            <button>Book Now</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default StartQ;
