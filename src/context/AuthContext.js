import React, { createContext, useEffect, useState  } from "react"
import { useHistory } from 'react-router-dom';

export const AuthContext = createContext({})


export function AuthContextProvider(props) {
  const history = useHistory()

  const [login, setLogIn] = useState()
  useEffect(() => {
  
    const storegedtoken = localStorage.getItem('token')
    console.log(storegedtoken)
  
    
    if(storegedtoken ) {
      try{
        handleSetLogin(storegedtoken)
      }catch(err){
        localStorage.removeItem('token')
      }
      
    }
  },[])

    
    const handleSetLogin = (token) => {
      let payload = token.split(".")[1]
      payload = atob(payload)
      payload = JSON.parse(payload)
      const userId = payload.id[0].id
      const userEmail = payload.email
      setLogIn({
        id: token,
        userId,
        userEmail
      })
      localStorage.setItem('token', token)
    }
  
   
    const handleLogout = () =>{
      setLogIn(undefined)
      localStorage.removeItem('token')
      history.push('/')
    }
  
    return (

        <AuthContext.Provider value={{ login, handleSetLogin, handleLogout }}>
            {props.children}
        </AuthContext.Provider>
        
    )
}
    

