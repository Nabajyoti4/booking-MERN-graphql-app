import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

//Applo
import { BOOKINGS } from "../GraphQl/Queries";
import { useQuery } from "@apollo/client";

//interface
import { Event } from "../interfaces/types";

//component
import BookingList from "../components/Booking/BookingList";

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
  const { loading, error, data } = useQuery<BookingData>(BOOKINGS, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <Container maxWidth={false}>
      <Typography className={classes.headTitle} variant="h3" component="h2">
        My Bookings
      </Typography>
      <div className={classes.root}>
        <Grid container spacing={6}>
          {data &&
            data.bookings.map((booking) => (
              <BookingList
                key={booking._id}
                event={booking.event}
              ></BookingList>
            ))}
        </Grid>
      </div>
    </Container>
  );
};

export default Booking;
