import React, { useState, useEffect } from "react";

//Ui
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Paper } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//Appolo
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../GraphQl/Mutations";

const useStyles = makeStyles((theme) => ({
  labelSpace: {
    marginBottom: "10px",
  },
}));

function Auth() {
  const classes = useStyles();
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      console.log(data); // the response
    },
    onError: (error) => {
      console.log(error); // the error if that is the case
    },
  });

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitHandler = (e: React.MouseEvent): void => {
    e.preventDefault();

    loginUser({
      variables: {
        email: email,
        password: password,
      },
    });
  };

  return (
    <Container maxWidth={false}>
      <Typography variant="h1" component="h2">
        {loading && <p> Loading..</p>}
      </Typography>

      <form>
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            width: "50%",
            margin: "auto",
          }}
        >
          <TextField
            className={classes.labelSpace}
            fullWidth
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              setEmail(e.currentTarget.value);
            }}
          />
          <TextField
            className={classes.labelSpace}
            fullWidth
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              setPassword(e.currentTarget.value);
            }}
          />
          <Button
            style={{
              margin: "auto",
            }}
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
          <Button onClick={submitHandler} variant="contained" color="primary">
            Login
          </Button>
        </Paper>
      </form>
    </Container>
  );
}

export default Auth;
