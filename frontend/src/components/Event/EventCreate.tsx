import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setModal } from "../../features/modal/modal";
import { useFormik } from "formik";
import * as Yup from "yup";
//ui
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

//form values
interface EventValues {
  title: string;
  description: string;
  price: number | null;
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

const EventInputSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(300, "Too Long!")
    .required("Required"),
  price: Yup.number().required("Required"),
});

const EventCreate: React.FC = () => {
  const show = useAppSelector((state) => state.modal.show);
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: 0,
    },
    validationSchema: EventInputSchema,
    onSubmit: (values) => {
      // same shape as initial values
      console.log(values);
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
        </form>
      </Paper>
    </Modal>
  );
};

export default EventCreate;
