import Login from "../components/Login/Login";
import axios from "axios";
import { useState } from "react";

function LogInPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const URLlogin = "http://localhost:8080/login";

  const handleLogin = (event) => {
    event.preventDefault();
   
    axios
      .post(URLlogin, {
        email: event.target.email.value,
        password: event.target.password.value,
      })
      .then((response) => {
        console.log(response.data)
        localStorage.setItem("JWTtoken", response.data.token);

        setIsLoggedIn(true);
        setIsLoginError(false);
        setErrorMessage("");
      })
      .catch((error) => {
        console.log(error)
        setIsLoginError(true);
        setErrorMessage(error.response.data.error);
      });
  };

  const handleLogout = (event) => {
        setIsLoggedIn(false);
        localStorage.removeItem("JWTtoken");
  }

  if (!isLoggedIn)
    return (
      <Login
        isLoginError={isLoginError}
        errorMessage={errorMessage}
        handleLogin={handleLogin}
      />
    );
    return (
        <>
        <div className="">
          <h1>You are Logged in!</h1>
        </div>
        <button onClick={handleLogout}>Log Out</button>
        </>
      );
}

export default LogInPage;
