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
    hello: String
    events: [Event]
    userById(_id: String!): User
    eventById(_id: String!): Event
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addEvent(title: String!, address: String!, description: String!, owner: String!, capacity: Int!, when: String!): Event
    updateEvent(_id: String!, title: String!, address: String!, description: String!, owner: String!, capacity: Int!, when: String!): Event
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
