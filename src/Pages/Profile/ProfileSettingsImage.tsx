import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import ConfirmedModal from "../../Layouts/ProfileSettings/ConfirmedModal";
import { LoginStatus } from "../../Config/LoginStatus";

export default function ProfileSettingsImage() {
  const navigate = useNavigate();
  const [successfulResponse, setSuccessfulResponse] = useState(false);
  const [secureUrl, setSecureUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [fileToUpload, setFileToUpload] = useState();
  const userId = LoginStatus();
  useEffect(() => {
    if (userId === "false") {
      navigate("/");
    }
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("key"),
    };

    axios
      .get(process.env.REACT_APP_BACKEND_SERVER_URL + "users/user", { headers })
      .then((response) => {
        console.log(response.data.imageUrl);
        setImgUrl(response.data.image);
      })
      .catch((error) => {});

    if (secureUrl !== "") {
      console.log("working");
      console.log(secureUrl);
      console.log(JSON.stringify(fileToUpload));
      axios({
        method: "PUT",
        url: secureUrl,
        data: fileToUpload, // NOTE - this is the file not the FormData Object
        headers: {
          "Content-Type": "image/png",
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      const imageUrl = secureUrl.split("?")[0];
      axios
        .put(
          process.env.REACT_APP_BACKEND_SERVER_URL +
            "me/update-user-profile-image",
          { image: imageUrl },
          { headers }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      setImgUrl(imageUrl);
      setSecureUrl("");
    }
  }, [secureUrl, navigate, fileToUpload, successfulResponse, userId]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    // @ts-ignore: Object is possibly 'null'.
    let fileToUpload = (
      document.getElementById("fileUpload") as HTMLInputElement
    ).files[0];
    // @ts-ignore: Object is possibly 'null'.
    setFileToUpload(fileToUpload);
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("key"),
    };
    axios
      .get(process.env.REACT_APP_BACKEND_SERVER_URL + "secure-url", {
        headers,
      })
      .then((response) => {
        setSuccessfulResponse(true);
        setSecureUrl(response.data);
      })
      .catch((error) => {});
    event.preventDefault();
  };

  return (
    <div className="profile-settings">
      {successfulResponse ? <ConfirmedModal></ConfirmedModal> : ""}
      <div className="information">
        <h4>
          Profile <span>settings.</span>
        </h4>
        <p>Change your profile photo.</p>
      </div>
      <div className="profile-photo">
        {imgUrl ? (
          <img id="toggle" src={imgUrl} alt="profile logo"></img>
        ) : (
          <img
            id="toggle"
            src={require("../../Layouts/Images/ProfileLogo.png")}
            alt="profile logo"
          ></img>
        )}
      </div>
      <div className="form">
        <form id="form-image" onSubmit={handleSubmit}>
          <div className="input-container">
            <label className="custom-file-upload">
              UPLOAD NEW IMAGE
              <input type="file" id="fileUpload" />
            </label>
          </div>
          <div className="submit">
            <button type="submit">SUBMIT</button>
            <Link to={"/settings"}>Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
