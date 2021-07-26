import React, { useState } from 'react'
import useAuth from '../hook/useAuth'
import { Link, useHistory } from 'react-router-dom'
import api from '../services/api'
import Alert from '../components/alert'



const Login = () => {
  const { handleSetLogin, login } = useAuth()
  const [email , setEmail] = useState('')
  const [passwd , setPasswd] = useState('')
  const [signInError, setSignInError ] = useState(false)


  const handleLogin = async(e) => {
    
    e.preventDefault()
  
    const data = {
      email,
      passwd
    } 
  
     
     const response = await api.post('users/login', data)
     if(!response.data.error){
      
     
      handleSetLogin(response.data.token)
      console.log(response.data.token)
      history.push('/profile')
     }
      
       else {
        setSignInError(true)
       }
       
  }

  const history = useHistory()

  if(login){
   
    history.push('/profile')
  }
  
  return (
      <div className=' '>
       <div className=" w-full max-w-sm my-36 2xl:my-52 mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
            <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">Pets</h2>

            <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Bem-vindo</h3>

            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Entre ou crie uma conta</p>

            <form onSubmit={handleLogin}>
                <div className="w-full mt-4">
                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring dark:text-white" type="email" placeholder="Email Address" aria-label="Email Address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="w-full mt-4 mb-4">
                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring dark:text-white" type="password" placeholder="Senha" aria-label="Password"
                    value={passwd}
                    onChange={e => setPasswd(e.target.value)}
                    />
                </div>
                {signInError && <Alert>E-mail e / ou senha inválidos.</Alert>}
                <div className="flex items-center justify-between mt-4">
                    {//<a href="#" className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">Esqueceu a senha?</a>
}

                    <button className="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" type="submit">
                        Login
                    </button>
                </div>
            </form>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-gray-100 dark:bg-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-200">Ainda não tem uma conta? </span>
            
            <Link to="#" className="mx-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500">Cadastre-se</Link>
        </div>
    </div>
   
    </div>
  )
}

export default Login















