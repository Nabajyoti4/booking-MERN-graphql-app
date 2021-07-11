import React from "react";
import { useAppSelector } from "../app/hooks";

//graphql
import { EVENTS } from "../GraphQl/Queries";
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

interface EventData {
  events: Event[];
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
  const userId = useAppSelector((state) => state.user.userId);
  const classes = useStyles();
  const { loading, error, data } = useQuery<EventData>(EVENTS);

  return (
    <Container maxWidth={false}>
      <Typography className={classes.headTitle} variant="h3" component="h2">
        Events
      </Typography>
      <IconButton className={classes.addBtn}>
        <AddIcon></AddIcon>
      </IconButton>

      <div className={classes.root}>
        {loading && <p>Loading Events...</p>}
        <Grid container spacing={6}>
          {data &&
            data.events.map((event) => <EventList event={event}></EventList>)}
        </Grid>
      </div>
    </Container>
  );
}

export default Events;
