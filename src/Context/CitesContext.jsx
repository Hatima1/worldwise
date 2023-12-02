import { createContext, useCallback, useContext, useReducer} from "react";
import { useEffect, useState } from "react"
const BASE_URL="http://localhost:9000/"

const inialstate={
  cities:[],
  isloding:true,
  currentCity:{},

}
   


function reducer(state,action){
  switch(action.type){
    case "isloding":return{...state,isloding:true} 
     case "cities/loaded":return{...state,isloding:false,cities:action.paylod} 
      case "city/loaded":return{...state,isloding:false,currentCity:action.paylod} 
       case "city/create":return{...state,isloding:false,cities:[...state.cities,action.paylod]} 
        case "city/delete":return{...state,isloding:false,cities:state.cities.filter(city=>city.id!==action.paylod)} 
        case "delete":


          default:throw new Error("no action")
  }

}

const CitesContext=createContext()

function CitesProvider({children}){
  const[{cities,currentCity,isloding},dispatch]=useReducer(reducer,inialstate)

useEffect(function(){
  async function fetchcities(){
    
    try{
      dispatch({type:"isloding"})

      const res=await fetch(`${BASE_URL}cities`)
      const data=await res.json()
      
      dispatch({type:"cities/loaded",paylod:data})
    }
    catch{
     alert("somthing error")
    }
   

  }
  fetchcities()
}
,[])

const getCity=useCallback( async function getCity(id){
  if(currentCity.id===+id)return

  dispatch({type:"isloding"})
    try{
     
      const res=await fetch(`${BASE_URL}cities/${id}`)
      const data=await res.json()
      
      dispatch({type:"city/loaded",paylod:data})
    }
    catch{
     alert("somthing error")
    }


  },[currentCity.id])

  async function createCity(newCity){
    dispatch({type:"isloding"})
    try{
           const res=await fetch(`${BASE_URL}cities`,{
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json"},


      })
      const data=await res.json()
      
     console.log(data)
     dispatch({type:"city/create",paylod:data})
    }
    catch{
     alert("somthing error")
    }
   

  }
  async function deleteCity(id){
    dispatch({type:"isloding"})
    try{

      await fetch(`${BASE_URL}cities/${id}`,{
        method: "DELETE",
       
      })
  
      
     
      dispatch({type:"city/delete",paylod:id})
    }
    catch{
     alert("somthing error with delete")
    }
 
  }




 
return <CitesContext.Provider value={{
    cities,
    isloding,
    currentCity,
    getCity,
    createCity,
    deleteCity
}}>
{children}



</CitesContext.Provider>

}

function UseCities(){
   const context=useContext(CitesContext)
   if(context===undefined) throw new Error("ceties contaxt in the wrong place")
    return context
}
export{CitesProvider,UseCities}