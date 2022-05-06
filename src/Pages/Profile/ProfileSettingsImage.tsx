import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';
import { url } from '../../Config/variables';
import { Link } from 'react-router-dom';

export default function ProfileSettingsImage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const key = localStorage.getItem('key');
    if (key) {
      const dateNow = new Date();
      const decoded: any = jwtDecode(key);
      if (decoded.exp * 1000 < dateNow.getTime()) {
        navigate('/404');
      }else {
        setUserId(decoded.id);
         
      }
    } else {
      navigate('/404');
    }
  }, [setUserId])

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    console.log("submited");
    var { image } = document.forms[0];
    console.log(document.forms[0]);
    axios
      .post(url + 'signup', {

        
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
      });
    event.preventDefault();
  }
  
  return (
    <div className='profile-settings'>
      <div className='information'>
        <h4>Profile <span>settings.</span></h4>
        <p>Change your profile photo.</p>
      </div>
      <div className='profile-photo'>
        <img id='toggle' src={require('../../Layouts/Images/ProfileLogo.png')} alt='profile logo' ></img>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
        <div className="input-container">
        <label className="custom-file-upload">
          UPLOAD NEW IMAGE
        <input type="file"/>
        <input className="settings-form-input" type="file" name="image" />
        </label>
        </div>
        <div className='submit'>
          <button type='submit'>SUBMIT</button>
          <Link to={'/settings'}>Cancel</Link>
        </div>
        </form>
      </div>
    </div>
  )
}
