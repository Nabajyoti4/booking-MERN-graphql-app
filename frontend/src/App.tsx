import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

//Redux
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setNotification } from "./features/notification/notification";

import "./App.css";
import Auth from "./pages/Auth";
import Events from "./pages/Events";
import Booking from "./pages/Booking";
import MainNavigation from "./components/Navigation/MainNavigation";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

//Ui
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const App: React.FC = () => {
  const notification = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(
      setNotification({
        code: "",
        message: "",
        show: false,
        type: "info",
      })
    );
  };

  return (
    <Router>
      <MainNavigation></MainNavigation>
      <main className="App">
        <Switch>
          <Route path="/" exact>
            <Home></Home>
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
        <Snackbar
          open={notification.show}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={notification.type}>
            {notification.message}
          </Alert>
        </Snackbar>
      </main>
    </Router>
  );
};

export default App;
