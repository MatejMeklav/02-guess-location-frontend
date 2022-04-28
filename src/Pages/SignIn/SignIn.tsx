import React from 'react'
import FooterDesktop from '../../Layouts/Footer/FooterDesktop'
import FooterMobile from '../../Layouts/Footer/FooterMobile'
import DesktopNavSignForms from '../../Layouts/Navigation/DesktopNavSignForms'
import MobileNavLoggedOut from '../../Layouts/Navigation/MobileNavLoggedOut'
import SignInForm from '../../Layouts/SignIn/SignInForm'

export default function SignIn() {
  return (
    <>
    <DesktopNavSignForms></DesktopNavSignForms>
    <MobileNavLoggedOut></MobileNavLoggedOut>
    <SignInForm></SignInForm>
    <FooterDesktop></FooterDesktop>
    <FooterMobile></FooterMobile>
    </>
  )
}
