import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ButtonGreen from "../ButtonGreen";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function SignInForm() {
  const [loginRes, setLoginRes] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event: { preventDefault: () => void }) => {
    var { email, password } = document.forms[0];
    axios
      .post(process.env.REACT_APP_BACKEND_SERVER_URL + "signin", {
        email: email.value,
        password: password.value,
      })
      .then((response) => {
        setLoginRes("Success");
        localStorage.setItem("key", response.data.key);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          if (error.response.data.message === "Unauthorized") {
            setLoginRes("Check your input!");
          } else {
            setLoginRes("Wrong email or password!");
          }
        }
      });
    event.preventDefault();
  };

  useEffect(() => {
    if (loginRes === "Success") {
      navigate("/");
    }
  }, [loginRes]);
  return (
    <div id="login-form" className="sign-up-form-container">
      <div className="upper-container">
        <h3>Sign in</h3>
        <p>Welcome back to Geotagger. We are glad that you are back.</p>
        <p>{loginRes}</p>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>
              <span>Email</span>
            </label>
            <input className="sign-up-form-input" type="text" name="email" />
          </div>
          <div className="input-container">
            <label>
              <span>Password</span>
            </label>
            <input
              className="sign-up-form-input"
              type="password"
              name="password"
            />
          </div>
          <ButtonGreen page={true}></ButtonGreen>
        </form>
        <nav className="lower-part">
          <p>Do you want to create an account?</p>
          <Link to="/signup">Sign up</Link>
        </nav>
      </div>
    </div>
  );
}
