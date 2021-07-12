import * as Yup from "yup";
// validation rules for fleids
const EventInputSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(300, "Too Long!")
    .required("Required"),
  price: Yup.number()
    .required("Required")
    .min(10, "Too low")
    .max(300, "Too High!"),
  date: Yup.string().required("Required"),
});

export default EventInputSchema;
