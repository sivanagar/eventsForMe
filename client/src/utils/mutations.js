import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
        token
      _id
      email
      username
    }
  }
}
`;

export const ADD_EVENT = gql`
mutation addEvent($title: String!, $address: String!, $description: String!, $owner: String!, $capacity: Int!, $when: String!) {
  addEvent(title: $title, address: $address, description: $description, owner: $owner, capacity: $capacity, when: $when) {
      _id
      title
      address
      description
      owner
      capacity
      when
  
  }
}
`;
export const UPDATE_EVENT = gql`
mutation updateEvent($_id: String!, $title: String!, $address: String!, $description: String!, $owner: String!, $capacity: Int!, $when: String!) {
  updateEvent(_id: $_id, title: $title, address: $address, description: $description, owner: $owner, capacity: $capacity, when: $when) {
      _id
      title
      address
      description
      owner
      capacity
      when
  
  }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    user {
      _id
      email
      username
    }
  }
}
`;