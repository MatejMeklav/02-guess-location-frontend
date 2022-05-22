import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../../Assets/Styles/ProfileSettings.css";
import ConfirmedModal from "../../Layouts/ProfileSettings/ConfirmedModal";
import { LoginStatus } from "../../Config/LoginStatus";

export default function ProfileSettings() {
  const navigate = useNavigate();
  const [successfulResponse, setSuccessfulResponse] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [responseError, setResponseError] = useState("");
  const userId = LoginStatus();
  useEffect(() => {
    if (userId === "false") {
      navigate("/");
    }

    const headers = {
      Authorization: "Bearer " + localStorage.getItem("key"),
    };

    axios
      .get(process.env.BACKEND_SERVER_URL + "users/user", { headers })
      .then((response) => {
        console.log(response);
        setEmail(response.data.email);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
      })
      .catch((error) => {});
  }, [successfulResponse, responseError, userId]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    var { email, firstName, lastName } = document.forms[0];

    const headers = {
      Authorization: "Bearer " + localStorage.getItem("key"),
    };
    axios
      .put(
        process.env.REACT_APP_BACKEND_SERVER_URL + "me/update-user-info",
        {
          email: email.value,
          firstName: firstName.value,
          lastName: lastName.value,
        },
        { headers }
      )
      .then((response) => {
        setSuccessfulResponse(true);
      })
      .catch((error) => {
        setResponseError(error.response.data);
      });
    event.preventDefault();
  };
  return (
    <div className="profile-settings">
      {successfulResponse ? <ConfirmedModal></ConfirmedModal> : ""}
      <div className="information">
        <h4>
          Profile <span>settings.</span>
        </h4>
        <p>Change your information.</p>
        {responseError ? <p>{responseError}</p> : ""}
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>
              <span>Email</span>
            </label>
            <input
              className="settings-form-input"
              defaultValue={email}
              type="text"
              name="email"
            />
          </div>
          <div className="input-container-name">
            <div className="input-container">
              <label>
                <span>First Name</span>
              </label>
              <input
                className="settings-form-input"
                defaultValue={firstName}
                type="text"
                name="firstName"
              />
            </div>
            <div className="input-container">
              <label>
                <span>Last Name</span>
              </label>
              <input
                className="settings-form-input"
                defaultValue={lastName}
                type="text"
                name="lastName"
              />
            </div>
          </div>
          <div className="links">
            <Link id="settings-pass-btn" to={"/settings-password"}>
              Change password
            </Link>
            <Link id="settings-pic-btn" to={"/settings-profile-picture"}>
              Change profile picture
            </Link>
          </div>
          <div className="submit">
            <button type="submit">SUBMIT</button>
            <Link to={"/"}>Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
