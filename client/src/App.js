import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {routers.map(route=> <Route key={route.path} {...route} />)}
        <Footer />
      </div>
    </Router>
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
