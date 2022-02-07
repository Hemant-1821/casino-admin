import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
import Login from "./login";
import Trading from "./Trading";
import Navbar from "./Navbar";
import Profile from "./Profile";
import Home from "./Home";

function App() {
  const [state, setState] = React.useState({ adminId: undefined });

  const setLocal = (userId) => {
    localStorage.setItem("adminId", userId);
    setState(userId);
  };

  const removeLocal = () => {
    setState(undefined);
    localStorage.clear();
  };

  return (
    <div className="App">
      <Navbar userId={localStorage.getItem("adminId")} logout={removeLocal} />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              !localStorage.getItem("adminId") && !state.adminId ? (
                <Navigate to="/Login" />
              ) : (
                <Home />
              )
            }
          />
          <Route
            path="/Trading"
            element={
              !localStorage.getItem("adminId") && !state.adminId ? (
                <Navigate to="/Login" />
              ) : (
                <Trading />
              )
            }
          />
          <Route
            path="/Profile"
            element={
              !localStorage.getItem("adminId") && !state.adminId ? (
                <Navigate to="/Login" />
              ) : (
                <Profile />
              )
            }
          />
          <Route
            path="/Login"
            element={
              !localStorage.getItem("adminId") && !state.adminId ? (
                <Login setState={(userId) => setLocal(userId)} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
