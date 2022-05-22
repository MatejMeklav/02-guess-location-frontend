import React from "react";
import { IconContext } from "react-icons";
import { AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function DesktopLinksLoggedIn() {
  const createIcon = (
    <svg className="svg-outside-desktop" width="40px" height="40px">
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="#659E89" />
          <stop offset="32.12%" stopColor="#619B8A" />
          <stop offset="100%" stopColor="#A1C181" />
        </linearGradient>
      </defs>
      <IconContext.Provider value={{ attr: { fill: "url('#gradient')" } }}>
        <AiFillPlusCircle
          className="create-circle"
          size={40}
          width="30px"
          height="30px"
          color="green"
        ></AiFillPlusCircle>
      </IconContext.Provider>
    </svg>
  );
  return (
    <>
      <ul>
        <Link to={"/"}>
          <li className="text">Home</li>
        </Link>
        <Link to={"/settings"}>
          <li className="text">Profile settings</li>
        </Link>
        <Link to={"/logout"}>
          <li className="text">Logout</li>
        </Link>
        <Link to={"/profile"}>
          <li>
            <img
              src={require("../../Images/ProfileLogo.png")}
              alt="profile"
            ></img>
          </li>
        </Link>
        <Link to={"/create"}>
          <li>{createIcon}</li>
        </Link>
      </ul>
    </>
  );
}
