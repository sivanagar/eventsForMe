import React, {useEffect,useState} from 'react';
import EventList from "../EventList/EventList";
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import { Link } from "react-router-dom";
import {QUERY_EVENTS} from '../../utils/queries'; //ToDo: import QUERY_ME

const Dashboard = () => {
  const loggedIn = Auth.loggedIn();
  // ToDo: implete QUERY_ME
  //const { data: userData, error2 } =  useQuery(QUERY_ME);
  const { loading, error1, data, refetch } = useQuery(QUERY_EVENTS );

  const events = data?.events || []; // assign events data returned to variable
  //if (error1 || error2)
  if(error1)
    throw new Error ("Error in graph ql : " + error1)
    //throw new Error ("Error in graph ql : " + error1 + error2)

  return (
    <div>
      {loading ?   (
                <div>Loading...</div>
            ) : (
                <EventList
                    events={events}
                    refetch={refetch}
                />
            )}
    </div>
  );
};

export default Dashboard;
