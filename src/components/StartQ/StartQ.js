import "./StartQ.scss";
import { Link } from "react-router-dom";

function StartQ() {
  return (
    <section className="start">
      <div className="start__container">
        <div className="start__container-left">
          <p>Free consultation</p>
          <Link to="/comingsoon">
            <button>Start Now</button>
          </Link>
        </div>
        <div className="start__container-right">
          <p>Book a consultation</p>
          <Link to="/booking">
            <button>Book Now</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default StartQ;
