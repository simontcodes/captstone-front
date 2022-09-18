import Login from "../components/Login/Login";



function LogInPage({ handleLogin, handleLogout, isLoggedIn, isLoginError, errorMessage}) {
 

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
