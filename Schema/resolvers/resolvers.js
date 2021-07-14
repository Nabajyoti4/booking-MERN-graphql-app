const Event = require("../../model/event");
const User = require("../../model/user");

const resolvers = {
  Query: {
    events: async () => {
      try {
        const events = await Event.find().sort([["date"]]);

        return events;
      } catch (err) {
        throw new Error("Cant Fetch Events");
      }
    },
  },
  Event: {
    creator: async (parent) => {
      try {
        const user = await User.findById(parent.creator);

        return user;
      } catch (err) {
        throw new Error("Cant Fetch User");
      }
    },
  },
  User: {
    createdEvents: async (parent) => {
      try {
        const events = await Event.find({ creator: parent._id });

        return events;
      } catch (err) {
        throw new Error("Cant fetch events");
      }
    },
  },
};

module.exports = resolvers;
