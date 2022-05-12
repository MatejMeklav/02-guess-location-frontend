import React from 'react'
import { useNavigate } from 'react-router';

export default function DeleteLocation(props: any) {

    const navigate = useNavigate();

    const deleteLocation = async () => {
        console.log(props.id);
    }


  return (
    <div>
        <h4>Are you sure?</h4>
        <p>
            This location will be deleted.
            There is no undo of this action.
        </p>
        <div className='submit'>
            <button onClick={() => deleteLocation} type='button'>SUBMIT</button>
            <button onClick={() => {window.location.reload()}} type='button'>Cancel</button>
        </div>
    </div>
  )
}
