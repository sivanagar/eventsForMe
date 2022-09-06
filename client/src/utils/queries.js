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
