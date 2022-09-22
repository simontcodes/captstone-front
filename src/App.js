import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BookingPage from "./pages/BookingPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import LoginPage from "./pages/LoginPage";
import ClientsPage from "./pages/ClientsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const URLlogin = "http://localhost:8080/login";
  const URLprofile = "http://localhost:8080/clients";

  //--------------this axios call is to check if user is loggedin-----
  useEffect(() => {
    // Here grab the token from sessionStorage and then make an axios request to profileUrl endpoint.
    axios
      .get(URLprofile, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("JWTtoken")}`,
        },
      })
      .then((response) => {
        setIsLoggedIn(true)
        
      })
      .catch((error) => {
        // console.log(error);
       
      });
  }, []);
//--------------
  function handleLogin(event) {
    event.preventDefault();
    axios
      .post(URLlogin, {
        email: event.target.email.value,
        password: event.target.password.value,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("JWTtoken", response.data.token);
        
        setIsLoggedIn(true);
        setIsLoginError(false);
        setErrorMessage("");
      })
      .catch((error) => {
        console.log(error);
        setIsLoginError(true);
        setErrorMessage(error.response.data.error);
      });
  }

  const handleLogout = (event) => {
    setIsLoggedIn(false);
    localStorage.removeItem("JWTtoken");
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="about-us" element={<AboutPage />} />
          <Route path="contact-us" element={<ContactPage />} />
          <Route path="questionnaire" element={<QuestionnairePage />} />
          <Route path="booking" element={<BookingPage />} />
          <Route
            path="login"
            element={
              <LoginPage
                errorMessage={errorMessage}
                isLoggedIn={isLoggedIn}
                isLoginError={isLoginError}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
              />
            }
          />
          <Route path="clients" element={<ClientsPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
