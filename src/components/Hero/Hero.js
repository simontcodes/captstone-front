import "./Hero.scss";
import { Link } from "react-router-dom";

function Hero({ t }) {
  return (
    <section className="hero">
      <div className="hero__overlay">
        <div className="hero__container">
          <div className="hero__content">
            <h1 className="hero__content-title">
              {t("Your first step towards a future in Canada")}
            </h1>

            <Link to="/comingsoon">
              <button className="hero__button">{t("Free consultation")}</button>
            </Link>

            <Link to="/booking">
              <button className="hero__button">{t("Book now")}</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
