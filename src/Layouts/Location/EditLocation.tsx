import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { url } from '../../Config/variables';
import FooterDesktop from '../Footer/FooterDesktop';
import FooterMobile from '../Footer/FooterMobile';
import DesktopNavLoggedIn from '../Navigation/DesktopNavLoggedIn';
import MobileNavLoggedIn from '../Navigation/MobileNavLoggedIn';

export default function EditLocation() {
    
    const { id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        const headers = {
            'Authorization': 'Bearer '+ localStorage.getItem('key'),
          };
        axios.get(url +'location/location-id/'+id,{headers}).then(response => {
            console.log(response.data);
            setImage(response.data.image);
            setAddress(response.data.address);
          })
          .catch(error => {
            console.log(error.response);
          });
    },[])
  return (
      <>
      <MobileNavLoggedIn></MobileNavLoggedIn>
      <DesktopNavLoggedIn></DesktopNavLoggedIn>
      <div className='edit-location-container'>
          <h4>Edit <span>location.</span></h4>
          <img src={image} alt="location"></img>
          <p>Location: {address}</p>
          <div className='submit-container'>
              <button className='upload-btn' type='button'>UPLOAD IMAGE</button>
              <div className='save-cancel-container'>
                  <button className='save-btn' type='button'>SAVE</button>
                  <button className='cancel-btn' onClick={() =>{navigate('/profile')}} type='button'>Cancel</button>
              </div>
          </div>
      </div>
      <FooterDesktop></FooterDesktop>
      <FooterMobile></FooterMobile></>
  )
}
