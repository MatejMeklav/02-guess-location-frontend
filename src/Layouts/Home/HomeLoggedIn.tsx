import React from 'react'
import PbImagesList from './PbImagesList'

export default function HomeLoggedIn() {
  return (
    <div className='home-logged-in'>
      <div className='upper-container'>
        <h4>Personal best guesses</h4>
        <p>Your personal best guesses appear here. Go on and try to beat your personal records or set new!</p>
        <div className='images-container'>
            <PbImagesList></PbImagesList>
            <button type='button'>Load more</button>
        </div>
      </div>
      <div className='lower-container'>
        <h4>New locations</h4>
        <p>New uploads from users. Try to guess all the locations by pressing on a picture.</p>
      </div>
      <div className='location-images'></div>

    </div>
  )
}
