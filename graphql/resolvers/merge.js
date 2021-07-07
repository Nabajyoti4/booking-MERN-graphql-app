//model
const Event = require("../../model/event");
const User = require("../../model/user");
const Booking = require("../../model/booking");
const safeAwait = require("safe-await");
const { dateToString } = require("../../helpers/date");

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
    return transformEvent(event);
  });
};

// add user to events
const user = async (userId) => {
  const [error, user] = await safeAwait(User.findById(userId));

  if (error) {
    throw new Error("User not found" + error);
  }

  console.log("Map Users");
  return {
    ...user._doc,
    createdEvents: events.bind(this, user.createdEvents),
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
  return transformEvent(event);
};

//transform booking
const transformBooking = (booking) => {
  return {
    ...booking._doc,
    event: singleEvent.bind(this, booking._doc.event),
    user: user.bind(this, booking._doc.user),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
  };
};

//transform event
const transformEvent = (event) => {
  return {
    ...event._doc,
    date: new Date(event._doc.date).toISOString(),
    creator: user.bind(this, event.creator),
  };
};

exports.user = user;
exports.events = events;
exports.singleEvent = singleEvent;
exports.transformBooking = transformBooking;
exports.transformEvent = transformEvent;
