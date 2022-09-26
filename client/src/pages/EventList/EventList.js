import React from "react";
import dummy from "./pexels-thibault-trillet-167636.jpg"
import EventCard from "./EventListStyles"

const EventList = () => {


  return (
    
  <EventCard>
    <img src={dummy} alt="" />
    <h2>My Band</h2>
    <h4>9/20/2023</h4>
    <h4>7:00 pm</h4>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
    <h4>$150</h4>
    <button>Buy Now</button>
  </EventCard>
  
  );
};

export default EventList;
