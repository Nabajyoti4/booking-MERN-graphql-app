const Event = require("../../model/event");
const { transformEvent } = require("./merge");

module.exports = {
  events: async () => {
    try {
      const eventsData = await Event.find();
      const events = eventsData.map((event) => {
        return transformEvent(event);
      });

      return events;
    } catch (err) {
      throw new Error("Cant Fetch Events");
    }
  },
  createEvent: async (args) => {
    const eventData = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: "60e4623bf44e6e25586286ec",
    });

    try {
      const userExists = await User.findById("60e4623bf44e6e25586286ec");

      const event = await eventData.save();

      userExists.createdEvents.push(event);

      await userExists.save();

      return transformEvent(event);
    } catch (err) {
      throw new Error("Event Error " + err);
    }
  },
};
