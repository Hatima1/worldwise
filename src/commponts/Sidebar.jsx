
import { Outlet } from 'react-router-dom'
import Logo from './Logo'
import AppNav from "./AppNav.jsx"
import styles from './Sidebar.module.css'
function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav/>
            <Outlet/>

            

        </div>
    )
}

export default Sidebar
