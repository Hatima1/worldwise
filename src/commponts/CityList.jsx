import CityItem from './CityItem'
import Spinner from './Spinner.jsx'
import styles from './CityList.module.css'
import Message from './Message.jsx'
import { UseCities } from '../Context/CitesContext'


function CityList( ) {
const{cities,isloding}=UseCities()

    if(isloding)  return <Spinner/> 
    if(!cities.length) return <Message message="pleas ad some country"/>
    return (
        <ul className={styles.cityList}  >

            {cities.map((citie)=><CityItem citie={citie} key={citie.id}/> )}
            
        </ul>
    )
}

export default CityList
