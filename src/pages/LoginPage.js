import Login from "../components/Login/Login";
import { useNavigate } from "react-router-dom";

//use this function to redirect from other pages

function LogInPage({ handleLogin, isLoggedIn, isLoginError, errorMessage }) {
  const navigate = useNavigate();

  if (isLoggedIn) {
    setTimeout(() => {
      navigate("/clients");
    }, 1000);
  }

  if (!isLoggedIn)
    return (
      <main className="background">
        <div className="background__card">
          <Login
            isLoginError={isLoginError}
            errorMessage={errorMessage}
            handleLogin={handleLogin}
          />
        </div>
      </main>
    );
  return (
    <>
      <div className="">
        <h1>You were succesfully logged in!</h1>
      </div>
    </>
  );
}

export default LogInPage;
