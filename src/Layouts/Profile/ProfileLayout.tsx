import React, { useEffect, useState } from 'react'
import PbImagesList from '../Home/PbImagesList'
import UsersUploads from './UsersUploads'
import '../../Assets/Styles/Profile.css'
import { url } from '../../Config/variables'
import axios from 'axios'

export default function ProfileLayout() {

    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[imageUrl, setImageUrl] = useState('');

    useEffect(() => {

        const headers = {
            'Authorization': 'Bearer '+ localStorage.getItem('key'),
          };
        axios.get(url +'users/user',{headers}).then(response => {
            console.log(response.data);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setImageUrl(response.data.image);
          })
          .catch(error => {
            console.log(error.response);
          });

    },[])
  return (
        <div className='profile-page'>
            <div className='profile-data' >
                {imageUrl ? <img src={imageUrl} alt='profile'></img> : <img src={require('../Images/ProfileLogo.png')} alt='profile'></img> }
                <h4>{firstName} {lastName}</h4>
            </div>

            <div className='best-guess'>
                <h5>My best guesses</h5>
                <PbImagesList></PbImagesList>
            </div>
            <div className='my-uploads'>
                <h5>My uploads</h5> 
                <UsersUploads></UsersUploads> 
            </div>
        </div>
    )
}
