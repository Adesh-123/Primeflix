import React, { useContext } from 'react'
import Home from './pages/home/Home'
import "./App.scss"
import Watch from './pages/watch/Watch'
import Register from './pages/register/Register'
import Signin from './pages/signin/Signin'
import Profile from './pages/profile/Profile'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./authContext/AuthContext";
import Newpopular from './pages/newpopular/Newpopular'

function App() {
  const {user}=useContext(AuthContext);
  return (
    <div>
       <Router>
      <Switch>
            <Route exact path="/">
              {user ? <Home /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/login">{!user ? <Signin /> : <Redirect to="/" />}</Route>
            <Route exact path="/register">
              <Register /> 
            </Route>
            <Route exact path="/movies">
              <Home type="movie" />
            </Route>
            <Route exact path="/series">
              <Home type="series" />
            </Route>
            <Route exact path="/watch">
              <Watch />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/newpopular">
              <Newpopular />
            </Route>
      </Switch>
    </Router>
    </div>
  )
}

export default App