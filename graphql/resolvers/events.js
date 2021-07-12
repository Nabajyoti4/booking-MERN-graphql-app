const Event = require("../../model/event");
const User = require("../../model/user");
const { transformEvent } = require("./merge");

module.exports = {
  events: async () => {
    try {
      const eventsData = await Event.find().sort([["date"]]);
      const events = eventsData.map((event) => {
        return transformEvent(event);
      });

      return events;
    } catch (err) {
      throw new Error("Cant Fetch Events");
    }
  },
  userEvents: async (args, req) => {
    if (!req.isAuth) throw new Error("User Not authticated");
    try {
      const userId = args.id;
      const eventsData = await Event.find({ creator: req.userId }).sort([
        ["date"],
      ]);
      const events = eventsData.map((event) => {
        return transformEvent(event);
      });

      return events;
    } catch (err) {
      throw new Error("Cant Fetch Events");
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) throw new Error("User Not authticated");

    const eventData = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: req.userId,
    });

    try {
      const userExists = await User.findById(req.userId);

      const event = await eventData.save();

      userExists.createdEvents.push(event);

      await userExists.save();

      return transformEvent(event);
    } catch (err) {
      throw new Error("Event Error " + err);
    }
  },
};
