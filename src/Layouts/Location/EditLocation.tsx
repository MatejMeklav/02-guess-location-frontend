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
    const[fileUploaded, setFileUploaded] = useState(false);
    const[fileInput, setFileInput] = useState('');
    const [fileToUpload, setFileToUpload] = useState();
    const [submited, setSubmited] = useState(false);
    const [secureUrl, setSecureUrl] = useState('');

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

          if(submited) {
          axios
            .get(url + 'secure-url',{headers})
            .then(response => {
              setSecureUrl(response.data);
            })
            .catch(error => {
              console.log(error.response);
            });
            setSubmited(false);
          }

          if(secureUrl !== '') {

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

            axios
            .put(url + 'location/update-image', {
              id: id,
              image: imageUrl,
            }, {headers})
            .then(response => {
              console.log('uploaded image')
              console.log(response.data)
            })
            .catch(error => {
              console.log(error.response);
            });
            setSecureUrl('');
          }

    },[fileToUpload, submited,secureUrl])

    const uploadImage = (() => {
      // @ts-ignore: Object is possibly 'null'.
      let file = (document.getElementById("fileUpload") as HTMLInputElement).files[0];
      if(file !== undefined ){
        setFileInput(URL.createObjectURL(file));
        // @ts-ignore: Object is possibly 'null'.
        setFileToUpload(file);
        setFileUploaded(true);
      }
    });
  return (
      <>
      <div className='edit-location-container'>
          <h4>Edit <span>location.</span></h4>
          <div className='image-show'>
            <div className="input-container">
              <label className="custom-file-upload">
                <input type="file" id='fileUpload' name='fileUpload'/>
              </label>
              {fileUploaded ? <img src={fileInput} alt="location"></img>: <img src={image} alt="location"></img>}
            </div>
          </div>
          <p>Location: {address}</p>
          <div className='submit-container'>
              <button onClick={() => uploadImage()} className='upload-btn' type='button'>UPLOAD IMAGE</button>
              <div className='save-cancel-container'>
                  <button className='save-btn' onClick={()=> setSubmited(true)} type='button'>SAVE</button>
                  <button className='cancel-btn' onClick={() =>{navigate('/profile')}} type='button'>Cancel</button>
              </div>
          </div>
      </div>
    </>
  )
}
