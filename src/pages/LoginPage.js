import Login from "../components/Login/Login";
import { useNavigate } from "react-router-dom";

//use this function to redirect from other pages

function LogInPage({
  isAdmin,
  handleLogin,
  isLoggedIn,
  isLoginError,
  errorMessage,
  hasQuestions,
}) {
  const navigate = useNavigate();

  console.log("already submitted form?", hasQuestions);

  if (isLoggedIn && isAdmin) {
    setTimeout(() => {
      navigate("/clients");
    }, 1000);
  } else if (isLoggedIn && !isAdmin) {
    if (hasQuestions === false) {
      setTimeout(() => {
        navigate(`/questionnaire`);
      }, 1000);
    } else {
      setTimeout(() => {
        navigate(`/clients/client/${localStorage.getItem("id")}`);
      }, 1000);
    }
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
