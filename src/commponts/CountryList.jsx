import CountryItem from './CountryItem'
import Spinner from './Spinner.jsx'
import styles from './CountryList.module.css'
import Message from './Message.jsx'
import { UseCities } from '../Context/CitesContext'


function CityList( ) {
  const{cities,isloding}=UseCities()
    if(isloding)  return <Spinner/> 
    if(!cities.length) return <Message message="pleas ad some country"/>
    const countries = cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country))
          return [...arr, { country: city.country, emoji: city.emoji }];
        else return arr;
      }, []);
    return (
        <ul className={styles.countryList}  >

            {countries.map((country)=><CountryItem country={country} key={country.country}  /> )}
            
        </ul>
    )
}

export default CityList
