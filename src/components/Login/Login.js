import "./Login.scss";
import { Link} from "react-router-dom";

function Login({ isLoginError, errorMessage, handleLogin }) {
  return (
    <div className="login">
      <div className="login__left">
        
      </div>
      <div className="login__right">
        {isLoginError && <label style={{ color: "red" }}>{errorMessage}</label>}
        <form className="login__form" onSubmit={handleLogin}>
        <h1>Login</h1>
          <div >
          <input placeholder="Email" className="login__inputs" type="text" name="email" />
          </div>
          <div >
            <input placeholder="Password"  className="login__inputs" type="password" name="password" />
          </div>
          <Link className="login__forgot" to={"#"}>forgot your password?</Link>
          <div className="login__buttons">
          <button  className="login__register">
            Register
          </button>

          <button className="login__login" type="submit">
            Sign In
          </button>

          </div>
          
        </form>
      </div>
    </div>
  );
}

export default Login;
