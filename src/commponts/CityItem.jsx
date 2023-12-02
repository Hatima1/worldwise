import { Link } from "react-router-dom";
import styles from "./CityItem.module.css"; 
import { UseCities } from "../Context/CitesContext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
   
  }).format(new Date(date));

function CityItem({citie}) {
    const{cityName,emoji,date,id,position}=citie
    const{lng,lat}=position
    const{currentCity,deleteCity}=UseCities()
    function handlerdelet(e){
      e.preventDefault()
      deleteCity(id)


    }
    
    return (
        <ul>

        <Link className={`${styles.cityItem} ${id===currentCity.id?styles["cityItem--active"]:""}`} to={`${id}?lat=${lat}&lng=${lng}` }>
            <span className={styles.emoji}>{emoji}</span>
            <h3 className={styles.name}>{cityName} </h3>
            <time className={styles.date}>{formatDate(date)} </time>
           
            <button className={styles.deleteBtn} onClick={handlerdelet}  >&times;</button>
        </Link>
        </ul>
    )
}

export default CityItem
