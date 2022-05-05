import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';
import { url } from '../../Config/variables';
import { Link } from 'react-router-dom';

export default function ProfileSettingsPassword() {

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
    var { email, firstName, lastName, password, confirmPassword } = document.forms[0];
    console.log(email.value);
    console.log(firstName.value);
    axios
      .post(url + 'signup', {

        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        password: password.value,
        repeatedPassword: confirmPassword.value,
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
        <p>Change your password.</p>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label><span>Curent password</span></label>
          <input className="settings-form-input" type="password" name="curentPassword" />
          <img src={require('../../Layouts/Images/visibleEye.png')} alt='eye' ></img>
        </div>
          <div className="input-container">
          <label><span>New password</span></label>
          <input className="settings-form-input" type="password" name="newPassword" />
          <img id='toggle' src={require('../../Layouts/Images/visibleEye.png')} alt='eye' ></img>
        </div>
        <div className="input-container">
          <label><span>Confirm new password</span></label>
          <input className="settings-form-input" type="password" name="confirmNewPassword" />
          <img src={require('../../Layouts/Images/visibleEye.png')} alt='eye' ></img>
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
