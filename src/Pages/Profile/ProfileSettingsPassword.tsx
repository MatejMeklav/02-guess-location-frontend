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
  const [responseError, setResponseError] = useState("");
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
    let oldPassword = (document.getElementById("curentPassword") as HTMLInputElement).value;
    let newPassword = (document.getElementById("newPassword") as HTMLInputElement).value;
    let confirmNewPassword = (document.getElementById("confirmNewPassword") as HTMLInputElement).value;
    console.log(document.forms[0]);
    const headers = {
      'Authorization': 'Bearer '+ localStorage.getItem('key'),
    };
    axios
      .put(url + 'me/update-user-password', {

        oldPassword: oldPassword,
        password: newPassword,
        repeatedPassword: confirmNewPassword,
      },{headers})
      .then(response => {
        console.log(response);
        setSuccessfulResponse(true);
      })
      .catch(error => {
        setResponseError("Invalid input!");

      });
    event.preventDefault();
  }
  
  return (
    <div className='profile-settings'>
      {successfulResponse ? <ConfirmedModal></ConfirmedModal>: ""}
      <div className='information'>
        <h4>Profile <span>settings.</span></h4>
        <p>Change your password.</p>
        {responseError ? <p>{responseError}</p>: ""}
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label><span>Curent password</span></label>
          <input className="settings-form-input" id="curentPassword" type="text" name="curentPassword" />
          {successfulResponse ? "": <img src={require('../../Layouts/Images/visibleEye.png')} alt='eye' ></img>}
          
        </div>
          <div className="input-container">
          <label><span>New password</span></label>
          <input className="settings-form-input" id="newPassword" type="text" name="newPassword" />
          {successfulResponse ? "": <img src={require('../../Layouts/Images/visibleEye.png')} alt='eye' ></img>}
        </div>
        <div className="input-container">
          <label><span>Confirm new password</span></label>
          <input className="settings-form-input" id="confirmNewPassword" type="text" name="confirmNewPassword" />
          {successfulResponse ? "": <img src={require('../../Layouts/Images/visibleEye.png')} alt='eye' ></img>}
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
