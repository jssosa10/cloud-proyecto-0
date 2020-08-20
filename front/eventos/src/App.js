
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { AuthContext } from "./context/auth";

import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import PrivateRoute from './privateRoute';


const App = (props) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  const logOut = () => {
    setAuthToken();
    localStorage.removeItem("token")
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
    <Router>
      <div>
        <nav className="navbar fixed-top navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Eventos ABC
          </Link>
          {authToken? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href='javascript:void(0)' className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/"} className="nav-link">
                    Login
                </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                </Link>
                </li>
              </div>
            )}
        </nav>

        <div className="container mt-3">
          <Switch>
              <PrivateRoute exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </div>
    </Router>
    </AuthContext.Provider>
  );
};

export default App;