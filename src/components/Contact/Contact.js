import "./Contact.scss";
import Telegram from "../../assets/icons/telegram.svg";
import Instagram from "../../assets/icons/instagram.svg";
import Mail from "../../assets/icons/envelope.svg";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact__container-left">
        <h2 className="contact__title">
          We are located at Suite 200, 1920 Yonge Street, Toronto ON M4S 3E2
        </h2>
        <iframe
          className="contact__map"
          title="office address"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2039.7194453248658!2d-79.3982346160376!3d43.69810141350756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3338af13ccbf%3A0x277026dd12f167e2!2sTim%20Hortons!5e0!3m2!1sen!2sca!4v1663473132883!5m2!1sen!2sca"
          width="600"
          height="450"
          // style="border:0;"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="contact__container-right">
        <h2 className="contact__text">Follow us in social media</h2>
      <div className="contact__icons">
        <Link to="t.me/albina_canada" className="contact__icon">
          
          <img
            className="contact__icon-img"
            src={Telegram}
            alt="telegram icon"
          />
        </Link>
        <Link
          to={{ pathname: "https://www.instagram.com/albina_in_canada" }}
          className="contact__icon"
        >
          
          <img
            className="contact__icon-img"
            src={Instagram}
            alt="instagram icon"
          />
        </Link>
        <Link className="contact__icon">
          <img className="contact__icon-img" src={Mail} alt="mail icon" />
        </Link>
      </div>
      </div>
      
    </section>
  );
}

export default Contact;
