import { createContext, useContext, useReducer } from "react";

const AuthContaxt=createContext()
const inialstate={
    user:null,
    isAuthenticated:false
}
const FAKE_USER = {
    name: "HATIM",
    email: "hatim@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };
function reducer(state,action){
    switch(action.type){
        case "login":return{...state,user:action.paylod,isAuthenticated:true} 
        case "logout":return{...state,user:action.paylod,isAuthenticated:false} 

        default:throw new Error("no action")
    } 

  

}

function AuthProvider({children}){
    const[{user,isAuthenticated},dispatch]=useReducer(reducer,inialstate)

    function login(email,password){
       if(email===FAKE_USER.email&&password===FAKE_USER.password) dispatch({type:"login",paylod:FAKE_USER})

    }
    function logout(){
        dispatch({type:"logout"})

    }

    return <AuthContaxt.Provider value={{
        user,
        isAuthenticated,
        login,
        logout
    }}>
        {children}

    </AuthContaxt.Provider>



}

function useAuth() {
    const context=useContext(AuthContaxt)

    return context}
export{AuthProvider,useAuth}