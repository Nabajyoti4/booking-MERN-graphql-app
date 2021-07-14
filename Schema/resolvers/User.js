const Event = require("../../model/event");
const User = require("../../model/user");

const UserResolver = {
  createdEvents: async (parent) => {
    try {
      const events = await Event.find({ creator: parent._id });

      return events;
    } catch (err) {
      throw new Error("Cant fetch events");
    }
  },
};

module.exports = UserResolver;
