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
          //TODo: use user id . add virtuals to link together
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
          },
         

          // category: {
          //   type: String,
          //   required: true,
          // },
          // ticketPrice: {
          //   type: Number,
          //   required: true,
          //   },

    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      // id: false
    }
)



const Event = model('Event', eventSchema);

// eventSchema.virtual('ticketsCount').get(function() {
//   return this.tickets.length;
// });

module.exports = Event;