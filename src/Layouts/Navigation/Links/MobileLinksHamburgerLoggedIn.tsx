import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowOpen from '../../ArrowOpen'
import { url } from '../../../Config/variables';
import axios from 'axios';
import ArrowOpenGreen from '../../ArrowOpenGreen';

export default function MobileLinksHamburgerLoggedIn() {

  const[firstName, setFristName] = useState("");
  const[lastName, setLastName] = useState("");

  useEffect(()=>{
    const headers = {
      'Authorization': 'Bearer '+ localStorage.getItem('key'),
    };
    console.log(headers);
    axios.get(url + 'users/user',{headers}).then((response) => {
      setFristName(response.data.firstName);
      setLastName(response.data.lastName);
    });

  },[firstName, lastName]);
  return (
    <div className="links-inside">
      <div className='link-item'>
      <img src={require('../../Images/ProfileLogo.png')} alt='google maps'></img>
      <p>{firstName} {lastName}</p>
      </div>
    <div className='link-item-arrow-logged'>
      <h5>Home</h5>
      <Link to={'/'}>
      <ArrowOpen></ArrowOpen>
      </Link>
    </div>
    <div className='link-item-arrow-logged'>
      <h5>Profile settings</h5>
      <Link to={'/settings'}>
      <ArrowOpen></ArrowOpen>
      </Link>
    </div>
    <div className='link-item-arrow-logged'>
      <h5 id='green-color'>Logout</h5>
      <Link to={'/logout'}>
      <ArrowOpenGreen></ArrowOpenGreen>
      </Link>
    </div>
    </div>
  )
}
