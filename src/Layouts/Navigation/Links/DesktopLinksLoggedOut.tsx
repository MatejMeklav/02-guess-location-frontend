import ButtonSignin from "../ButtonSignin";
import ButtonSignUp from "../ButtonSignUp";

export default function DesktopLinksLoggedOut() {
  return (
    <>
      <ul className="desktop-links-logged-out">
        <li className="button-white">
          <ButtonSignin></ButtonSignin>
        </li>
        <li id="or-li">or</li>
        <li className="button">
          <ButtonSignUp></ButtonSignUp>
        </li>
      </ul>
    </>
  );
}
