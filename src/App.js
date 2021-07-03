import { memo } from "react";
import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/Home";
import SignUp from "./pages/login/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

var configure = {
  apiKey: process.env.REACT_APP_FIREBASEAPIKEY,
  authDomain: process.env.REACT_APP_FIREBASEAUTHDOMAIN,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  projectId: process.env.REACT_APP_FIREBASEPROJECTID,
};

firebase.initializeApp(configure);
window.firebase = firebase;

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default memo(App);
