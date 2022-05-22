import FooterDesktop from "../../Layouts/Footer/FooterDesktop";
import FooterMobile from "../../Layouts/Footer/FooterMobile";
import DesktopNavLoggedIn from "../../Layouts/Navigation/DesktopNavLoggedIn";
import MobileNavLoggedIn from "../../Layouts/Navigation/MobileNavLoggedIn";
import ProfileLayout from "../../Layouts/Profile/ProfileLayout";

export default function Profile() {
  return (
    <>
      <MobileNavLoggedIn></MobileNavLoggedIn>
      <DesktopNavLoggedIn></DesktopNavLoggedIn>
      <ProfileLayout></ProfileLayout>
      <FooterMobile></FooterMobile>
      <FooterDesktop></FooterDesktop>
    </>
  );
}
