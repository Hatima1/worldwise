
import styles from './Applayout.module.css'
import Sidebar from "../commponts/Sidebar"
import Map from "../commponts/Map"
import User from '../commponts/User'
function Applayout() {
    return (
        <div className={styles.app}>
            
            <Sidebar/>
            <Map/>
            <User/>
            
        </div>
    )
}

export default Applayout
