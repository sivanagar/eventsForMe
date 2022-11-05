import React, { useState } from "react";
import { myTicketsSeed } from "./MyTicketsSeed";

import TicketModal from "../TicketModal";

const MyTickets = () => {
  return (
    <div>
      <div className="flex-row">
        <h3>My Tickets</h3>
        <table>
          <tr>
            <th>Event</th>
            <th>Time</th>
            <th>Quantity</th>
          </tr>
        </table>
        {myTicketsSeed.map(({ eventName, time, location, quantity }) => (
          <table key={eventName}>
            <tr>
              <td>{eventName}</td>
              <td>
                {time}, {location}
              </td>
              <td>{quantity}</td>
            </tr>
          </table>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;
