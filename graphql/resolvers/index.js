//model
const Event = require("../../model/event");
const User = require("../../model/user");
const Booking = require("../../model/booking");

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

  console.log("Map events");
  return events.map((event) => {
    return {
      ...event._doc,
      date: new Date(event._doc.date).toISOString(),
      creator: user.bind(event.creator),
    };
  });
};

// add user to events
const user = async (userId) => {
  const [error, user] = await safeAwait(User.findById(userId));

  if (error) {
    throw new Error("User not found");
  }
  console.log("Map Users");
  return {
    ...user._doc,
    createdEvents: events.bind(user.createdEvents),
  };
};

// return single event for booking
const singleEvent = async (eventId) => {
  console.log(eventId);
  const [error, event] = await safeAwait(Event.findById(eventId));

  if (error) {
    throw new Error("Single Event Found Error " + error);
  }

  console.log("map Single Event");
  return {
    ...event._doc,
    creator: user.bind(event.creator),
  };
};

module.exports = {
  bookings: async () => {
    const [error, bookings] = await safeAwait(Booking.find());

    if (error) {
      throw new Error("Booking Error " + error);
    }

    return bookings.map((booking) => {
      return {
        ...booking._doc,
        event: singleEvent.bind(this, booking._doc.event),
        user: user.bind(this, booking._doc.user),
        createdAt: new Date(booking._doc.createdAt).toISOString(),
        updatedAt: new Date(booking._doc.updatedAt).toISOString(),
      };
    });
  },
  bookEvent: async (args) => {
    const [error, event] = await safeAwait(Event.findById(args.eventId));

    if (error) {
      throw new Error("Event Found Error " + error);
    }

    const bookingData = new Booking({
      event: args.eventId,
      user: "60e4623bf44e6e25586286ec",
    });

    const [error2, booking] = await safeAwait(bookingData.save());

    if (error2) {
      throw new Error("Booking Save Error " + error2);
    }

    console.log("Booking saved");

    return {
      ...booking._doc,
      event: singleEvent.bind(this, booking._doc.event),
      user: user.bind(this, booking._doc.user),
      createdAt: new Date(booking._doc.createdAt).toISOString(),
      updatedAt: new Date(booking._doc.updatedAt).toISOString(),
    };
  },
  cancelBooking: async (args) => {
    const [error, booking] = await safeAwait(Booking.findById(args.bookingId));

    if (error) {
      throw new Error("Booking Found Error  " + error);
    }

    const [error2, bookingDeleted] = await safeAwait(
      Booking.deleteOne({ _id: args.bookingId })
    );

    if (error2) {
      throw new Error("Booking Delete Error " + error2);
    }

    return {
      event: singleEvent.bind(this, booking._doc.event),
      user: user.bind(this, booking._doc.user),
      createdAt: new Date(booking._doc.createdAt).toISOString(),
      updatedAt: new Date(booking._doc.updatedAt).toISOString(),
    };
  },
  events: async () => {
    try {
      const eventsData = await Event.find();
      const events = eventsData.map((event) => {
        return {
          ...event._doc,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event.creator),
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
        creator: user.bind(this, event.creator),
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
        createdEvents: events.bind(this, user.createdEvents),
      };
    } catch (err) {
      throw new Error("Error " + err);
    }
  },
};
