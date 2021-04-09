import React, {useState} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Login from "./components/login.component";
import SignUp from "./components/signup.componenet";
import QuerySelection from "./components/QuerySelection.component";
import DataDisplay from "./components/data-display.component";

function App() {
  // const [token, setToken] = useState();
  const token = 5;

  if(!token) {
    return <Login setToken />
  }

  return (
      <Router>
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
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/query-select" component={QuerySelection} />
            <Route path="/trend-query" component={DataDisplay} />
          </Switch>
        </div></Router>
  );
}

export default App;
