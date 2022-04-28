import React from 'react'
import FooterDesktop from '../../Layouts/Footer/FooterDesktop'
import FooterMobile from '../../Layouts/Footer/FooterMobile'
import DesktopNavSignForms from '../../Layouts/Navigation/DesktopNavSignForms'
import MobileLinksLoggedOut from '../../Layouts/Navigation/Links/MobileLinksLoggedOut'
import MobileNavLoggedOut from '../../Layouts/Navigation/MobileNavLoggedOut'
import SignUpForm from '../../Layouts/SignUp/SignUpForm'

export default function SignUp() {
  return (
    <>
    <DesktopNavSignForms></DesktopNavSignForms>
    <MobileLinksLoggedOut></MobileLinksLoggedOut>
    <SignUpForm></SignUpForm>
    <FooterDesktop></FooterDesktop>
    <FooterMobile></FooterMobile>
    </>
  )
}
