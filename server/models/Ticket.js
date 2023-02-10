const { Schema, model } = require("mongoose");

// id, user, status, eventId
const ticketSchema = new Schema({
  eventname: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
  username: {
    type: String,
    required: true,
  },
});

const Ticket = model("Ticket", ticketSchema);

module.exports = Ticket;
