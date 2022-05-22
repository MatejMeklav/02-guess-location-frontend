import GoogleMapsBg from "../../Layouts/GoogleMapsBg";
import DesktopNavSignForms from "../../Layouts/Navigation/DesktopNavSignForms";
import MobileNavLoggedOut from "../../Layouts/Navigation/MobileNavLoggedOut";
import SignUpForm from "../../Layouts/SignUp/SignUpForm";

export default function SignUp() {
  return (
    <div className="sign-in-up-page">
      <div className="left-container">
        <DesktopNavSignForms></DesktopNavSignForms>
        <MobileNavLoggedOut></MobileNavLoggedOut>
        <SignUpForm></SignUpForm>
      </div>
      <GoogleMapsBg></GoogleMapsBg>
    </div>
  );
}
