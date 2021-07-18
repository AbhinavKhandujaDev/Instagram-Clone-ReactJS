import { memo, useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import SignUp from "./pages/login/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        window.usersRef.child(user.uid).on("value", (snapshot) => {
          let obj = { ...snapshot.val(), uid: user.uid };
          obj = JSON.stringify(obj);
          sessionStorage.setItem("user", obj);
          setLoggedIn(true);
        });
      } else {
        setLoggedIn(true);
      }
    });
  }, []);
  return (
    <div className="App">
      {isLoggedIn === null ? (
        <div className="w-100 h-100 flex-center">
          <img
            width={70}
            height={70}
            src="/images/instagram-icon.svg"
            alt=""
          />
        </div>
      ) : (
        <Router>
          {isLoggedIn ? (
            <Switch>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
            </Switch>
          )}
        </Router>
      )}
    </div>
  );
}

export default memo(App);
