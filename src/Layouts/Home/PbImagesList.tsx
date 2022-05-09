import axios from 'axios';
import { getUnpackedSettings } from 'http2';
import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react'
import { url } from '../../Config/variables';

export default function PbImagesList() {

    const [pbList, setPbList] = useState<any[]>([]);

    useEffect(() =>{
        if(pbList.length === 0){
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
        }
    },[pbList])
    interface pbObject {
        image: string;
        latitude:number;
        longitude:number;
        meters:number;
      }
    const pbArray = new Array<pbObject>()
        

    
    for(var i = 0; i< pbList.length; i++){
        const obj:pbObject = {image: pbList[i].location.image, latitude: pbList[i].latitude, longitude: pbList[i].longtitude, meters: pbList[i].meters}
        pbArray.push(obj)
    }

    console.log(pbArray);




    return (
        <div>sdsds</div>
    )

           
          
    
    

    

    
}

