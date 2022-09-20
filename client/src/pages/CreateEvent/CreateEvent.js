import React, { useState } from "react";
//TODO
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h3>Create Event</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Event Title</label>
        <input
          className="form-input"
          name="event-title"
          type="input"
          id="event-title"
          value={formState.input}
          onChange={handleChange}
        />
        <label>Event Date and Time</label>
        //TODO Datepicker
        <label>Event Location</label>
        <input
          className="form-input"
          name="event-location"
          type="input"
          id="event-location"
          value={formState.input}
          onChange={handleChange}
        />
        <label>Ticket Quantity</label>
        <input
          className="form-input"
          name="ticket-quantity"
          type="number"
          id="ticket-quantity"
          value={formState.number}
          onChange={handleChange}
        />
        <label>Description</label>
        <textarea
          className="form-input"
          name="description"
          type="input"
          id="description"
          value={formState.input}
          onChange={handleChange}
        ></textarea>
        <button className="btn d-block w-100" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
