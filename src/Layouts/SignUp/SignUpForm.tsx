import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ButtonGreen from "../ButtonGreen";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const [signupRes, setSignupRes] = useState("");
  const navigate = useNavigate();
  const [passField, setPassField] = useState("password");
  const [confirmPassField, setConfirmPassField] = useState("password");

  useEffect(() => {
    if (signupRes === "Success") {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      navigate("/email");
    }
  }, [signupRes]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    var { email, firstName, lastName, password, confirmPassword } =
      document.forms[0];
    axios
      .post(process.env.REACT_APP_BACKEND_SERVER_URL + "signup", {
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        password: password.value,
        repeatedPassword: confirmPassword.value,
      })
      .then((response) => {
        setSignupRes("Success");
      })
      .catch((error) => {
        setSignupRes(error.response.data.message);
      });
    event.preventDefault();
  };

  const password = () => {
    if (passField === "password") {
      setPassField("text");
    } else {
      setPassField("password");
    }
  };
  const confirmPassword = () => {
    if (confirmPassField === "password") {
      setConfirmPassField("text");
    } else {
      setConfirmPassField("password");
    }
  };

  return (
    <div className="sign-up-form-container">
      <div className="upper-container">
        <h3>Sign Up</h3>
        <p>Your name will appear on posts and your public profle.</p>
        <p>{signupRes}</p>
        <img src={require("../Images/ProfileLogo.png")} alt="google maps"></img>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>
              <span>Email</span>
            </label>
            <input className="sign-up-form-input" type="text" name="email" />
          </div>
          <div className="input-container-name">
            <div className="input-container">
              <label>
                <span>First Name</span>
              </label>
              <input
                className="sign-up-form-input"
                type="text"
                name="firstName"
              />
            </div>
            <div className="input-container">
              <label>
                <span>LastName</span>
              </label>
              <input
                className="sign-up-form-input"
                type="text"
                name="lastName"
              />
            </div>
          </div>
          <div className="input-container">
            <label>
              <span>Password</span>
            </label>
            <input
              className="sign-up-form-input"
              type={passField}
              name="password"
            />
            <img
              onClick={() => password()}
              id="toggle"
              src={require("../Images/visibleEye.png")}
              alt="eye"
            ></img>
          </div>
          <div className="input-container">
            <label>
              <span>Confirm password</span>
            </label>
            <input
              className="sign-up-form-input"
              type={confirmPassField}
              name="confirmPassword"
            />
            <img
              onClick={() => confirmPassword()}
              src={require("../Images/visibleEye.png")}
              alt="eye"
            ></img>
          </div>
          <ButtonGreen page={false}></ButtonGreen>
        </form>
        <nav className="lower-part">
          <p>Already have an account?</p>
          <Link to="/signin">Sign in</Link>
        </nav>
      </div>
    </div>
  );
}
