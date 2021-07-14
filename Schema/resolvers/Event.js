const Event = require("../../model/event");
const User = require("../../model/user");
const { ApolloError } = require("apollo-server-express");

const EventResolver = {
  creator: async (parent) => {
    try {
      const user = await User.findById(parent.creator);

      return user;
    } catch (err) {
      throw new Error("Cant Fetch User");
    }
  },
};

module.exports = EventResolver;
