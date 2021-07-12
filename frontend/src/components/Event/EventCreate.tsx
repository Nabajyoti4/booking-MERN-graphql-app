import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setModal } from "../../features/modal/modal";
import { useFormik } from "formik";
import EventInputSchema from "../Validation/EventCreateValidation";

//ui
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import EventIcon from "@material-ui/icons/Event";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

//graphql
import { CREATE_EVENT } from "../../GraphQl/Mutations";
import { EVENTS } from "../../GraphQl/Queries";
import { useMutation } from "@apollo/client";

//form values
interface EventValues {
  title: string;
  description: string;
  price: number;
  date: string;
}

interface EventItem {
  _id: string;
  title: string;
  description: string;
  price: number;
  date: string;
}

interface EventList {
  events: EventItem[];
}

interface Props {
  showSnack(): void;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "20px",
    width: "50%",
    textAlign: "center",
  },
  labelSpace: {
    marginBottom: "10px",
  },
}));

const EventCreate: React.FC<Props> = (props) => {
  const show = useAppSelector((state) => state.modal.show);
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const [createEvent, { loading: loadingEvent }] = useMutation<{
    eventInput: EventValues;
  }>(CREATE_EVENT, {
    // refetchQueries: [{ query: EVENTS }],
    update(cache, { data }) {
      const newEvent = data;
      const existingEvents = cache.readQuery<EventList>({
        query: EVENTS,
      });

      if (existingEvents && newEvent) {
        cache.writeQuery({
          query: EVENTS,
          data: {
            events: [...existingEvents?.events, newEvent],
          },
        });
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: 0,
      date: "",
    },
    validationSchema: EventInputSchema,
    onSubmit: async (values) => {
      console.log(values.title);
      try {
        const data = await createEvent({
          variables: {
            title: values.title,
            description: values.description,
            price: +values.price,
            date: values.date,
          },
        });
        console.log(data);
        dispatch(
          setModal({
            show: false,
          })
        );
        props.showSnack();
      } catch (err) {
        console.log("Event Error" + err);
      }
    },
  });

  const handleClose = () => {
    dispatch(
      setModal({
        show: false,
      })
    );
  };

  return (
    <Modal
      open={show}
      className={classes.modal}
      onClose={handleClose}
      aria-labelledby="title"
      aria-describedby="description"
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Paper className={classes.paper}>
        <Typography variant="h4" component="h2">
          Add Event
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            className={classes.labelSpace}
            fullWidth
            disabled={loadingEvent}
            id="title"
            name="title"
            label="Title of the Event"
            type="text"
            variant="outlined"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            className={classes.labelSpace}
            fullWidth
            disabled={loadingEvent}
            id="price"
            label="Entry price for the Event"
            type="number"
            variant="outlined"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />

          <TextField
            className={classes.labelSpace}
            disabled={loadingEvent}
            fullWidth
            multiline
            rows={6}
            id="description"
            label="Description of the Event"
            type="text"
            variant="outlined"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />

          <TextField
            disabled={loadingEvent}
            className={classes.labelSpace}
            fullWidth
            id="date"
            label="Date of the Event"
            type="date"
            variant="outlined"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
          />

          {loadingEvent ? (
            <CircularProgress></CircularProgress>
          ) : (
            <Button
              style={{
                backgroundColor: "#4627b4",
                color: "whitesmoke",
              }}
              variant="contained"
              type="submit"
            >
              ADD
            </Button>
          )}
        </form>
      </Paper>
    </Modal>
  );
};

export default EventCreate;
