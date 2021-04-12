import React, {useState} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, Link, BrowserRouter} from 'react-router-dom'

import Login from "./components/login.component";
import SignUp from "./components/signup.componenet";
import QuerySelection from "./components/QuerySelection.component";
import DataDisplay from "./components/data-display.component";

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken}/>
  }

  return (
      <BrowserRouter>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <a className="navbar-brand">Group 8</a>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <Switch>
            <Route path='/'>
              <QuerySelection/>
            </Route>
            <Route path="/sign-up">
              <SignUp/>
            </Route>
            <Route path="/trend-query">
              <DataDisplay/>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
