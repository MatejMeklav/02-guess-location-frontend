import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';
import { url } from '../../Config/variables';
import { Link } from 'react-router-dom';

export default function ProfileSettingsImage() {
  const navigate = useNavigate();
  const [secureUrl, setSecureUrl] = useState("");
  const [imgUrl, setImgUrl] = useState('');
  const [fileToUpload, setFileToUpload] = useState();
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

    const headers = {
      'Authorization': 'Bearer '+ localStorage.getItem('key'),
    };

    axios
      .get(url + 'users/user',{headers})
      .then(response => {
        setImgUrl(response.data.image);
      })
      .catch(error => {
      });

    if(secureUrl !== ""){
      console.log("working");
      console.log(secureUrl);
      console.log(JSON.stringify(fileToUpload));
      axios({
        method: "PUT",
        url: secureUrl,
        data: fileToUpload,  // NOTE - this is the file not the FormData Object
        headers: { 
            "Content-Type": "image/png" }
        }).then(res => {
          console.log(res);
       })
      .catch(err => {
         console.log(err) 
      });
      const imageUrl = secureUrl.split('?')[0];
      axios({
        method: "PUT",
        url: url+"me/update-user-profile-image",
        data: {image: imageUrl},  // NOTE - this is the file not the FormData Object
        headers: headers}).then(res => {
          console.log(res);
       })
      .catch(err => {
         console.log(err) 
      });
      setImgUrl(imageUrl);
      setSecureUrl("");
    }
  }, [secureUrl, navigate, fileToUpload])

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    
    
    // @ts-ignore: Object is possibly 'null'.
    let fileToUpload = (document.getElementById("fileUpload") as HTMLInputElement).files[0];
    // @ts-ignore: Object is possibly 'null'.
    setFileToUpload(fileToUpload);
    const headers = {
      'Authorization': 'Bearer '+ localStorage.getItem('key'),
    };
    axios
      .get(url + 'secure-url',{headers})
      .then(response => {
        setSecureUrl(response.data);
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
        <form id='form-image' onSubmit={handleSubmit}>
        <div className="input-container">
        <label className="custom-file-upload">
          UPLOAD NEW IMAGE
        <input type="file" id='fileUpload'/>
        <input 
          className="settings-form-input" 
          type="file" 
          name="image"
          id='fileUpload2'
         />
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
