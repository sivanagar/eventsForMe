// import the gql tagged template function
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id:ID
    username: String
    email: String
    events: [Event]
  }

  type Event {
    _id: ID
    title: String
    address: String
    description: String
    owner: String
    capacity: Int
    
  }

  type Query {
    hello: String
  }
`;

module.exports = typeDefs;
