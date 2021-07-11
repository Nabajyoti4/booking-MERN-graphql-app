import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Event } from "../../interfaces/types";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

interface EventProps {
  event: Event;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    margin: "auto",
    borderRadius: "50px",
    background: "#4627b4",
    color: "white",
  },
}));

const EventList: React.FC<EventProps> = (event: EventProps) => {
  const classes = useStyles();
  return (
    <Grid key={event.event._id} item xs={6}>
      <Paper className={classes.paper}>
        <Typography variant="h3" component="h2">
          {event.event.title}
        </Typography>
        <Typography variant="subtitle1" component="h2">
          {event.event.description}
        </Typography>
        <Typography variant="h5" component="h2">
          RS : {event.event.price * 75}
        </Typography>
        <Button
          style={{
            backgroundColor: "white",
          }}
          variant="contained"
        >
          Book
        </Button>
      </Paper>
    </Grid>
  );
};

export default EventList;
