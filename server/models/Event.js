const {Schema, model}= require('mongoose');

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: 'Title is required',
            trim: true,
          },
          address: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: 'Description is required',
            trim: true,
          },
          owner: {
            type: String,
            required: true,
          },
          capacity: {
            type: Number,
            required: true,
          },
          when: {
            type: Date,
            required: true,
          }

    }
)

//TODO: tickets documents


const Event = model('Event', eventSchema);

module.exports = Event;