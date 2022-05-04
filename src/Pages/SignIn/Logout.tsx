import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

export default function Logout() {
    const navigate = useNavigate();
    useEffect(() =>{
        localStorage.removeItem('key');
        navigate('/');
    },[])
  return (
    <div>Logout</div>
  )
}
