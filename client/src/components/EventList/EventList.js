import React, { useState } from "react";
import dummy from "./pexels-thibault-trillet-167636.jpg";
import { useQuery, useMutation } from "@apollo/client";
//ToDo: implement picture download
//import FileDownload from "../FileDownload";
import EventCard from "./EventListStyles";

//import { resultSeed } from "./EventListSeed";

const EventList = ({events, refetch }) => {
  if (!events || !events.length) {
    return <h3>No Events Yet</h3>;
  }
    return (
      <div>
      {events && events.map((event) => (
        <EventCard>
        <img src={dummy} alt="" />

        <h2>{event.eventTitle}</h2>
        <h4>{event.date}</h4>
        <h4>{event.time}</h4>
        <h4>
          {event.address}, {event.city}
        </h4>

        <p>{event.description}</p>
        <h4>{event.price}</h4>
        <button>Buy Now</button>
      </EventCard>
      ))}
      
      
    
      </div>
    )
      
  };


export default EventList;
