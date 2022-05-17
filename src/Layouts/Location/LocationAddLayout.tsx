import { useEffect, useState } from 'react'
import '../../Assets/Styles/location.css';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import marker from '../Images/location_no_bg.png'
import axios from 'axios';
import { url } from '../../Config/variables';
import { useWindowSize } from './useWindowSize';

export default function LocationAddLayout() {

  const [fileInput, setFileInput] = useState('');
  const [fileToUpload, setFileToUpload] = useState();
  const [fileUploaded, setFileUploaded] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [ position, setPosition ] = useState({ latitude: 0, longitude: 0 })
  const [city, setCity] = useState('')
  const [town, setTown] = useState('')
  const [village, setVillage] = useState('')
  const [country, setCountry] = useState('');
  const [postNumber, setPostNumber] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [secureUrl, setSecureUrl] = useState('');
  const [locationCreated, setLocationCreated] = useState(false);
  const [width, height] = useWindowSize();

  const headers = {
    'Authorization': 'Bearer '+ localStorage.getItem('key'),
  };

  const LocationMarker =(() => { 
     const map = useMapEvents({
       click(e) {
        const { lat, lng } = e.latlng;
        setPosition({
           latitude: lat,
           longitude: lng,
         })
         axios.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat='+lat+'&lon='+lng).then(response => {
          if(response.data.address.village !== undefined){
            setVillage(response.data.address.village);
          }else {
            setVillage('');
          }
          if(response.data.address.town !== undefined){
            setTown(response.data.address.town);
          }else {
              setTown('');
          }
          if(response.data.address.city !== undefined){
            setCity(response.data.address.city);
          }else {
            setCity('');
          }
          if(response.data.address.municipality !== undefined){
            setMunicipality(response.data.address.municipality);
          }else {
            setMunicipality('');
          }
          if(response.data.address.postcode !== undefined){
            setPostNumber(response.data.address.postcode);
          }else {
            setPostNumber('');
          }
          setCountry(response.data.address.country)
          
        })
        .catch(error => {
          console.log(error.response);
        });   
        map.flyTo(e.latlng, map.getZoom())
       },
       
     })
   
     return (
         position.latitude !== 0 ? 
         <Marker 
           position={[position.latitude, position.longitude]}
           interactive={false} 
           icon={myIcon} 
           />
   
          : null
     )   
     
   });

  useEffect(()=>{
    if(fileUploaded){
      // @ts-ignore: Object is possibly 'null'.
      let file = (document.getElementById("fileUpload") as HTMLInputElement).files[0];
       // @ts-ignore: Object is possibly 'null'.
      setFileToUpload(file);
      setFileInput(URL.createObjectURL(file))
      setShowImage(true);
      setFileUploaded(false);
    }
    if(secureUrl) {
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

      const {latitude, longitude} = position;

      axios.post(url+"location/create",
      {
        image: imageUrl,
        latitude: latitude,
        longtitude: longitude,
        address: fullAddress,
      },
    {headers}).then(res => {
          console.log(res);
          setLocationCreated(true);
          setSecureUrl("");
      })
      .catch(err => {
         console.log(err.response) 
      });
      setSecureUrl("");
    }
    setFullAddress(municipality+" "+city+" "+town+" "+village+" "+postNumber+" "+country);
    console.log("lioggg");
    console.log(width);
    console.log(showImage);

  },[fileUploaded, showImage, country, postNumber, village, town, city, municipality, secureUrl, width]);
  
  const myIcon = new Icon({
    iconUrl: marker,
    iconSize: [32,32]
   })

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    // @ts-ignore: Object is possibly 'null'.
    let file = (document.getElementById("fileUpload") as HTMLInputElement).files[0];
    if(file === undefined || fullAddress === ''){
      console.log("nepopolni podatki")
    }else{
      axios
      .get(url + 'secure-url',{headers})
      .then(response => {
        setSecureUrl(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });
    } 
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
            {showImage ? <img src={fileInput} alt='uploaded file' ></img>:""}
            {!showImage && width <=500 ? <img src={require('../Images/placeholder-image-mobile.png')} alt='uploaded file' ></img>:""}
            {!showImage && width >500  ? <img src={require('../Images/placeholder-image-add.png')} alt='uploaded file' ></img>:""}
          </div>
          <div className='handle-file-upload'>
            <button type='button' onClick={()=>{setFileUploaded(true)}} >UPLOAD IMAGE</button>
            <div onClick={()=>{setShowImage(false)}} className='x-icon-bg'>
            <img className='x-icon' src={require('../Images/react-icon-x.png')} alt='x-icon'></img>
            </div>
          </div>
        </div>
        <div className='leaflet-map'>
          <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
          </MapContainer>
        </div>
       
        <div className='submit'>
          <label>Location</label>
          {locationCreated ? <p id='loc-created'>Location was created sucessfully</p>: "" }
          <p id='address-value'>{fullAddress}</p>
          <button type='submit' onClick={handleSubmit}>ADD NEW</button>
        </div>
      </form>
      </div>
    </div>
  )
}
