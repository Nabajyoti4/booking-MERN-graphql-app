//model
const Event = require("../../model/event");
const User = require("../../model/user");
const safeAwait = require("safe-await");
const bcrypt = require("bcryptjs");

// add events to user
const events = async (eventIds) => {
  const [error, events] = await safeAwait(
    Event.find({
      _id: { $in: eventIds },
    })
  );

  if (error) {
    throw new Error("Events not found");
  }

  return events.map((event) => {
    return {
      ...event._doc,
      date: new Date(event._doc.date).toISOString(),
      creator: user(event.creator),
    };
  });
};

// add user to events
const user = async (userId) => {
  const [error, user] = await safeAwait(User.findById(userId));

  if (error) {
    throw new Error("User not found");
  }

  return {
    ...user._doc,
    createdEvents: events(user.createdEvents),
  };
};

module.exports = {
  events: async () => {
    try {
      const eventsData = await Event.find();
      const events = eventsData.map((event) => {
        return {
          ...event._doc,
          date: new Date(event._doc.date).toISOString(),
          creator: user(event.creator),
        };
      });

      return events;
    } catch (err) {
      throw new Error("cant Create Event Try Again");
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

      return {
        ...event._doc,
        date: new Date(event._doc.date).toISOString(),
        creator: user(event.creator),
      };
    } catch (err) {
      throw new Error("Event Error " + err);
    }
  },

  createUser: async (args) => {
    const { email, password } = args.userInput;

    try {
      const emailTaken = await User.findOne({ email: email });
      if (emailTaken) {
        throw new Error("Email Taken already");
      }

      const hasedPassword = await bcrypt.hash(password, 12);

      const userData = new User({
        email: email,
        password: hasedPassword,
      });

      const user = await userData.save();

      return {
        ...user._doc,
        createdEvents: events(user.createdEvents),
      };
    } catch (err) {
      throw new Error("Error " + err);
    }
  },
};
