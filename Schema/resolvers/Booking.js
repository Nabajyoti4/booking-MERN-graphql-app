const Event = require("../../model/event");
const User = require("../../model/user");
const { ApolloError } = require("apollo-server-express");
const safeAwait = require("safe-await");

const BookingResolver = {
  event: async (parent) => {
    const [error, event] = await safeAwait(Event.findById(parent.event));
    if (error) throw new ApolloError(error, "500");
    return event;
  },
  user: async (parent) => {
    const [error, user] = await safeAwait(User.findById(parent.user));
    if (error) throw new ApolloError(error, "500");

    return user;
  },
};

module.exports = BookingResolver;
