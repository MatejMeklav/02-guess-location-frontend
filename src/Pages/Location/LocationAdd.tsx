import React from 'react'
import FooterDesktop from '../../Layouts/Footer/FooterDesktop'
import LocationAddLayout from '../../Layouts/Location/LocationAddLayout'
import DesktopNavLoggedIn from '../../Layouts/Navigation/DesktopNavLoggedIn'
import MobileNavLoggedIn from '../../Layouts/Navigation/MobileNavLoggedIn'

export default function LocationAdd() {
  return (
    <>
    <DesktopNavLoggedIn></DesktopNavLoggedIn>
    <MobileNavLoggedIn></MobileNavLoggedIn>
    <LocationAddLayout></LocationAddLayout>
    <FooterDesktop></FooterDesktop>
  </>
  )
}
