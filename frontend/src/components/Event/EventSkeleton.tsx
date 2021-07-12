import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    width: "90%",
    padding: "50px",
  },
});

const skeletonElement: JSX.Element = (
  <Grid item xs={6}>
    <Skeleton variant="rect" height={118} />
    <Skeleton width={440} animation={false} />
    <Skeleton animation="wave" />
  </Grid>
);

function EventSkeleton() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {[...Array(3)].map(() => skeletonElement)}
      </Grid>
    </div>
  );
}

export default EventSkeleton;
