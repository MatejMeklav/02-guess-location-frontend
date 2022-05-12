import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../../Config/variables';

export default function PbImagesList() {

    const [pbList, setPbList] = useState<any[]>([]);
    const [rowCount, setRowCount] = useState<number>(1);

    useEffect(() =>{
            const headers = {
                'Authorization': 'Bearer '+ localStorage.getItem('key'),
              };
            axios.get(url +'guess/all',{headers}).then(response => {
                console.log({List: response.data});
                setPbList(response.data);
              })
              .catch(error => {
                console.log(error.response);
              });

        console.log(rowCount);
    },[rowCount])
    interface pbObject {
        id: string;
        image: string;
        latitude:number;
        longitude:number;
        meters:number;
      }
    var pbArray = new Array<pbObject>();
        

    
    for(var i = 0; i< pbList.length; i++){
        const obj:pbObject = {id: pbList[i].id,image: pbList[i].location.image, latitude: pbList[i].latitude, longitude: pbList[i].longtitude, meters: pbList[i].meters}
        pbArray.push(obj)
    }
    pbArray = pbArray.slice(0, (rowCount*3));


    const itemsList = pbArray.map((item) =>
    <div style={{
        backgroundImage: "linear-gradient(90deg, rgba(102, 159, 137, 0.6) 50%, rgba(159, 193, 129, 0.6) 128%),url(" + item.image + ")", 
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }} className='pb-item' key={item.id}><p className='meters-paragraph'>{item.meters} m</p></div>
)

    return (
        <>
            <div className='pb-list'>{itemsList}</div>
            <div className='load-more-div' >
                <button type='button' onClick={() => setRowCount(rowCount + 1)}>LOAD MORE</button>
            </div>
        </>
    )  
}
