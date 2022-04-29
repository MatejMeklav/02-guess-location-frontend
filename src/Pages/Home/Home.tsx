import FooterDesktop from "../../Layouts/Footer/FooterDesktop";
import FooterMobile from "../../Layouts/Footer/FooterMobile";
import HomeLoggedIn from "../../Layouts/Home/HomeLoggedIn";
import HomeLoggedOut from "../../Layouts/Home/HomeLoggedOut";
import DesktopNavLoggedIn from "../../Layouts/Navigation/DesktopNavLoggedIn";
import DesktopNavLoggedOut from "../../Layouts/Navigation/DesktopNavLoggedOut";
import MobileNavLoggedIn from "../../Layouts/Navigation/MobileNavLoggedIn";
import MobileNavLoggedOut from "../../Layouts/Navigation/MobileNavLoggedOut";


export default function Home() {
  return (
    <div className="home-page">
      <DesktopNavLoggedIn></DesktopNavLoggedIn>
      <DesktopNavLoggedOut></DesktopNavLoggedOut>
      <MobileNavLoggedIn></MobileNavLoggedIn>
      <MobileNavLoggedOut></MobileNavLoggedOut>
      <HomeLoggedIn></HomeLoggedIn>
      <HomeLoggedOut></HomeLoggedOut>
      <FooterDesktop></FooterDesktop>
      <FooterMobile></FooterMobile>
    </div>
  )
}
