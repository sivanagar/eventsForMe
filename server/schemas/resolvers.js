const { AuthenticationError } = require("apollo-server-express");
const { User, Event, Ticket } = require("../models");
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .populate('events')
          .select('-__v -password');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    events: async (parent, args, context) => {
      const events = await Event.find();
      if (!events)
        // if no events
        throw new Error("No Events exist yet");
      return events;
    },
    eventById: async (parent, args, context) => {
      // ToDo validate user logged in via token
      //if (context.user) {
      //const user = await User.findById(context.user._id)
      const event = await Event.findById(args._id);
      return event;
      //}

      throw new AuthenticationError("Not logged in");
    },
    userById: async (parent, args, context) => {
      // ToDo validate user logged in via token
      //if (context.user) {
      //const user = await User.findById(context.user._id)
      const user = await User.findById(args._id);
      return user;
      //}

      throw new AuthenticationError("Not logged in");
    },
    users: async (parent, args, context) => {
      const users = await User.find();
      return users;
    },
    tickets: async (parent, args, context) => {
      const tickets = await Ticket.find();
      return tickets
    },
    ticketById: async (parent, args, context) => {
      const ticket = await Ticket.findById(args._id);
      return ticket;
    },
    ticketsByEventId: async (parent, args, context) => {
      const tickets = await Ticket.find(args);
      return tickets;
    },

  },
  Mutation: {
    updateEvent: async (parent, args) => {
      // ToDo: does a user need to be logged in to make event?
      //ToDo: account for overbooking a venue on the same date and time
      const updateEvent = await Event.findOneAndUpdate(
        { _id: args._id }, // look up the event by its id
        { ...args }, // spread new values as arguments, to update values
        { new: true, runValidators: true }
      );

      return updateEvent;
    },
    addEvent: async (parent, args) => {
      // ToDo: does a user need to be logged in to make event?
      //ToDo: account for overbooking a venue on the same date and time
      console.log(`In addEvent(args):server/Schemas/resolvers.js 79: ${JSON.stringify(args)}`)
      const event = await Event.create(args);

      return event;
    },
    addUser: async (parent, args) => {
      
      const user = await User.create(args);
      
      const token = signToken(user);
      // const token = "todo create user token";

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
      // return { user };
    },
    addTicket: async (parent, args) => {
      const ticket =  await Ticket.create({status: 'new', eventId: args.eventId});
      console.log(ticket)
      
      return ticket;
    },
  },
};

module.exports = resolvers;
