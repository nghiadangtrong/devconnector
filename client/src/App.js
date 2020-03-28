import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  
  // set user
  store.dispatch(setCurrentUser(decoded));

  // check for exprired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    window.location.href = "/login"
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          {routers.map(route => (
            <Route key={route.path} {...route} />
          ))}
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

const routers = [
  {
    path: "/",
    component: Landing,
    exact: true
  },
  {
    path: "/register",
    component: Register,
    exact: true
  },
  {
    path: "/login",
    component: Login,
    exact: true
  }
];

export default App;
