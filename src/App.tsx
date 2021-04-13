import React, {useState} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Link, Switch, Route, BrowserRouter} from 'react-router-dom'

import Login from "./components/login.component";
import SignUp from "./components/signup.componenet";
import QuerySelection from "./components/QuerySelection.component";
import DataDisplay from "./components/data-display.component";
import DbInfo from "./components/dbInfo.component";

function App() {
  const [token, setToken] = useState();
  const [querySubmitted, SetQuerySubmit] = useState();

  if(!token) {
    return <Login setToken={setToken}/>
  }

  if(querySubmitted) {
    return <QuerySelection/>
  }

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <a className="navbar-brand">Group 8</a>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/selection"}>Query Selection</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/dbInfo"}>DB Info</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Switch>
        <Route path='/selection'>
          <QuerySelection/>
        </Route>
        <Route path="/sign-up">
          <SignUp/>
        </Route>
        <Route path="/trend-query">
          <DataDisplay/>
        </Route>
        <Route path="/dbInfo">
          <DbInfo/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
