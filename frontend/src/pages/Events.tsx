import React from "react";
import { useAppDispatch } from "../app/hooks";
import { setModal } from "../features/modal/modal";
import { useHistory } from "react-router";

//graphql
import { USER_EVENTS } from "../GraphQl/Queries";
import { useQuery } from "@apollo/client";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import { Event } from "../interfaces/types";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

//component
import EventList from "../components/Event/EventList";
import EventCreate from "../components/Event/EventCreate";
import EventSkeleton from "../components/Event/EventSkeleton";

interface EventData {
  userEvents: Event[];
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    padding: "30px",
  },
  headTitle: {
    textAlign: "center",
    color: "#4627b4",
    margin: "auto",
    padding: "20px",
    fontWeight: "bold",
  },
  addBtn: {
    borderRadius: "50%",
    backgroundColor: "#4627b4",
    color: "white",
  },
}));

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Events() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { loading, error, data } = useQuery<EventData>(USER_EVENTS, {
    onError: (err) => {
      history.push("/auth");
    },
  });

  //snakbar
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Container maxWidth={false}>
      <EventCreate showSnack={handleOpen}></EventCreate>
      <Typography className={classes.headTitle} variant="h3" component="h2">
        My Events
      </Typography>

      {error ? (
        <p>Error Loading ...</p>
      ) : (
        <>
          <IconButton
            className={classes.addBtn}
            onClick={() => {
              dispatch(setModal({ show: true }));
            }}
          >
            <AddIcon></AddIcon>
          </IconButton>

          <div className={classes.root}>
            {loading && <EventSkeleton></EventSkeleton>}
            <Grid container spacing={6}>
              {data &&
                data.userEvents.map((event) => (
                  <EventList
                    key={event._id}
                    event={event}
                    auth={true}
                  ></EventList>
                ))}
            </Grid>
          </div>
        </>
      )}

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Event Added Succesfully
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Events;
