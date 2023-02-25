import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from "../../utils/queries";

import EventCard from "./EventListStyles";

import dummyImg from "./pexels-thibault-trillet-167636.jpg";

/**
 * using apollo library to connect to backend localhost
 * using React Hook useQuery to call backend route of GET all events (query)
 */
const EventList = () => {
  const { loading, data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];
  //console.log(events);

  return (
    <div>
      <h3>Current Events</h3>
      {events &&
        events.map((event) => (
          <EventCard key={event._id}>
            <img src={dummyImg} alt="Event image" />
            <h2>{event.title}</h2>
            <h4>Hosted by: {event.hostName}</h4>
            <h4>Date: {event.eventDate}</h4>
            <h4>Starting time: {event.time}</h4>
            <h4>
              Address:
              {event.streetAddress}, {event.city}, {event.postalCode}
            </h4>
            <p>{event.description}</p>
            <h4>Price: {event.ticketPrice}</h4>
            <h6>Number of tickets left: {event.capacitySize}</h6>

            <button>Buy Now</button>
          </EventCard>
        ))}
    </div>
  );
};
export default EventList;
