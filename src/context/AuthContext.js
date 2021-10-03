import React, { createContext, useEffect, useState  } from "react"
import {ImSpinner3} from 'react-icons/im'

export const AuthContext = createContext({})


export function AuthContextProvider(props) {

  const [loading, setLoading] = useState(true);
  const [login, setLogIn] = useState()
  useEffect(() => {
    const loadStorageData = async() => {
      const storegedtoken = await localStorage.getItem('token')

      if (storegedtoken) {
        handleSetLogin(storegedtoken)
      }
	 setLoading(false);
    }

    loadStorageData();
  },[])

  
    const handleSetLogin = (token) => {
      let payload = token.split(".")[1]
      payload = atob(payload)
      payload = JSON.parse(payload)
      const userId = payload.id
      const userEmail = payload.email
      const userRole = payload.role
      const expiresIn = payload.exp

      setLogIn({
        id: token,
        userId,
        userEmail,
        userRole,
        expiresIn
      })
      localStorage.setItem('token', token)
    }
  
   
    const handleLogout = () => {
      setLogIn(undefined)
      localStorage.removeItem('token')
    }
    if (loading) {
      return (
        <div className='flex h-full w-full justify-center items-center'>
          <ImSpinner3 className='text-base mr-1'/> Loading
        </div>
      );
    }
    return (

        <AuthContext.Provider value={{ login, handleSetLogin, handleLogout }}>
            {props.children}
        </AuthContext.Provider>
        
    )
}
    

