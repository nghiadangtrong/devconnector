import React from "react";
import "./App.css";
import "./css/font-awesome-4.7.0/css/font-awesome.min.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);

  // set user
  store.dispatch(setCurrentUser(decoded));

  // check for exprired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser()); // logout user
    store.dispatch(clearCurrentProfile()); // clear current profile
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            {routers.map(({access,...route}) =>
              access === "private" ? (
                <PrivateRoute key={route.path} {...route} />
              ) : (
                <Route key={route.path} {...route} />
              )
            )}
          </Switch>
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
  },
  {
    path: "/dashboard",
    component: Dashboard,
    exact: true,
    access: "private"
  },
  {
    path: "/create-profile",
    component: CreateProfile,
    exact: true,
    access: "private"
  }
];

export default App;
