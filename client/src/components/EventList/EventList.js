import React, { useRef, useState, useEffect } from 'react';

import dummy from "./pexels-thibault-trillet-167636.jpg";
import { useQuery, useMutation } from "@apollo/client";
//ToDo: implement picture download
//import FileDownload from "../FileDownload";
import EventCard from '../EventCard'; 
import { json } from 'react-router';

//import { resultSeed } from "./EventListSeed";

const EventList = ({ events, refetch }) => {



  if (!events || !events.length) {
    return <h3>No Events Yet</h3>;
  }



  return (
    <div>
      {events && events.map((event) => (
        <>
          <EventCard
        key={event._id}
        event={event}
        eventID={event._id}
        />
       
        </>
         
      ))}



    </div>
  )

};


export default EventList;
