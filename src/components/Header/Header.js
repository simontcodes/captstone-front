import "./Header.scss";
import Logo from "../../assets/logo/cmLogo.png";
import { NavLink } from "react-router-dom";

function Header({ isLoggedIn, handleLogout }) {
  

  return (
    <header className="header">
      <div className="header__container">
        <nav className="nav">
          <div className="nav__logo">
            <img src={Logo} alt="" />
          </div>
          
            <ul className="nav__links">
              <li>
                <NavLink className='nav__link' to="/">Home</NavLink>
              </li>
              <li>
                <NavLink className='nav__link' to="about-us">About</NavLink>
              </li>
              <li>
                <NavLink className='nav__link' to="contact-us">Contact</NavLink>
              </li>
              {!isLoggedIn && <li>
                <NavLink className='nav__link' to="login">Log In</NavLink>
              </li>}
              {isLoggedIn && <li> <button onClick={handleLogout}>Log out</button> 
              </li>}
              
            </ul>
          
        </nav>
      </div>
    </header>
  );
}

export default Header;
