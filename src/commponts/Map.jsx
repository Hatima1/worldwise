import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvent,
      } from "react-leaflet";
import { useEffect, useState } from 'react';
import { UseCities } from '../Context/CitesContext';
import { useGeolocation } from '../../hooks/useGeolocation';
import Button from './Button';
function Map() {
    
    const[mapPosition,setmapPosition]=useState([12,20])
    
    const {cities}=UseCities()
    const[searchParams]=useSearchParams()
    const{position:geoposition,isLoding:geoisLoding,getPosition}=useGeolocation()
    const maplng=searchParams.get("lng")
    const maplat=searchParams.get("lat")
    useEffect(function(){

        if(maplng&&maplat)setmapPosition([maplat,maplng])

    },[maplng,maplat])
    
    useEffect(function(){

        if(geoposition)setmapPosition([geoposition.lat,geoposition.lng])

    },[geoposition])
    

    return (
        <div className={styles.mapContainer} >
            <Button type="position" onClick={getPosition}>{geoisLoding?"loding...":"use your location"} </Button>
               
                  <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true}  className={styles.map}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
              />
            {
                cities.map(City=>(
            <Marker position={[City.position.lat,City.position.lng]} key={City.id}>
              <Popup>
                {City.cityName}
              </Popup>
            </Marker>

))
}
                            <ChangeCinter position={mapPosition}/>
          <ClickMap/>
          </MapContainer>
        
        </div>
    )
}


function ChangeCinter({position}){
    const map=useMap()
    map.setView(position)
    return null
    
}
function ClickMap(){
    const navgaite=useNavigate()
    useMapEvent({
        click:(e)=>navgaite(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
}
export default Map
