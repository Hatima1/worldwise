import { NavLink } from "react-router-dom"
import styles from "./PageNav.module.css"
import Logo from "./Logo.jsx"
function pagenav() {
    return (
       
        <nav className={styles.nav} >
            <Logo/>
            <ul>
                
                <li><NavLink to="/product">product</NavLink> </li> 
                <li><NavLink to="/Pricing">Pricing</NavLink> </li> 
                <li><NavLink to="/Login" className={styles.ctaLink}>Login</NavLink> </li> 
            </ul>
            
        </nav>
    )
}

export default pagenav
