import "./Hero.scss";
import { Link } from "react-router-dom";
import useTranslation from "../useTranslation/useTranslation";

function Hero() {
  const { language, setLanguage, setFallbackLanguage, t } = useTranslation();
  return (
    <section className="hero">
      <div className="hero__overlay">
        <div className="hero__container">
          <div className="hero__content">
            <h1 className="hero__content-title">
              {t("Your")} {t("first")} {t("step")} {t("towards")} {t("a")}{" "}
              {t("future")} {t("in")} {t("Canada")}
            </h1>

            <button onClick={() => setLanguage("ru")}>Change To Russian</button>
            <button onClick={() => setLanguage("en")}>Change To English</button>
            <Link to="/comingsoon">
              <button className="hero__button">Free Consultation</button>
            </Link>

            <Link to="/booking">
              <button className="hero__button">Book Now</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
