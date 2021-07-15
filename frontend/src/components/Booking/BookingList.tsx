import React from "react";

//reduc
import { useAppDispatch } from "../../app/hooks";
import { setNotification } from "../../features/notification/notification";

//Ui
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
//Interface
import { Event } from "../../interfaces/types";

//applo
import { CANCEL_BOOKING } from "../../GraphQl/Mutations";
import { useMutation } from "@apollo/client";

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

interface EventProps {
  id: string;
  event: Event;
}

const BookingList: React.FC<EventProps> = ({ event, id }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [cancelBooking, { loading, error }] = useMutation<{ id: string }>(
    CANCEL_BOOKING,
    {
      onCompleted: () => {
        dispatch(
          setNotification({
            code: "200",
            message: "Booking Cancelled Succesfully",
            show: true,
            type: "success",
          })
        );
      },
    }
  );

  const bookingCancelHandler = () => {
    cancelBooking({
      variables: {
        id: id,
      },
    });
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
        {!loading && (
          <Button
            onClick={bookingCancelHandler}
            style={{
              backgroundColor: "red",
              color: "whitesmoke",
            }}
            variant="contained"
            type="submit"
          >
            CANCEL BOOKING
          </Button>
        )}
      </Paper>
    </Grid>
  );
};

export default BookingList;
