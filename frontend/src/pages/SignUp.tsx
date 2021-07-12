import React, { useState } from "react";
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
import { SIGNUP_USER } from "../GraphQl/Mutations";

const useStyles = makeStyles((theme) => ({
  labelSpace: {
    marginBottom: "10px",
  },
  boxClass: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  //Login User
  const [signUpUser, { loading: loadingSignUp }] = useMutation(SIGNUP_USER, {
    errorPolicy: "none",
    onCompleted: (data): void => {
      console.log(data); // the response
    },
    onError: (error) => {
      console.log("Error:" + error);
    },
  });

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signUpHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const data = await signUpUser({
        variables: {
          email: email,
          password: password,
        },
      });
      //FIXME::Remove old data from cache on user signup

      console.log(data);
    } catch (error) {
      console.log("sIGN UP " + error);
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
        {loadingSignUp && <p> Loading..</p>}
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

          <Box className={classes.boxClass}>
            <Button onClick={signUpHandler} variant="contained" color="primary">
              Sign Up
            </Button>
            <Typography
              onClick={() => {
                history.push("/auth");
              }}
              style={{
                cursor: "pointer",
              }}
              variant="body2"
              component="h2"
            >
              Login
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

export default SignUp;
