import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./App.css";
import Auth from "./pages/Auth";
import Events from "./pages/Events";
import Booking from "./pages/Booking";
import MainNavigation from "./components/Navigation/MainNavigation";
import SignUp from "./pages/SignUp";

const App: React.FC = () => {
  return (
    <Router>
      <MainNavigation></MainNavigation>
      <main>
        <Switch>
          <Route path="/" exact>
            <Auth></Auth>
          </Route>
          <Route path="/auth" exact>
            <Auth></Auth>
          </Route>
          <Route path="/signup" exact>
            <SignUp></SignUp>
          </Route>
          <Route path="/events" exact>
            <Events></Events>
          </Route>
          <Route path="/booking" exact>
            <Booking></Booking>
          </Route>
          <Redirect to="/"></Redirect>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
