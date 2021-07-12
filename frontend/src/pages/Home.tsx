import React from "react";

//graphql
import { EVENTS } from "../GraphQl/Queries";
import { useQuery } from "@apollo/client";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Event } from "../interfaces/types";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

//component
import EventList from "../components/Event/EventList";
import EventSkeleton from "../components/Event/EventSkeleton";

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

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Home() {
  const classes = useStyles();
  const { loading, error, data } = useQuery<EventData>(EVENTS);

  //snakbar
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth={false}>
      <Typography className={classes.headTitle} variant="h3" component="h2">
        Events
      </Typography>

      <div className={classes.root}>
        {loading && <EventSkeleton></EventSkeleton>}
        <Grid container spacing={6}>
          {data &&
            data.events.map((event) => (
              <EventList key={event._id} event={event}></EventList>
            ))}
        </Grid>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Event Added Succesfully
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Home;
