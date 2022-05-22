import { useEffect, useState } from "react";
import UsersUploads from "./UsersUploads";
import "../../Assets/Styles/Profile.css";
import axios from "axios";
import PbImagesListProfile from "./PbImagesListProfile";
import { LoginStatus } from "../../Config/LoginStatus";
import { useNavigate } from "react-router";

export default function ProfileLayout() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const userId = LoginStatus();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(userId);
    if (userId === "false") {
      navigate("/");
    }
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("key"),
    };
    axios
      .get(process.env.REACT_APP_BACKEND_SERVER_URL + "users/user", { headers })
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setImageUrl(response.data.image);
      })
      .catch((error) => {});
  }, [userId]);
  return (
    <div className="profile-page">
      <div className="profile-data">
        {imageUrl ? (
          <img src={imageUrl} alt="profile"></img>
        ) : (
          <img src={require("../Images/ProfileLogo.png")} alt="profile"></img>
        )}
        <h4>
          {firstName} {lastName}
        </h4>
      </div>

      <div className="best-guess">
        <h5>My best guesses</h5>
        <PbImagesListProfile></PbImagesListProfile>
      </div>
      <div className="my-uploads">
        <h5>My uploads</h5>
        <UsersUploads></UsersUploads>
      </div>
    </div>
  );
}
