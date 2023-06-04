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


    checkout: async (parent, args, context) => {

      //Takes In: array of event IDs
     
        // must swap when deployed
        //let url = new URL(context.headers.referer).origin;
        let url = new URL (`http://localhost:3000`);
        console.log(`URL is ${url}`)
  
        //args.products is a array of product ids
  
       // helper function to crate an Order Object
       const order = await createOrder(args)
      
  
        let line_items = [];
        // Pull data from the DB to pass to stripe
        // right now we only have IDs or the exceptio for allOther the entire object b/c it was passed as object
        // populate the remaing object by looking them up by ID
        // Take the Order loops over each bin, puts each colorObject, addOnOBject, PackageObject, Cities,Object into sortes arrays
        let { events } = await order
          .populate('events')
          .execPopulate();
        // merge the sorted array of Objects with all CartItem data into one large Array that Stripe can use
        // We have to do this b/c all we get are ID's and need to build the rest of the Object by using .populate function above
        // to pull the data from the DB
        const allProducts = [events]
        
        // for each productObject build stripe object
        // Stripe only cares about prices, name ofitem, description of item, image
        for  ( key  in allProducts){
          arrayOfObjects = allProducts[key]
          for (let i = 0; i < arrayOfObjects.length; i++) {
            const product = await stripe.products.create({
              name: arrayOfObjects[i].title,
              description: arrayOfObjects[i].date,
              //images: [`${url}/images/${arrayOfObjects[i].image}`]
            });
    
            const price = await stripe.prices.create({
              product: product._id,
              unit_amount: arrayOfObjects[i].ticketPrice
              * 100,
              currency: 'usd',
            });
            
            line_items.push({
              price: price.id,
              quantity: 1
            });
          }
  
  
        }
  
       
        // create unqiue cart session with all products
        // the products are actually the line_items
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'], // allow car payment
          line_items, // our products
          mode: 'payment',
          shipping_address_collection: { // allow stripe to ask for shipping address
            allowed_countries: ['US', 'CA'],
          },
          // where to redirect after success
          success_url: `${url}success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${url}` // where to redirect if user clicks back button 
        });
  
        return { session: session.id };
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
    addEvent: async (parent, args, context) => {
      // ToDo: does a user need to be logged in to make event?
      //ToDo: account for overbooking a venue on the same date and time
      const event = await Event.create({...args, owner: context.user._id});

      return event;
    },// END addEvent
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
    addTicket: async (parent, args, context) => {
      
      const ticket =  await Ticket.create({status: 'new', eventId: args.eventId});
      console.log(ticket)
      
      return ticket;
    },
  },
};

module.exports = resolvers;
