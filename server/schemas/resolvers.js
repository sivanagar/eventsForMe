const { AuthenticationError } = require('apollo-server-express');
const { User, Event} = require('../models');
const resolvers = {
  Query: {
    hello: () => {
      return "Hello!";
    },
    events: async (parent, args, context) => {
      const events = await Event.find();
      if(!events) // if no events
        throw new Error('No Events exist yet');
      return events
    },
  },
  Mutation : {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      //const correctPw = await user.isCorrectPassword(password);

      // if (!correctPw) {
      //   throw new AuthenticationError('Incorrect credentials');
      // }

      //const token = signToken(user);

      //return { token, user };
      return { user };
    },
  }
};

module.exports = resolvers;
