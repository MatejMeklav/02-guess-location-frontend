import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../../Config/variables';

export default function LocationsList() {
    const [locationsList, setLocationsList] = useState<any[]>([]);
    const [rowCount, setRowCount] = useState<number>(1);

    useEffect(() =>{
            const headers = {
                'Authorization': 'Bearer '+ localStorage.getItem('key'),
              };
            axios.get(url +'location/all-locations',{headers}).then(response => {
                console.log({List: response.data});
                setLocationsList(response.data);
              })
              .catch(error => {
                console.log(error.response);
              });

        console.log(rowCount);
    },[rowCount])
    interface LocationObject {
        id: string;
        image: string;
      }
    var locationsArray = new Array<LocationObject>();
        

    
    for(var i = 0; i< locationsList.length; i++){
        const obj:LocationObject = {id: locationsList[i].id,image: locationsList[i].image}
        locationsArray.push(obj)
    }
    locationsArray = locationsArray.slice(0, (rowCount*3));


    const itemsList = locationsArray.map((item) =>
    <div style={{ backgroundImage: "url(" + item.image + ")" }} className='location-item' key={item.id}></div>
)


    return (
        <>
            <div className='location-list'>{itemsList}</div>
            <div className='load-more-div' >
                <button type='button' onClick={() => setRowCount(rowCount + 1)}>LOAD MORE</button>
            </div>
        </>
    )  
}
