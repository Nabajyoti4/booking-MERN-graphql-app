import React from "react";
import { useHistory } from "react-router";

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
import { setNotification } from "../../features/notification/notification";

//redux
import { useAppSelector, useAppDispatch } from "../../app/hooks";

//muation
import { DELETE_EVENT, BOOK_EVENT } from "../../GraphQl/Mutations";
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

interface EventDelete {
  deleteEvent: Event;
}

interface EventVars {
  id: string;
}

const EventList = (props: EventProps) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { event, auth } = props;

  const [deleteEvent, { loading: loadingEvent }] = useMutation<
    EventDelete,
    EventVars
  >(DELETE_EVENT, {
    refetchQueries: [{ query: USER_EVENTS }],
    onCompleted: (data) => {
      dispatch(
        setNotification({
          code: "200",
          message: `Event ${data.deleteEvent.title} Deleted Succesfully`,
          show: true,
          type: "success",
        })
      );
    },
  }); //FIXME:: Add custom merge on delete event and update cache

  const [bookEvent, { loading: loadingBooking }] = useMutation<EventVars>(
    BOOK_EVENT,
    {
      onCompleted: (data) => {
        history.push("/booking");
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const bookEventHandler = () => {
    console.log(event._id);
    bookEvent({ variables: { id: event._id } });
  };

  const deleteEventHandler = () => {
    deleteEvent({ variables: { id: event._id } });
  };

  return (
    <Grid key={event._id} item xs={12} sm={12} lg={6}>
      <Paper className={classes.paper}>
        <Typography className={classes.date} variant="h6" component="h2">
          Date :{new Date(event.date).toLocaleDateString("en-US")}
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
            onClick={bookEventHandler}
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
            {!loadingEvent && (
              <IconButton onClick={deleteEventHandler}>
                <DeleteIcon></DeleteIcon>
              </IconButton>
            )}

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
