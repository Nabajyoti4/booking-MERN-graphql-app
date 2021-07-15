import React from "react";
import { useHistory } from "react-router";
import { useAppDispatch } from "../app/hooks";
import { setNotification } from "../features/notification/notification";
import ErrorHandler from "../error/errorHandler";

//Applo
import { BOOKINGS } from "../GraphQl/Queries";
import { useQuery } from "@apollo/client";

//interface
import { Event } from "../interfaces/types";

//component
import BookingList from "../components/Booking/BookingList";
import EventSkeleton from "../components/Event/EventSkeleton";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

//ui
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

interface BookingData {
  bookings: [
    {
      _id: string;
      event: Event;
    }
  ];
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

const Booking: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { loading, error, data } = useQuery<BookingData>(BOOKINGS, {
    fetchPolicy: "no-cache",
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
      <Typography className={classes.headTitle} variant="h3" component="h2">
        My Bookings
      </Typography>
      <div className={classes.root}>
        <Grid container spacing={6}>
          {loading && <EventSkeleton></EventSkeleton>}
          {data &&
            data.bookings.map((booking) => (
              <BookingList
                key={booking._id}
                id={booking._id}
                event={booking.event}
              ></BookingList>
            ))}
        </Grid>
      </div>
    </Container>
  );
};

export default Booking;
