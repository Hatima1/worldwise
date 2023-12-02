import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Pagennav from"../commponts/Pagenav.jsx"
import {useAuth} from "../Context/FakeAuthContext"
import { useNavigate } from "react-router-dom";
import Button from "../commponts/Button";
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("hatim@example.com");
  const [password, setPassword] = useState("qwerty");
  const {login,isAuthenticated}=useAuth()
  const navgaite=useNavigate()

  useEffect(function(){
    if(isAuthenticated===true) navgaite("/app",{replace:true})

  },[isAuthenticated])

  function handlersumbit(e){
    e.preventDefault()
    if(email&&navgaite) login(email,password)
    

  }

  return (
    <main className={styles.login}>
      <Pagennav/>
      <form className={styles.form} onSubmit={handlersumbit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">login</Button>
        </div>
      </form>
    </main>
  );
}
