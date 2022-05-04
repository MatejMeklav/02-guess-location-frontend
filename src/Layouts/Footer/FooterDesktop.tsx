import React from 'react'
import '../../Assets/Styles/footer.css';

export default function FooterDesktop() {
  return (
    <div className='footer-desktop'>
        <img src={require('../../Layouts/Images/logo_footer_desktop.png')} alt='google maps'></img>
        <p>All Rights Reserved | skillupmentor.com</p>
    </div>
  )
}
