import { gql } from "@apollo/client";

export const QUERY_EVENTS = gql`
{
    events {
        title
        address
        description
        owner
        capacity
        when
    }
  }
`;

export const QUERY_USER_BY_ID = gql`
  query userById($_id: String!) {
    userById(_id: $_id) {
      username
      email
      _id
      events {
        
      }
    }
  }
`;

