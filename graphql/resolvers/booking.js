const Booking = require("../../model/booking");
const Event = require("../../model/event");

const {
  user,
  singleEvent,
  transformBooking,
  transformEvent,
} = require("./merge");

const { dateToString } = require("../../helpers/date");
const safeAwait = require("safe-await");

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) throw new Error("User Not authticated");
    const [error, bookings] = await safeAwait(Booking.find());

    if (error) {
      throw new Error("Booking Error " + error);
    }

    return bookings.map((booking) => {
      return transformBooking(booking);
    });
  },
  bookEvent: async (args, req) => {
    if (!req.isAuth) throw new Error("User Not authticated");
    const [error, event] = await safeAwait(Event.findById(args.eventId));

    if (error) {
      throw new Error("Event Found Error " + error);
    }

    const bookingData = new Booking({
      event: args.eventId,
      user: req.userId,
    });

    const [error2, booking] = await safeAwait(bookingData.save());

    if (error2) {
      throw new Error("Booking Save Error " + error2);
    }

    console.log("Booking saved");

    return transformBooking(booking);
  },
  cancelBooking: async (args, req) => {
    if (!req.isAuth) throw new Error("User Not authticated");
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
      createdAt: dateToString(booking._doc.createdAt),
      updatedAt: dateToString(booking._doc.updatedAt),
    };
  },
};
