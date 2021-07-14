const Event = require("../../model/event");
const User = require("../../model/user");
const Booking = require("../../model/booking");
const safeAwait = require("safe-await");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { ApolloError } = require("apollo-server-express");

const Mutation = {
  createEvent: async (_, args, context, info) => {
    if (!context.isAuth) throw new ApolloError("User Not authticated", 404);

    const eventData = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: context.userId,
    });

    try {
      const userExists = await User.findById(context.userId);

      const event = await eventData.save();

      userExists.createdEvents.push(event);

      await userExists.save();

      return event;
    } catch (err) {
      throw new Error("Event Error " + err);
    }
  },
  deleteEvent: async (_, args, context, info) => {
    // if (!req.isAuth) throw new Error("User Not authticated");
    try {
      const id = args.id;
      const [error, events] = await safeAwait(Event.findByIdAndDelete(id));
      if (error) throw new Error("Database Error" + error);

      if (!events) throw new Error("Event Not Found");

      return events;
    } catch (err) {
      throw new ApolloError(err, "500");
    }
  },
  login: async (_, args, context, info) => {
    //check if user exist
    const [error, user] = await safeAwait(User.findOne({ email: args.email }));

    if (error) throw new Error("User Fetch Server Error In login " + error);

    if (!user) throw new Error("User not exists");

    const [error2, passwordEqual] = await safeAwait(
      bcrypt.compare(args.password, user.password)
    );

    if (error2) throw new Error("Bcrypt Error " + error2);

    if (!passwordEqual) throw new Error("Password Incorrect");

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return {
      userId: user._id,
      token: token,
      tokenExpiration: 1,
    };
  },
  createUser: async (_, args, context, info) => {
    const { email, password } = args.userInput;

    const [error, emailTaken] = await safeAwait(User.findOne({ email: email }));

    if (emailTaken) {
      throw new ApolloError("User Already Exists", "401");
    }

    const hasedPassword = await bcrypt.hash(password, 12);

    const userData = new User({
      email: email,
      password: hasedPassword,
    });

    const user = await userData.save();

    return user;
  },
  bookEvent: async (_, args, context, info) => {
    if (!context.isAuth) throw new ApolloError("User Not authticated", 404);
    const [error, event] = await safeAwait(Event.findById(args.eventId));

    if (error) {
      throw new ApolloError(error, "500");
    }

    const bookingData = new Booking({
      event: args.eventId,
      user: context.userId,
    });

    const [error2, booking] = await safeAwait(bookingData.save());

    if (error2) {
      throw new ApolloError(error2, "500");
    }

    return booking;
  },
  cancelBooking: async (_, args, context, info) => {
    if (!context.isAuth) throw new ApolloError("User Not authticated", 404);
    const [error, booking] = await safeAwait(Booking.findById(args.bookingId));

    if (error) {
      throw new ApolloError(error, "500");
    }

    const [error2, bookingDeleted] = await safeAwait(
      Booking.deleteOne({ _id: args.bookingId })
    );

    if (error2) {
      throw new ApolloError(error2, "500");
    }

    return bookingDeleted;
  },
};

module.exports = Mutation;
