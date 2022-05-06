import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';
import { url } from '../../Config/variables';
import { Link } from 'react-router-dom';
import ConfirmedModal from '../../Layouts/ProfileSettings/ConfirmedModal';

export default function ProfileSettingsPassword() {

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

    var { currentPassword, newPassword, confirmNewPassword } = document.forms[0];
    console.log(document.forms[0]);
    const headers = {
      'Authorization': 'Bearer '+ localStorage.getItem('key'),
    };
    axios
      .put(url + 'me/update-user-password', {

        oldPassword: currentPassword.value,
        password: newPassword.value,
        repeatedPassword: confirmNewPassword.value,
      },{headers})
      .then(response => {
        console.log(response);
        setSuccessfulResponse(true);
      })
      .catch(error => {
        console.log(error.request);

      });
    event.preventDefault();
  }
  
  return (
    <div className='profile-settings'>
      {successfulResponse ? <ConfirmedModal></ConfirmedModal>: ""}
      <div className='information'>
        <h4>Profile <span>settings.</span></h4>
        <p>Change your password.</p>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label><span>Curent password</span></label>
          <input className="settings-form-input" type="text" name="curentPassword" />
          <img src={require('../../Layouts/Images/visibleEye.png')} alt='eye' ></img>
        </div>
          <div className="input-container">
          <label><span>New password</span></label>
          <input className="settings-form-input" type="text" name="newPassword" />
          <img id='toggle' src={require('../../Layouts/Images/visibleEye.png')} alt='eye' ></img>
        </div>
        <div className="input-container">
          <label><span>Confirm new password</span></label>
          <input className="settings-form-input" type="text" name="confirmNewPassword" />

          <img id='toggle' src={require('../../Layouts/Images/visibleEye.png')} alt='eye' ></img>
        </div>
        <div id='submit-password' className='submit'>
          <button type='submit'>SUBMIT</button>
          <Link to={'/settings'}>Cancel</Link>
        </div>
        </form>
      </div>
    </div>
  )
}
