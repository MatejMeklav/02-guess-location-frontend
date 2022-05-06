import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { url } from '../../Config/variables';

type Props = {}

export default function EmailConfirmed({}: Props) {
    const {token} = useParams();
    const navigate = useNavigate();
    const[responseMsg, setResponseMsg] = useState("ConfirmingEmail");

    useEffect(() => {
        console.log("hereee");
        axios
      .post(url + 'email-confirmation/confirm/'+token,)
      .then(response => { 
        console.log(response);
        navigate('/signin');
      })
      .catch(error => {
          setResponseMsg("Email already confirmed");
      });
        
    },[responseMsg]);
  return (
    <div>{responseMsg}</div>
  )
}