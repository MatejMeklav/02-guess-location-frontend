import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../../Config/variables';
import {FaPenSquare} from 'react-icons/fa';
import {MdEditLocationAlt, MdOutlineCancelPresentation} from 'react-icons/md';
import { Navigate, useNavigate } from 'react-router';
import DeleteLocation from '../Location/DeleteLocation';

export default function UsersUploads() {
    const [myUploadsList, setMyUploadsList] = useState<any[]>([]);
    const [rowCount, setRowCount] = useState<number>(1);
    const navigation = useNavigate();
    const[deleteLocationClicked, setDeleteLocationClicked] = useState(false);
    const[deleteLocationId, setDeleteLocationId] = useState('');
    useEffect(() =>{
            const headers = {
                'Authorization': 'Bearer '+ localStorage.getItem('key'),
              };
            axios.get(url +'location/all-user-locations',{headers}).then(response => {
                console.log({List: response.data});
                setMyUploadsList(response.data);
              })
              .catch(error => {
                console.log(error.response);
              });

        console.log(deleteLocationClicked);
    },[rowCount, deleteLocationClicked, deleteLocationId]);

    const editLocation = async (locationId : any) => {
        navigation('/edit/'+locationId);
    }

    const deleteLocation = async (locationId : any) => {
        setDeleteLocationId(locationId);
        setDeleteLocationClicked(true);
    }
    interface pbObject {
        id: string;
        image: string;
      }
    var myUploadsArray = new Array<pbObject>();

        

    
    for(var i = 0; i< myUploadsList.length; i++){
        const obj:pbObject = {id: myUploadsList[i].id,image: myUploadsList[i].image}
        myUploadsArray.push(obj)
    }
    myUploadsArray = myUploadsArray.slice(0, (rowCount*4));


    const itemsList = myUploadsArray.map((item) =>
    <div className='upload-item' key={item.id}>
        <img src={item.image} alt='location' ></img>
        <img className='pen-icon' onClick={() => editLocation(item.id)} src={require('../Images/react-icon-pen.png')} alt='pen-icon'></img>
        <img className='x-icon' onClick={() => deleteLocation(item.id)} src={require('../Images/react-icon-x.png')} alt='x-icon'></img>
        
    </div>
)


    return (
        <>
            <div className='my-uploads-list'>
                {itemsList}
                {deleteLocationClicked ? <DeleteLocation id={deleteLocationId}></DeleteLocation> : ""}
            </div>
            <div className='load-more-div' >
                <button type='button' onClick={() => setRowCount(rowCount + 1)}>LOAD MORE</button>
            </div>
        </>
    ) 
}
