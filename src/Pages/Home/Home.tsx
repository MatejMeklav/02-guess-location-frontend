import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import HomeLoggedIn from "../../Layouts/Home/HomeLoggedIn";
import HomeLoggedOut from "../../Layouts/Home/HomeLoggedOut";
import DesktopNavLoggedIn from "../../Layouts/Navigation/DesktopNavLoggedIn";
import DesktopNavLoggedOut from "../../Layouts/Navigation/DesktopNavLoggedOut";
import MobileNavLoggedIn from "../../Layouts/Navigation/MobileNavLoggedIn";
import MobileNavLoggedOut from "../../Layouts/Navigation/MobileNavLoggedOut";
import "../../Assets/Styles/Home.css";
import "../../Assets/Styles/SignInUp.css";
import HomeLoggedInMobile from "../../Layouts/Home/HomeLoggedInMobile";
import "../../Assets/Styles/footer.css";
import FooterDesktop from "../../Layouts/Footer/FooterDesktop";
import FooterMobile from "../../Layouts/Footer/FooterMobile";

export default function Home() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem("key");
    if (key) {
      const dateNow = new Date();
      const decoded: any = jwtDecode(key);
      if (decoded.exp * 1000 < dateNow.getTime()) {
        setLogin(false);
      } else {
        setLogin(true);
      }
    } else {
      setLogin(false);
    }
  }, [login]);

  if (login) {
    return (
      <div className="home-page">
        <DesktopNavLoggedIn></DesktopNavLoggedIn>
        <MobileNavLoggedIn></MobileNavLoggedIn>
        <HomeLoggedIn></HomeLoggedIn>
        <HomeLoggedInMobile></HomeLoggedInMobile>
        <FooterDesktop></FooterDesktop>
        <FooterMobile></FooterMobile>
      </div>
    );
  } else {
    return (
      <div className="home-page">
        <DesktopNavLoggedOut></DesktopNavLoggedOut>
        <MobileNavLoggedOut></MobileNavLoggedOut>
        <HomeLoggedOut></HomeLoggedOut>
        <FooterDesktop></FooterDesktop>
        <FooterMobile></FooterMobile>
      </div>
    );
  }
}
