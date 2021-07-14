import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  mainNav: {
    color: "white",
    "& ul": {
      display: "flex",
      listStyle: "none",
    },
    "& li": {
      margin: "0 1rem",
    },
    "& a": {
      color: "white",
      textDecoration: "none",
    },
  },
}));

const MainNavigation: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const token = useState<string | null>(localStorage.getItem("token"));
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h4"
            style={{
              cursor: "pointer",
            }}
            className={classes.title}
            onClick={() => {
              history.push("/");
            }}
          >
            EasyEvent
          </Typography>

          <nav className={classes.mainNav}>
            <ul>
              <li>
                <NavLink to="/auth">
                  <Typography variant="h6" className={classes.title}>
                    Login
                  </Typography>
                </NavLink>
              </li>

              <li>
                <NavLink to="/events">
                  <Typography variant="h6" className={classes.title}>
                    Events
                  </Typography>
                </NavLink>
              </li>
              <li>
                <NavLink to="/booking">
                  <Typography variant="h6" className={classes.title}>
                    Bookings
                  </Typography>
                </NavLink>
              </li>
            </ul>
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MainNavigation;
