import React from "react";
import { useAppDispatch } from "../app/hooks";
import { setNotification } from "../features/notification/notification";
import { setModal } from "../features/modal/modal";
import { useHistory } from "react-router";
import ErrorHandler from "../error/errorHandler";

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

function Events() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { loading, error, data } = useQuery<EventData>(USER_EVENTS, {
    onError: (err) => {
      const errData = ErrorHandler(err);
      dispatch(
        setNotification({
          code: errData.code,
          message: errData.message,
          show: true,
          type: "error",
        })
      );
      history.push("/auth");
    },
  });

  return (
    <Container maxWidth={false}>
      <EventCreate></EventCreate>
      <Typography className={classes.headTitle} variant="h3" component="h2">
        My Events
      </Typography>

      {error ? (
        <p>{error.message}</p>
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
    </Container>
  );
}

export default Events;
