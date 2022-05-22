import GeotaggerLogo from "../GeotaggerLogo";
import DesktopLinksLoggedOut from "./Links/DesktopLinksLoggedOut";

export default function DesktopNavLoggedOut() {
  return (
    <div className="desktop-nav-logged-out">
      <GeotaggerLogo></GeotaggerLogo>
      <DesktopLinksLoggedOut></DesktopLinksLoggedOut>
    </div>
  );
}
