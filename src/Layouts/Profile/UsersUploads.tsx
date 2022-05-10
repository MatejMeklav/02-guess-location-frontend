import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../../Config/variables';
import {FaPenSquare} from 'react-icons/fa';
import {MdOutlineCancelPresentation} from 'react-icons/md';

export default function UsersUploads() {
    const [myUploadsList, setMyUploadsList] = useState<any[]>([]);
    const [rowCount, setRowCount] = useState<number>(1);

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

        console.log(rowCount);
    },[rowCount])
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

    console.log(myUploadsArray);

    const itemsList = myUploadsArray.map((item) =>
    <div style={{
        backgroundImage: "url(" + item.image + ")", 
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }} className='upload-item' key={item.id}>
        <div className='pen-background' style={{ background: "#ffff" }}>
            <FaPenSquare size={40} color={'green'}></FaPenSquare>
        </div>
        <div className='x-background' style={{ background: "#9B6161" }}>
            <MdOutlineCancelPresentation className='icon' size={40} color={'white'}></MdOutlineCancelPresentation>
        </div>
    </div>
)


    return (
        <>
            <div className='my-uploads-list'>{itemsList}</div>
            <div className='load-more-div' >
                <button type='button' onClick={() => setRowCount(rowCount + 1)}>LOAD MORE</button>
            </div>
        </>
    ) 
}
