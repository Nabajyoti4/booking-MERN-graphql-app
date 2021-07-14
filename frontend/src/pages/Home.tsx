import React from "react";

//graphql
import { EVENTS } from "../GraphQl/Queries";
import { useQuery } from "@apollo/client";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Event } from "../interfaces/types";

//component
import EventList from "../components/Event/EventList";
import EventSkeleton from "../components/Event/EventSkeleton";

interface EventData {
  events: Event[];
}

let eventList: boolean = false;

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

function Home() {
  const classes = useStyles();
  const { loading, error, data } = useQuery<EventData>(EVENTS);

  if (data) {
    eventList = data.events.length <= 0;
    console.log(eventList);
  }

  return (
    <Container maxWidth={false}>
      <Typography className={classes.headTitle} variant="h3" component="h2">
        Events
      </Typography>

      <div className={classes.root}>
        {loading && <EventSkeleton></EventSkeleton>}
        <Grid container spacing={6}>
          {error && (
            <Typography
              className={classes.headTitle}
              variant="h3"
              component="h2"
            >
              {error.message}
            </Typography>
          )}
          {data &&
            data.events.map((event) => (
              <EventList auth={false} key={event._id} event={event}></EventList>
            ))}
          {eventList && (
            <Typography
              className={classes.headTitle}
              variant="h3"
              component="h2"
            >
              No Events
            </Typography>
          )}
        </Grid>
      </div>
    </Container>
  );
}

export default Home;
