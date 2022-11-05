import React, { useState } from "react";
import { myTicketsSeed } from "./MyTicketsSeed";

import TicketModal from "../TicketModal";

const MyTickets = () => {
  return (
    <div>
      <div className="flex-row">
        <div className="col-12">
          <h3>My Tickets</h3>
        </div>
        <div className="col-12 flex-row">
          <table className="col-12 justify-space-between">
            <tr>
              <th>Event</th>
              <th>Time and Location</th>
              <th>Quantity</th>
            </tr>
          </table>
        </div>
        <div className="col-12 flex-row">
          {myTicketsSeed.map(({ eventName, time, location, quantity }) => (
            <table key={eventName} className="col-12 justify-flex-start">
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
    </div>
  );
};

export default MyTickets;
