import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { url } from '../../Config/variables';

export default function DeleteLocation(id: any) {

    const [locationId, setLocationId] = useState(id.id);
    const [deleteLocationSubmited, setDeleteLocationSubmited] = useState(false);
    useEffect(()=>{
        console.log(locationId);
        
    },[deleteLocationSubmited]);

    const deleteLoc = async () => {
      setDeleteLocationSubmited(true);
        // console.log("dddddddd");
        // const headers = {
        //     'Authorization': 'Bearer '+ localStorage.getItem('key'),
        //   };
        // axios.delete(url +'location/delete-location',{data:{locationId}, headers}).then(response => {
        //         console.log(response);
        //   })
        //   .catch(error => {
        //     console.log(error.response);
        //   });
        //   window.location.reload();
    }

    const cancel = async () => {
        window.location.reload();
    }

    const submited = <div className='delete-location-submit'>
                        <p>Your location was deleted.</p>
                        <button className='submit-btn' onClick={()=> cancel()} type='button'>CLOSE</button>
                     </div>
    const notSubmited = <div className='delete-location-div'>
                          <h4>Are you sure?</h4>
                          <p>
                            This location will be deleted.
                            There is no undo of this action.
                          </p>
                          <div className='submit'>
                            <button className='submit-btn' onClick={() => deleteLoc()} type='button'>SUBMIT</button>
                            <button className='cancel-btn' onClick={() => cancel()} type='button'>Cancel</button>
                          </div>
                        </div>
  return (
      <>
        {deleteLocationSubmited ? submited : notSubmited }
      </>
  )
}
