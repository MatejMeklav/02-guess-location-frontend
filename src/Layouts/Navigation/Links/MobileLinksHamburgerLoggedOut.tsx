import React, { useState } from "react";
import ArrowOpen from "../../ArrowOpen";
import ButtonGreen from "../../ButtonGreen";

import "../../../Assets/Styles/SignInUp.css";
import { Link } from "react-router-dom";

export default function MobileLinksHamburgerLoggedOut() {
  return (
    <div className="links-inside">
      <div className="link-item-arrow">
        <h5>Home</h5>
        <ArrowOpen></ArrowOpen>
      </div>
      <Link to={"/signin"}>
        <ButtonGreen page={true}></ButtonGreen>
      </Link>
      <div id="sign-in-btn">
        <Link to={"/signup"}>
          <ButtonGreen page={false}></ButtonGreen>
        </Link>
      </div>
    </div>
  );
}
