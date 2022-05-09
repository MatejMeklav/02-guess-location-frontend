import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../../Assets/Styles/location.css';
import Map from './Map';

export default function LocationAddLayout() {

  const [fileInput, setFileInput] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [showImage, setShowImage] = useState(false);

  useEffect(()=>{
    if(fileUploaded){
      // @ts-ignore: Object is possibly 'null'.
      let file = (document.getElementById("fileUpload") as HTMLInputElement).files[0];
      console.log(file);
      setFileInput(URL.createObjectURL(file))
      setShowImage(true);
      setFileUploaded(false);
      console.log("dddddddddd");
    }

  },[fileUploaded, showImage]);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    // @ts-ignore: Object is possibly 'null'.
    let file = (document.getElementById("fileUpload") as HTMLInputElement).files[0];
    console.log("gggggggggggggggg");
    
    event.preventDefault();
  };
  return (
    <div className='location-add'>
      <h4>Add a new <span>location.</span></h4>
      
      <div className="form">
        <form id='form-image'>
        <div className='image-show'>
          <div className="input-container">
            <label className="custom-file-upload">
              <input type="file" id='fileUpload' name='fileUpload'/>
            </label>
            {showImage ? <img src={fileInput} alt='uploaded file' ></img>: <img src={require('../Images/placeholder-image-add.png')} alt='uploaded file' ></img>}
          </div>
          <div className='handle-file-upload'>
            <button type='button' onClick={()=>{setFileUploaded(true)}} >UPLOAD IMAGE</button>
            <div onClick={()=>{setShowImage(false)}} className='x-icon-bg'>
             <span>X</span>
            </div>
          </div>
        </div>
        <div className='google maps'>
        <Map></Map>
        </div>
        <div className='submit'>
          <button type='submit' onClick={handleSubmit}>ADD NEW</button>
        </div>
      </form>
      </div>


      
    </div>
  )
}
