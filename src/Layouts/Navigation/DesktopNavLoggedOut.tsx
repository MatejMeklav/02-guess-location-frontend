import React from 'react'
import GeotaggerLogo from '../GeotaggerLogo'
import DesktopLinksLoggedOut from './Links/DesktopLinksLoggedOut'
import '../../Assets/Styles/SignInUp.css';

export default function DesktopNavLoggedOut() {
  return (
    <div className='desktop-nav-logged-out'>
    <GeotaggerLogo></GeotaggerLogo>
    <DesktopLinksLoggedOut></DesktopLinksLoggedOut>
    </div>
  )
}
