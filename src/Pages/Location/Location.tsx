import FooterDesktop from "../../Layouts/Footer/FooterDesktop";
import FooterMobile from "../../Layouts/Footer/FooterMobile";
import LocationGuessLayout from "../../Layouts/Location/LocationGuessLayout";
import DesktopNavLoggedIn from "../../Layouts/Navigation/DesktopNavLoggedIn";
import MobileNavLoggedIn from "../../Layouts/Navigation/MobileNavLoggedIn";

export default function Location() {
  return (
    <>
      <DesktopNavLoggedIn></DesktopNavLoggedIn>
      <MobileNavLoggedIn></MobileNavLoggedIn>
      <LocationGuessLayout></LocationGuessLayout>
      <FooterDesktop></FooterDesktop>
      <FooterMobile></FooterMobile>
    </>
  );
}
