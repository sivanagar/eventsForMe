const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: "Title is required",
      trim: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
    },
    description: {
      type: String,
      required: "Description is required",
      trim: true,
    },
    hostName: {
      type: String,
      required: true,
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
    capacitySize: {
      type: Number,
      required: true,
    },

    // category: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // id: false
  }
);

const Event = model("Event", eventSchema);

// eventSchema.virtual('ticketsCount').get(function() {
//   return this.tickets.length;
// });

module.exports = Event;
