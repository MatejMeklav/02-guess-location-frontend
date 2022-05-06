import React from 'react'
import { Link } from 'react-router-dom'

export default function ConfirmedModal() {
  return (
    <div className='profile-settings'>
        <div className='information'>
            <h4>Information changed.</h4>
            <p>Your settings are saved.</p>
        </div>
        <Link to={'/settings'} onClick={() => window.location.reload()}>CLOSE</Link>
    </div>
  )
}
