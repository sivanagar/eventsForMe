const { Schema, model } = require("mongoose");

// id, user, status, eventId
const ticketSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
  status: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Ticket = model("Ticket", ticketSchema);

module.exports = Ticket;
