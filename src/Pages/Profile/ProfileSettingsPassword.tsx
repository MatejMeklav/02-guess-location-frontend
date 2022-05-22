import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import ConfirmedModal from "../../Layouts/ProfileSettings/ConfirmedModal";
import { LoginStatus } from "../../Config/LoginStatus";

export default function ProfileSettingsPassword() {
  const navigate = useNavigate();
  const [successfulResponse, setSuccessfulResponse] = useState(false);
  const [responseError, setResponseError] = useState("");
  const userId = LoginStatus();
  const [curPassField, setCurPassField] = useState("password");
  const [newPassField, setNewPassField] = useState("password");
  const [confirmNewPassField, setConfirmNewPassField] = useState("password");
  useEffect(() => {
    if (userId === "false") {
      navigate("/");
    }
  }, [successfulResponse, userId, curPassField]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    let oldPassword = (
      document.getElementById("curentPassword") as HTMLInputElement
    ).value;
    let newPassword = (
      document.getElementById("newPassword") as HTMLInputElement
    ).value;
    let confirmNewPassword = (
      document.getElementById("confirmNewPassword") as HTMLInputElement
    ).value;
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("key"),
    };
    axios
      .put(
        process.env.REACT_APP_BACKEND_SERVER_URL + "me/update-user-password",
        {
          oldPassword: oldPassword,
          password: newPassword,
          repeatedPassword: confirmNewPassword,
        },
        { headers }
      )
      .then((response) => {
        setSuccessfulResponse(true);
      })
      .catch((error) => {
        setResponseError("Invalid input!");
      });
    event.preventDefault();
  };

  const currentPassword = () => {
    if (curPassField === "password") {
      setCurPassField("text");
    } else {
      setCurPassField("password");
    }
  };
  const newPassword = () => {
    if (newPassField === "password") {
      setNewPassField("text");
    } else {
      setNewPassField("password");
    }
  };

  const confirmNewPassword = () => {
    if (confirmNewPassField === "password") {
      setConfirmNewPassField("text");
    } else {
      setConfirmNewPassField("password");
    }
  };

  return (
    <div className="profile-settings">
      {successfulResponse ? <ConfirmedModal></ConfirmedModal> : ""}
      <div className="information">
        <h4>
          Profile <span>settings.</span>
        </h4>
        <p>Change your password.</p>
        {responseError ? <p>{responseError}</p> : ""}
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>
              <span>Curent password</span>
            </label>
            <input
              className="settings-form-input"
              id="curentPassword"
              type={curPassField}
              name="curentPassword"
            />
            {successfulResponse ? (
              ""
            ) : (
              <img
                onClick={() => currentPassword()}
                src={require("../../Layouts/Images/visibleEye.png")}
                alt="eye"
              ></img>
            )}
          </div>
          <div className="input-container">
            <label>
              <span>New password</span>
            </label>
            <input
              className="settings-form-input"
              id="newPassword"
              type={newPassField}
              name="newPassword"
            />
            {successfulResponse ? (
              ""
            ) : (
              <img
                onClick={() => newPassword()}
                src={require("../../Layouts/Images/visibleEye.png")}
                alt="eye"
              ></img>
            )}
          </div>
          <div className="input-container">
            <label>
              <span>Confirm new password</span>
            </label>
            <input
              className="settings-form-input"
              id="confirmNewPassword"
              type={confirmNewPassField}
              name="confirmNewPassword"
            />
            {successfulResponse ? (
              ""
            ) : (
              <img
                onClick={() => confirmNewPassword()}
                src={require("../../Layouts/Images/visibleEye.png")}
                alt="eye"
              ></img>
            )}
          </div>
          <div id="submit-password" className="submit">
            <button type="submit">SUBMIT</button>
            <Link to={"/settings"}>Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
