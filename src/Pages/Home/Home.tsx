import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import HomeLoggedIn from "../../Layouts/Home/HomeLoggedIn";
import HomeLoggedOut from "../../Layouts/Home/HomeLoggedOut";
import DesktopNavLoggedIn from "../../Layouts/Navigation/DesktopNavLoggedIn";
import DesktopNavLoggedOut from "../../Layouts/Navigation/DesktopNavLoggedOut";
import MobileNavLoggedIn from "../../Layouts/Navigation/MobileNavLoggedIn";
import MobileNavLoggedOut from "../../Layouts/Navigation/MobileNavLoggedOut";
import '../../Assets/Styles/Home.css';
import '../../Assets/Styles/SignInUp.css';
import HomeLoggedInMobile from "../../Layouts/Home/HomeLoggedInMobile";
import HomeLoggedOutMobile from "../../Layouts/Home/HomeLoggedOutMobile";
import Footer from "../../Layouts/Footer/Footer";


export default function Home() {

  const[login, setLogin] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem('key');
    if (key) {
      const dateNow = new Date();
      const decoded:any = jwtDecode(key);
      if (decoded.exp * 1000 < dateNow.getTime()) {
        setLogin(false);
        console.log('false');
      } else {
        setLogin(true);
        console.log('true');
      }
    }

  },[login])

  if(login){
    return(
      <div className="home-page">
      <DesktopNavLoggedIn></DesktopNavLoggedIn>
      <MobileNavLoggedIn></MobileNavLoggedIn>
      <HomeLoggedIn></HomeLoggedIn>
      <HomeLoggedInMobile></HomeLoggedInMobile>
      <Footer></Footer>
    </div>   
    )
  }else {
    return (
      <div className="home-page">
        <DesktopNavLoggedOut></DesktopNavLoggedOut>
        <MobileNavLoggedOut></MobileNavLoggedOut>
        <HomeLoggedOut></HomeLoggedOut>
        <HomeLoggedOutMobile></HomeLoggedOutMobile>
        <Footer></Footer>
      </div>
    )

  }
}
