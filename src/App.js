import React from 'react'
import Routes from './routes'

import { AuthContextProvider } from './context/AuthContext'



function App() {

  return (
   
    <div className='bg-blue-50 dark:bg-gray-700 md:h-screen'>
      <AuthContextProvider>
     
          <Routes />  
    
        </AuthContextProvider>
    </div>
  );
}

export default App;