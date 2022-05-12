import React, { useEffect } from 'react'
import { useParams } from 'react-router'

export default function EditLocation() {
    
    const { id } = useParams();

    useEffect(() => {
                console.log(id);
    },[])
  return (
    <div>EditLocation</div>
  )
}
