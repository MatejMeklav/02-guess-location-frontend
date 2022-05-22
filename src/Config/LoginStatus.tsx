import { useEffect, useState } from "react";
import jwt from 'jwt-decode';

export function LoginStatus() {

    const  [id, setId] = useState("undefined");
    
    useEffect(() => {

        if(id === "undefined"){


            var token = localStorage.getItem('key');
            console.log(token);
            if(token == null){
                setId("false");
            }else {
                const user:any = jwt(token);
                if (Date.now() >= user.exp * 1000) {
                    setId("false");
                }else {
                    setId(user.id);
                }
            }
        }
    }, [id]);

    console.log(id);
    return id;
}