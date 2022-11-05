import React from "react";

function TicketModal({ currentTicket }) {
  const { ticketID, status, time, eventName, location, quantity } =
    currentTicket;
  return (
    <div>
      <div>
        <h1 className="modalTitle">Ticket Details for ticket {ticketID}</h1>
        <div>
          <span>Event</span>
          <span>{eventName}</span>
        </div>
        <div>
          <span>Time and Location</span>
          <span>
            {time}, {location}
          </span>
        </div>
        <div>
          <span>Status</span>
          <span>{status}</span>
        </div>
        <div>
          <span>Quantity</span>
          <span>{quantity}</span>
        </div>

        <button type="button">Close</button>
      </div>
    </div>
  );
}
export default TicketModal;
