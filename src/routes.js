import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Index from './pages/Index'
import Users from './pages/Users'
import Profile from './pages/Profile'
import PetRegister from './pages/PetRegister'
import Login from './pages/Login'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Index}/>
        <Route path="/login" component={Login}/>
        <Route path="/users" component={Users}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/petregister" component={PetRegister}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes