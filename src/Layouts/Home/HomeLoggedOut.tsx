import React from 'react'
import { Link } from 'react-router-dom'
import ButtonGreen from '../ButtonGreen'

export default function HomeLoggedOut() {
  return (
    <div className='home-logged-out'>
      <div className='upper-container'>
        <div className='upper-container-text'>
        <h2>Explore the world with Geotagger!</h2>
          <p>Geotagger is webiste that allowes you to post picture and
            tag it on the map. Other user than try to locate it via Google Maps.
          </p>
          <Link to={'/signup'}>
            <ButtonGreen page={false}></ButtonGreen>
          </Link>
          <div className='background-image'>
          </div>
        </div>
      </div>
      <div className='lower-container'>
        <div className='top'>
          <h4>Try yourself at Geotagger!</h4>
          <p>
            Try to guess the location of image by selecting position
            on the map. When you guess it, it gives you the error distance.
          </p>
        </div>
        <div className='images'>
          <div className='images-item' id='image-one'></div>
          <div className='images-item' id='image-two'></div>
          <div className='images-item' id='image-three'></div>

        </div>
        <div className='sign-up-btn'>
          <Link to={'/signup'}>
            <ButtonGreen page={false}></ButtonGreen>
          </Link>
            
        </div>

      </div>
    </div>
  )
}
