import React, {useState} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Link, Switch, Route} from 'react-router-dom'

import Login from "./components/login.component";
import SignUp from "./components/signup.componenet";
import QuerySelection from "./components/QuerySelection.component";
import DataDisplay from "./components/data-display.component";
import DbInfo from "./components/dbInfo.component";

function WelcomePage() {
  return (
  <div className="auth-wrapper">
            <div className="auth-inner">
                <h1>Welcome to the COVID-19 Dashboard</h1>
                <p>To get started please select 'Query Selection' in the top-right corner</p>
            </div>
          </div>);
}

function App() {
  const [token, setToken] = useState(); // eslint-disable-next-line

  if(!token) {
    return <Login setToken={setToken}/>
  }

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <button disabled className="navbar-brand btn">Group 8 - COVID-19 Dashboard</button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/"}>Query Selection</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/db-info"}>DB Info</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      
      
      <Switch>
        <Route path="/db-info">
          <DbInfo/>
        </Route>
        <Route path='/'>
          <QuerySelection/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
