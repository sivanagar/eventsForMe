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
    
  }

  type Query {
    hello: String
    events: [Event]
    userById(_id: String!): User
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
