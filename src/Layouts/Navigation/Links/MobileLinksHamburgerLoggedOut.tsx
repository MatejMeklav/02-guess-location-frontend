import React, { useState } from 'react';
import ArrowOpen from '../../ArrowOpen';
import ButtonGreen from '../../ButtonGreen';

import '../../../Assets/Styles/SignInUp.css'


export default function MobileLinksHamburgerLoggedOut() {

  return (
    <div className="links-inside">
    <div className='link-item-arrow'>
      <h5>Home</h5>
      <ArrowOpen></ArrowOpen>
    </div>
    <ButtonGreen page={true}></ButtonGreen>
    <div id='sign-in-btn'>
      <ButtonGreen page={false}></ButtonGreen>
    </div>
    </div>
  )
}
