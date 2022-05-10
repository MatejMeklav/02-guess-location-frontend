import React from 'react'
import LocationsList from './LocationsList'
import PbImagesList from './PbImagesList'

export default function HomeLoggedInMobile() {
  return (
    <div className='home-logged-in-mobile'>
      <div className='upper-container'>
        <h4>Personal best guesses</h4>
        <p>Your personal best guesses appear here. Go on and try to beat your personal records or set new!</p>
          <PbImagesList></PbImagesList>
      </div>
      <div className='lower-container'>
        <h4>New locations</h4>
        <p>New uploads from users. Try to guess all the locations by pressing on a picture.</p>
        <div className='location-images'>
          <LocationsList></LocationsList>
        </div>
      </div>
    </div>  
  )
}
