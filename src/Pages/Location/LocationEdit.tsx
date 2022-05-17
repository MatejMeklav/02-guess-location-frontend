import React from 'react'
import FooterDesktop from '../../Layouts/Footer/FooterDesktop'
import FooterMobile from '../../Layouts/Footer/FooterMobile'
import EditLocation from '../../Layouts/Location/EditLocation'
import DesktopNavLoggedIn from '../../Layouts/Navigation/DesktopNavLoggedIn'
import MobileNavLoggedIn from '../../Layouts/Navigation/MobileNavLoggedIn'

export default function LocationEdit() {
  return (
    <>
      <MobileNavLoggedIn></MobileNavLoggedIn>
      <DesktopNavLoggedIn></DesktopNavLoggedIn>
      <EditLocation></EditLocation>
      <FooterDesktop></FooterDesktop>
      <FooterMobile></FooterMobile>
    </>
  )
}
