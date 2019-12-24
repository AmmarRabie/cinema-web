import React from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// pages
import Login from './auth/login';
import Signup from './auth/signup';
import Movies from './movies'
import Admin from './admin'

import './App.css';


// we have the following routes
// /admin   ==> handles the admin user (adding new movie and screening time)
// /login   ==> login existing users
// /signup  ==> register new users
// /movies  ==> render existing movies
// /        ==> 
function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>

        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}


function Home(props) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/signup">signup</Link>
        </li>
        <li>
          <Link to="/movies">movies</Link>
        </li>
        <li>
          <Link to="/admin">admin</Link>
        </li>
      </ul>
    </nav>
  )
}

export default App;
