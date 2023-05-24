import React, { useRef, useState, useEffect  } from "react";
import { useParams } from 'react-router-dom';
import EventCard from "../EventCard";
import { useQuery } from '@apollo/client';
import {QUERY_EVENT_BY_ID} from '../../utils/queries'; //ToDo: import QUERY_ME


const Event = () => {
    const params = useParams();
  
    const {_id} = params
    const { loading, error1, data, refetch } = useQuery(QUERY_EVENT_BY_ID, {
        variables: { _id },
      });
    
    if(data)
        console.log(`data: ${JSON.stringify(data)}`)
    const event = data?.eventById|| []; // assign events data returned to variable
    //if (error1 || error2)
    if(error1)
      throw new Error ("Error in graph ql : " + error1)
      //throw new Error ("Error in graph ql : " + error1 + error2)
  
  
    // Fetch event details using the eventId or perform any other logic
   
    console.log(`******** ${data} `)
    return (
    <div>
        Event ID: {_id}  
        {loading ?   (
                <div>Loading...</div>
            ) : (
                
                <EventCard
                    Key={_id}
                    event={event}
                    eventID={_id}
                />
            )}
    </div>
    
    )
  };

  export default Event;