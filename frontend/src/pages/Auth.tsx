import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { login } from "../features/user/user";
import { useHistory } from "react-router-dom";

//Ui
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Paper } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";

//Appolo
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../GraphQl/Mutations";

interface SignUpData {
  token: string;
  userId: string;
  tokenExpiration: number;
}

const useStyles = makeStyles((theme) => ({
  labelSpace: {
    marginBottom: "10px",
    backgroundColor: "white",
  },
  boxClass: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Auth() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  //Login User
  const [loginUser, { loading: loadingLogin }] = useMutation(LOGIN_USER);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitHandler = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const data = await loginUser({
        variables: {
          email: email,
          password: password,
        },
      });

      const userData = data.data.login as SignUpData;

      dispatch(
        login({
          token: userData.token,
          userId: userData.userId,
          tokenExpiration: userData.tokenExpiration,
        })
      );

      history.push("/events");
    } catch (err) {
      setOpen(true);
    }
  };

  return (
    <Container
      maxWidth={false}
      style={{
        marginTop: "30px",
      }}
    >
      <Typography variant="h1" component="h2">
        {loadingLogin && <p> Loading..</p>}
      </Typography>
      <form>
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            width: "50%",
            margin: "auto",
            background: "#4627b4",
            color: "white",
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

          <Box className={classes.boxClass}>
            <Button onClick={submitHandler} variant="contained" color="primary">
              Login
            </Button>
            <Typography
              onClick={() => {
                history.push("/signup");
              }}
              style={{
                cursor: "pointer",
                width: "20%",
              }}
              variant="body2"
              component="h2"
            >
              Sign Up
            </Typography>
          </Box>
        </Paper>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Error Occured
        </Alert>
      </Snackbar>
      ;
    </Container>
  );
}

export default Auth;
