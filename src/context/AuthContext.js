import React, { createContext, useEffect, useState  } from "react"
import api from "../services/api"

export const AuthContext = createContext({})


export function AuthContextProvider(props) {


  const [login, setLogIn] = useState()
  useEffect(() => {
    if(!login){
      
      const storegedtoken = localStorage.getItem('token')
      if(storegedtoken) {
        api.get('pets/auth', { headers: {
          Authorization: `Bearer ${storegedtoken}`,
        }}).then(response => {
          if(response.data.messege === 'needs auth'){
            setLogIn(undefined)
            localStorage.removeItem('token')
          }
        })
      
        try{
          handleSetLogin(storegedtoken)
        }catch(err){
          localStorage.removeItem('token')
        }
        
      }
    }
  },[login])

    
    const handleSetLogin = (token) => {
      let payload = token.split(".")[1]
      payload = atob(payload)
      payload = JSON.parse(payload)
      const userId = payload.id[0].id
      const userEmail = payload.email
      const expiresIn = payload.exp

      setLogIn({
        id: token,
        userId,
        userEmail,
        expiresIn
      })
      localStorage.setItem('token', token)
    }
  
   
    const handleLogout = () =>{
      setLogIn(undefined)
      localStorage.removeItem('token')
    }
  
    return (

        <AuthContext.Provider value={{ login, handleSetLogin, handleLogout }}>
            {props.children}
        </AuthContext.Provider>
        
    )
}
    

