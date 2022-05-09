import GoogleMapReact from 'google-map-react'

  
export default function Map({center = {lat: 40.73, lng: -73.93}, zoom = 12}) {
    return (
        <>
        <GoogleMapReact
            bootstrapURLKeys={{
                key: '""""', 
                language: 'en'
            }} 
            defaultCenter={center}
            center={center}
            defaultZoom={zoom}
        />
        </>
        
    )
}
  