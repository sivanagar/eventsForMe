import React, { useState } from "react";
//TODO
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import  TextField  from "@mui/material/TextField/TextField";

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
              <br />
        <label>Event Date and Time</label>
        <br />
        <br />
        <TextField
        id="date"
        label="Event Date"
        type="date"
        defaultValue=""
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <br />
      <br />
      <TextField
        id="timeStart"
        label="Event Start"
        type="time"
        defaultValue="07:30"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
      />
      <br />
      <br />
        <label>Event Address</label>
        <input
          className="form-input"
          name="event-street-address"
          type="input"
          id="event-street-address"
          value={formState.input}
          onChange={handleChange}
        />
        <label>Event City</label>
                <input
          className="form-input"
          name="event-city"
          type="input"
          id="event-city"
          value={formState.input}
          onChange={handleChange}
        />
        <label>Event Postal Code</label>
                        <input
          className="form-input"
          name="event-postal-code"
          type="input"
          id="event-postal-code"
          value={formState.input}
          onChange={handleChange}
        />
        <br />
        <label>Ticket Quantity</label>
        <input
          className="form-input"
          name="ticket-quantity"
          type="number"
          id="ticket-quantity"
          value={formState.number}
          onChange={handleChange}
        />

<label>Ticket Price</label>
        <input
          className="form-input"
          name="ticket-price"
          type="number"
          id="ticket-price"
          placeholder="$0.00"
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
      <br />
    </div>
    </LocalizationProvider>
  );
};

export default Signup;