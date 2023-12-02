// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";

import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Message from "./Message";
import { UseCities } from "../Context/CitesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}


const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const{createCity,isloding}=UseCities()
 
  
const [lat,lng]=useUrlPosition()
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const[GeolocationEroor,setGeolocationEroor]=useState("")
  const [emogi,setEmogi]=useState("")
  const navgaite=useNavigate()

  
  
  useEffect(function(){
    async function FitchPositon(){
      
      try{
        setGeolocationEroor("")
        
        const res=await fetch(`${BASE_URL}?${lat}&longitude=${lng}`)
        const data=await res.json()
        
        console.log(lat,lng)

        if(!data.continentCode)throw new Error("pleas click in somewhere else:(")
        setCityName(data.city );
        setCountry(data.countryName);
        setEmogi(convertToEmoji(data.countryCode))
        console.log(data.city)

        
      }
      catch(err){
      setGeolocationEroor(err.message)
      
    }
      
  }
  FitchPositon()
},[lat,lng]) 

function handlersumbit(e){
  e.preventDefault()

  const newCity = {
    cityName,
    country,
    date,
    notes,
    position: { lat, lng },
  };
  createCity(newCity)
  navgaite("/app")
}
if(GeolocationEroor)return<Message message={GeolocationEroor}/>
if(!lng&&!lat) return <Message message="to start click any where in map:) "/>

return (
  <form className={`${styles.form} ${isloding?styles.form.loading:""}`} onSubmit={handlersumbit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
       
        <DatePicker onChange={date=>setDate(date)} selected={date} dateFormat="dd/MM/yyyy"/>
         
             </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
       <Button type="primary">Add</Button>
        <Button type="back" onClick={(e)=>{
          e.preventDefault()
          navgaite(-1)}
          } >&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;
