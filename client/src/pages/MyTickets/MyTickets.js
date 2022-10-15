import React from "react";
import { myTicketsSeed } from "./MyTicketsSeed";

//TODO: mobile first design - use modal instead for the detailed information from the current page
//TODO: make a table page for tickets that were past today's date
const payloadList = myTicketsSeed.map(
  ({ ticketID, status, time, event, location, quantity }) => {
    return (
      <div>
        <table>
          <tr>
            <td>{ticketID}</td>
            <td>{status}</td>
            <td>{time}</td>
            <td>{event}</td>
            <td>{location}</td>
            <td>{quantity}</td>
          </tr>
        </table>
      </div>
    );
  }
);

export const MyTickets = () => {
  return (
    <div>
      <h3>My Tickets</h3>
      <table>
        <tr>
          <th>TicketID</th>
          <th>Status</th>
          <th>Time</th>
          <th>Event</th>
          <th>Location</th>
          <th>Quantity</th>
        </tr>
      </table>
      {payloadList}
      <h6>
        <a href="/create-event" target="_blank">
          See past tickets
        </a>
      </h6>
    </div>
  );
};

// const MyTickets = () => {
//     return (
//         <div>
//             <h3>My Tickets</h3>
//             <table>
//                 <tr>
//                     <th>TicketID</th>
//                     <th>Status</th>
//                     <th>Time</th>
//                     <th>Event</th>
//                     <th>Location</th>
//                     <th>Quantity</th>
//                 </tr>
//                 <tr>
//                     <td>00000001</td>
//                     <td>Incomplete</td>
//                     <td>2022-11-19, 8pm PST</td>
//                     <td>Born Pink World Tour</td>
//                     <td>Los Angeles, CA</td>
//                     <td>2</td>
//                 </tr>
//                 <tr>
//                     <td>00000002</td>
//                     <td>Purchased</td>
//                     <td>2022-11-20, 8pm PST</td>
//                     <td>Born Pink World Tour</td>
//                     <td>Los Angeles, CA</td>
//                     <td>6</td>
//                 </tr>
//             </table>
//             <h6><a href="/create-event" target="_blank">See past tickets</a></h6>
//         </div>

//     );
// }
