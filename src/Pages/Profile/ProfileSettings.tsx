import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { url } from '../../Config/variables';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import '../../Assets/Styles/ProfileSettings.css';
import ConfirmedModal from '../../Layouts/ProfileSettings/ConfirmedModal';

export default function ProfileSettings() {

  const navigate = useNavigate();
  const [successfulResponse, setSuccessfulResponse] = useState(false);
  useEffect(() => {
    const key = localStorage.getItem('key');
    if (key) {
      const dateNow = new Date();
      const decoded: any = jwtDecode(key);
      if (decoded.exp * 1000 < dateNow.getTime()) {
        navigate('/404');
      }
    } else {
      navigate('/404');
    }
  }, [successfulResponse])

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    console.log("submited");
    var { email, firstName, lastName} = document.forms[0];

    const headers = {
      'Authorization': 'Bearer '+ localStorage.getItem('key'),
    };
    axios
      .put(url + 'me/update-user-info', {

        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
      },{headers})
      .then(response => {
        console.log(response);
        setSuccessfulResponse(true);
      })
      .catch(error => {
      });
    event.preventDefault();
  }
  return (
    <div className='profile-settings'>
      {successfulResponse ? <ConfirmedModal></ConfirmedModal>: ""}
      <div className='information'>
        <h4>Profile <span>settings.</span></h4>
        <p>Change your information.</p>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label><span>Email</span></label>
            <input className="settings-form-input" type="text" name="email" />
          </div>
          <div className='input-container-name'>
            <div className="input-container">
              <label><span>First Name</span></label>
              <input className="settings-form-input" type="text" name="firstName" />
            </div>
            <div className="input-container">
              <label><span>Last Name</span></label>
              <input className="settings-form-input" type="text" name="lastName" />
            </div>
          </div>
          <div className='links'>
              <Link id='settings-pass-btn' to={'/settings-password'}>Change password</Link>
              <Link id='settings-pic-btn' to={'/settings-profile-picture'}>Change profile picture</Link>
          </div>
          <div className='submit'>
              <button type='submit'>SUBMIT</button>
              <Link to={'/'}>Cancel</Link>
          </div>
        </form>

      </div>

    </div>
  )
}
