import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Index from './pages/Index'
import Users from './pages/Users'
import Profile from './pages/Profile'
import PetRegister from './pages/PetRegister'
import Login from './pages/Login'
import Dogs from './pages/Dogs'
import Header from './components/Header'
import Footer from './components/Footer'
import Cats from './pages/Cats'
import LostAnimals from './pages/LostAnimals'

const Routes = () => {
  return (
    <BrowserRouter>
    <div className='py-20'> 
    <div className="fixed h-20 inset-x-0 top-0 "> 
      <Header />
      </div>
      <Switch>     
        <Route path="/" exact component={Index}/>
        <Route path="/dogs" exact component={Dogs}/>
        <Route path="/cats" exact component={Cats}/>
        <Route path="/lostanimals" exact component={LostAnimals}/>
        <Route path="/login" component={Login}/>
        <Route path="/users" component={Users}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/petregister" component={PetRegister}/>
      </Switch>
      <div className='fixed h-20 inset-x-0 bottom-0'> 
      <Footer />
      </div>
      </div>
    </BrowserRouter>
  )
}

export default Routes
