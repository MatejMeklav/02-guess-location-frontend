import React, { useState } from "react";
import { IconContext } from "react-icons";
import { AiFillPlusCircle, AiOutlineClose } from "react-icons/ai";
import { MdMenu } from "react-icons/md";
import GeotaggerLogo from "../GeotaggerLogo";
import MobileLinksHamburgerLoggedIn from "./Links/MobileLinksHamburgerLoggedIn";
import "../../Assets/Styles/SignInUp.css";
import { Link } from "react-router-dom";

export default function MobileNavLoggedIn() {
  const [open, setOpen] = useState(false);
  const hamburgerIcon = (
    <svg className="svg-outside" width="30px" height="30px">
      <defs>
        <linearGradient id="myGradient" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="#659E89" />
          <stop offset="32.12%" stopColor="#619B8A" />
          <stop offset="100%" stopColor="#A1C181" />
        </linearGradient>
      </defs>
      <IconContext.Provider value={{ attr: { fill: "url('#myGradient')" } }}>
        <MdMenu
          onClick={() => setOpen(!open)}
          size={25}
          width="30px"
          height="30px"
          className="hamburger"
        ></MdMenu>
      </IconContext.Provider>
    </svg>
  );

  const closeIcon = (
    <svg className="svg-outside" width="30px" height="30px">
      <defs>
        <linearGradient id="myGradient" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="#659E89" />
          <stop offset="32.12%" stopColor="#619B8A" />
          <stop offset="100%" stopColor="#A1C181" />
        </linearGradient>
      </defs>
      <IconContext.Provider value={{ attr: { fill: "url('#myGradient')" } }}>
        <AiOutlineClose
          onClick={() => setOpen(!open)}
          className="close"
          size={25}
          width="30px"
          height="30px"
          color="orange"
        ></AiOutlineClose>
      </IconContext.Provider>
    </svg>
  );

  const createIcon = (
    <svg className="svg-outside" width="40px" height="40px">
      <defs>
        <linearGradient id="myGradient" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="#659E89" />
          <stop offset="32.12%" stopColor="#619B8A" />
          <stop offset="100%" stopColor="#A1C181" />
        </linearGradient>
      </defs>
      <IconContext.Provider value={{ attr: { fill: "url('#myGradient')" } }}>
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
      <nav className="Mobile-nav-logged-in">
        <div className="toggle-menu">{open ? closeIcon : hamburgerIcon}</div>
        {!open && <GeotaggerLogo></GeotaggerLogo>}

        <Link to={"/create"}>{!open && createIcon}</Link>
      </nav>
      <nav className="links">
        {open && <MobileLinksHamburgerLoggedIn></MobileLinksHamburgerLoggedIn>}
      </nav>
    </>
  );
}
