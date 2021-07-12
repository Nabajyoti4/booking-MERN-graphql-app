import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Event } from "../../interfaces/types";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";

//muation
import { DELETE_EVENT } from "../../GraphQl/Mutations";
import { USER_EVENTS } from "../../GraphQl/Queries";
import { useMutation } from "@apollo/client";

interface EventProps {
  event: Event;
  auth: boolean;
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
  date: {
    padding: "2px",
    backgroundColor: "white",
    color: "black",
    width: "30%",
    marginLeft: "auto",
    borderRadius: "20px",
  },
}));

interface EventVars {
  id: string;
}

const EventList = (props: EventProps) => {
  const classes = useStyles();
  const { event, auth } = props;

  const [deleteEvent, { loading: loadingEvent }] = useMutation<
    Event,
    EventVars
  >(DELETE_EVENT, {
    refetchQueries: [{ query: USER_EVENTS }],
  }); //FIXME:: Add custom merge on delete event and update cache

  const deleteEventHandler = () => {
    deleteEvent({ variables: { id: event._id } });
  };

  return (
    <Grid key={event._id} item xs={12} sm={12} lg={6}>
      <Paper className={classes.paper}>
        <Typography className={classes.date} variant="h6" component="h2">
          Date : {new Date(event.date).toLocaleDateString("en-US")}
        </Typography>
        <Typography variant="h3" component="h2">
          {event.title}
        </Typography>
        <Typography variant="subtitle1" component="h2">
          {event.description}
        </Typography>
        <Typography variant="h5" component="h2">
          RS : {event.price}
        </Typography>
        {!auth ? (
          <Button
            style={{
              backgroundColor: "white",
            }}
            variant="contained"
          >
            Book
          </Button>
        ) : (
          <Box
            style={{
              color: "white",
              width: "20%",
              margin: "auto",
              borderRadius: "10px",
              backgroundColor: "white",
              marginTop: "10px",
            }}
          >
            <IconButton onClick={deleteEventHandler}>
              <DeleteIcon></DeleteIcon>
            </IconButton>
            <IconButton>
              <EditIcon></EditIcon>
            </IconButton>
          </Box>
        )}
      </Paper>
    </Grid>
  );
};

export default EventList;
