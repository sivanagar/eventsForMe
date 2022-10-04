import React from "react";
import dummy from "./pexels-thibault-trillet-167636.jpg";
import EventCard from "./EventListStyles";

import { resultSeed } from "./EventListSeed";

const payloadList = resultSeed.map(
  ({
    eventTitle,
    date,
    time,
    address,
    city,
    postalCode,
    description,
    price,
  }) => {
    return (
      <EventCard>
        <img src={dummy} alt="" />

        <h2>{eventTitle}</h2>
        <h4>{date}</h4>
        <h4>{time}</h4>
        <h4>
          {address}, {city}
        </h4>

        <p>{description}</p>
        <h4>{price}</h4>
        <button>Buy Now</button>
      </EventCard>
    );
  }
);

export const EventList = () => {
  return <div>{payloadList}</div>;
};
