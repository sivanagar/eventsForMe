// import the gql tagged template function
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id:ID
    username: String
    email: String
    events: [Event]
  }
  type Auth {
    token: ID
    user: User
  }

  type Ticket {
    _id: ID
    status: String
    boughtBy: String
    eventId: String
  }
  
  type Event {
    _id: ID
    title: String
    address: String
    description: String
    owner: String
    capacity: Int
    when: String
   
    
  }

  type Query {
    me: User
    events: [Event]
    users: [User]
    userById(_id: String!): User
    eventById(_id: String!): Event
    tickets: [Ticket]
    ticketById(_id: String!): Ticket
    ticketsByEventId(eventId: String): [Ticket]

  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addEvent(title: String!, address: String!, description: String!, owner: String!, capacity: Int!, when: String!): Event
    updateEvent(_id: String!, title: String!, address: String!, description: String!, owner: String!, capacity: Int!, when: String!): Event
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addTicket(eventId: String!): Ticket
  }
`;

module.exports = typeDefs;
