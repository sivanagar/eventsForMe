import React from "react";

function TicketModal({ currentTicket, onClose }) {
  const { ticketID, status, time, eventName, location, quantity } =
    currentTicket;

  return (
    <div className="modalBackdrop">
      <div className="modalContainer">
        <h1 className="modalTitle">Ticket Details for ticket ID: {ticketID}</h1>
        <div className="modalRow">
          <span>Event: </span>
          <span>{eventName}</span>
        </div>
        <div className="modalRow">
          <span>Time and Location: </span>
          <span>
            {time}, {location}
          </span>
        </div>
        <div className="modalRow">
          <span>Status: </span>
          <span>{status}</span>
        </div>
        <div className="modalRow">
          <span>Quantity: </span>
          <span>{quantity}</span>
        </div>

        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
export default TicketModal;
