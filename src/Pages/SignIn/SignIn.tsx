import DesktopNavSignForms from "../../Layouts/Navigation/DesktopNavSignForms";
import MobileNavLoggedOut from "../../Layouts/Navigation/MobileNavLoggedOut";
import SignInForm from "../../Layouts/SignIn/SignInForm";
import "../../Assets/Styles/SignInUp.css";
import GoogleMapsBg from "../../Layouts/GoogleMapsBg";

export default function SignIn() {
  return (
    <div className="sign-in-up-page">
      <div className="left-container">
        <DesktopNavSignForms></DesktopNavSignForms>
        <MobileNavLoggedOut></MobileNavLoggedOut>
        <SignInForm></SignInForm>
      </div>

      <GoogleMapsBg></GoogleMapsBg>
    </div>
  );
}
