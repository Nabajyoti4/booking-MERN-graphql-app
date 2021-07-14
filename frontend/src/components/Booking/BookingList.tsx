import React from "react";

//Ui
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

//Interface
import { Event } from "../../interfaces/types";

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
  event: Event;
}

const BookingList: React.FC<EventProps> = ({ event }) => {
  const classes = useStyles();
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
      </Paper>
    </Grid>
  );
};

export default BookingList;
