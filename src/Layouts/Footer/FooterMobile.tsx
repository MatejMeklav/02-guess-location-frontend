import React from "react";
import "../../Assets/Styles/footer.css";

export default function FooterMobile() {
  return (
    <div className="footer-mobile">
      <img
        src={require("../../Layouts/Images/logo_footer_mobile.png")}
        alt="google maps"
      ></img>
      <p>All Rights Reserved | skillupmentor.com</p>
    </div>
  );
}
