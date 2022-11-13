const {Schema, model, Types}= require('mongoose');



// id, user ,status
const ticketSchema = new Schema(
  {
   
    status: {
      type: String,
      // required: true,
      trim: true
    },
    boughtBy: {
      type: String,
      // required: true,
      trim: true
    },
    eventId: {
        type: Types.ObjectId, 
        ref: 'Event' 
    }
  }
  
);






const Ticket = model('Ticket', ticketSchema);

module.exports =  Ticket;