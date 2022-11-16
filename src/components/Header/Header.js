import "./Header.scss";
import Logo from "../../assets/logo/cmLogo.png";
import { NavLink } from "react-router-dom";
import englishIcon from "../../assets/icons/english.png";
import russianIcon from "../../assets/icons/russian.png";
import spanishIcon from "../../assets/icons/spanish.png";

function Header({ isLoggedIn, handleLogout, setLanguage, t }) {
  return (
    <header className="header">
      <div className="header__container">
        <nav className="nav">
          <div className="nav__logo">
            <NavLink className="nav__link" to="/">
              <img className="nav__logo-image" src={Logo} alt="" />
            </NavLink>
          </div>
          <ul className="nav__links">
            <li>
              <NavLink className="nav__link" to="/">
                {t("Home")}
              </NavLink>
            </li>
            <li>
              <a className="nav__link" href="#about">
                {t("About")}
              </a>
            </li>
            <li>
              <a className="nav__link" href="#contact">
                {t("Contact")}
              </a>
            </li>
            {!isLoggedIn && (
              <li>
                <NavLink className="nav__link" to="login">
                  {t("Log In")}
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                {" "}
                <NavLink className="nav__link" to="clients">
                  {t("Clients")}
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                {" "}
                <NavLink className="nav__link" to="appointments">
                  {t("Appointments")}
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li onClick={handleLogout}>
                {" "}
                <NavLink className="nav__link" to="clients">
                  {" "}
                  {t("Log Out")}{" "}
                </NavLink>
              </li>
            )}
            <li>
              <button
                className="nav__language"
                onClick={() => {
                  console.log("this is clicking");
                  setLanguage("sp");
                }}
              >
                <img src={spanishIcon} alt="Russian Language Icon" />
              </button>
              <button
                className="nav__language"
                onClick={() => setLanguage("en")}
              >
                <img src={englishIcon} alt="English Language Icon" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
