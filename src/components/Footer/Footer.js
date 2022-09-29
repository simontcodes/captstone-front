import "./Footer.scss";
import Telegram from "../../assets/icons/telegram.svg";
import Instagram from "../../assets/icons/instagram.svg";
import Mail from "../../assets/icons/envelope.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__icons">
        <Link to="t.me/albina_canada" className="footer__icon">
          {" "}
          <img
            className="footer__icon-img"
            src={Telegram}
            alt="telegram icon"
          />
        </Link>
        <Link
          to={{ pathname: "https://www.instagram.com/albina_in_canada" }}
          className="footer__icon"
        >
          {" "}
          <img
            className="footer__icon-img"
            src={Instagram}
            alt="instagram icon"
          />
        </Link>
        <Link className="footer__icon">
          <img className="footer__icon-img" src={Mail} alt="mail icon" />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
