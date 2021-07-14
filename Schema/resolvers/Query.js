const Event = require("../../model/event");
const User = require("../../model/user");
const safeAwait = require("safe-await");
const Booking = require("../../model/booking");
const { ApolloError, AuthenticationError } = require("apollo-server-express");

const Query = {
  events: async () => {
    try {
      const events = await Event.find().sort([["date"]]);

      return events;
    } catch (err) {
      throw new Error("Cant Fetch Events");
    }
  },
  userEvents: async (_, args, context, info) => {
    if (!context.isAuth)
      throw new AuthenticationError("User Not authenticated");

    const [error, events] = await safeAwait(
      Event.find({ creator: context.userId }).sort([["date"]])
    );

    if (error) throw new ApolloError(err, "500");

    return events;
  },
  bookings: async (_, args, context, info) => {
    if (!context.isAuth)
      throw new AuthenticationError("User Not authenticated");
    const [error, bookings] = await safeAwait(
      Booking.find({ user: context.userId })
    );

    if (error) {
      throw new ApolloError(error, "500");
    }

    return bookings;
  },
};

module.exports = Query;
