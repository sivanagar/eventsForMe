import React, { Component, useState } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
//import {QUERY_EVENTS} from "../../utils/queries"
import { ADD_EVENT, LOGIN, ADD_USER  } from "../../utils/mutations";
import Auth from '../../utils/auth';
//TODO
import FileUpload from "../../components/FileUpload";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField/TextField";
import { resolveComponentProps } from "@mui/base";

const CreateEvent = () => {
  const [formState, setFormState] = useState({
    event_title: "",
    date: "",
    timeStart: "",
    event_street_address:"",
    event_city:"",
    event_postal_code:"",
    ticket_quantity:0,
    ticket_price:0.01,
    description:""

  });


  const [addEvent, {error}] = useMutation(ADD_EVENT)
  const [login, { error2 }] = useMutation(LOGIN);
  //const { events, loading, error1, data, refetch } = useQuery(QUERY_EVENTS );
  //const [get_events, { loading, error2, data }] = useLazyQuery(QUERY_EVENTS);
  const [addUser, { error3 }] = useMutation(ADD_USER);


  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const testSubmit = async (event) => {
    event.preventDefault();
    try {
      //ToDo Remove overidding of form state
      // const { data } = await addUser({
      //   variables: { email: 'email@email.com', username: 'email@email.com', password: "password" },
      // });
      // Auth.saveInfo(data.addUser.user)
      // Auth.login(data.addUser.token);
      const { data } = await addEvent({
          variables: { 
            owner: "635c089755ef180f20fb8535", 
            capacity: 1, 
            when: "02-02-23",
            title: "hope",
            address: "hope",
            city: "hope",
            description: "hope"
           },
        });

    } catch (e) {
      console.error(e);
    }

  }
 

  const submitFormhelper = async (propsFormState) => {
    //this.preventDefault();
    let tempData
    //ToDo Remove Harcoded Owner
    try {

      // tempData = await addEvent({
      //   variables: { 
      //     //...propsFormState,
      //     // propsFormState.description 
      //     owner: "635c089755ef180f20fb8535", 
      //     capacity: "testB", //propsFormState.quantity, 
      //     when: "testB",//propsFormState.date,
      //     title: "testB", //propsFormState.event_title,
      //     address: "testB", //propsFormState.event_street_address,
      //     city: "testB", //propsFormState.event_city,
      //     description : "testB", //propsFormState.description
      //   }
      // });
      
      const { data } = await addEvent({
        variables: { 
          owner: "635c089755ef180f20fb8535", 
          capacity: 11,//propsFormState.ticket_quantity, 
          when: propsFormState.date,
          title: propsFormState.event_title,
          address: propsFormState.event_street_address,
          city: propsFormState.event_city,
          description: propsFormState.description
         },
      });
      

    } catch (e) {
      console.error("gql myCustom error, front-end create event")
      console.error(e);
    }

  };

   // submit form
   const handleFormSubmit = async (event) => {
    event.preventDefault();
    submitFormhelper(formState)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <h3>Create Event</h3>

        <form >
          <label>Event Title</label>
          <input
            className="form-input"
            name="event_title"
            type="input"
            id="event_title"
            onChange={handleChange}
          />
          <br />
          <label>Event Date and Time</label>
          <br />
          <br />
          <TextField
            id="date"
            name="date"
            label="Event Date"
            type="date"
            defaultValue=""
            sx={{ width: 220 }}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />
          <TextField
            id="timeStart"
            name="timeStart"
            label="Event Start"
            type="time"
            defaultValue="07:30"
            onChange={handleChange}
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
            name="event_street_address"
            type="input"
            id="event_street_address"
            onChange={handleChange}
          />
          <label>Event City</label>
          <input
            className="form-input"
            name="event_city"
            type="input"
            id="event_city"
            onChange={handleChange}
          />
          <label>Event Postal Code</label>
          <input
            className="form-input"
            name="event_postal_code"
            type="input"
            id="event_postal_code"
            onChange={handleChange}
          />
          <br />
          <label>Ticket Quantity</label>
          <input
            className="form-input"
            name="ticket_quantity"
            type="number"
            id="ticket_quantity"
            onChange={handleChange}
          />

          <label>Ticket Price</label>
          <input
            className="form-input"
            name="ticket_price"
            type="number"
            id="ticket_price"
            placeholder="$0.00"
            onChange={handleChange}
          />
          <label>Description</label>
          <textarea
            className="form-input"
            name="description"
            type="input"
            id="description"
            onChange={handleChange}
          ></textarea>
          


        </form>
        <br />
      </div>
      <FileUpload ParrentformState={formState}  ParrentHandleFormSubmit={ () =>{submitFormhelper(formState)}} />
      
    </LocalizationProvider>
  );
};

export default CreateEvent;

// <FileUpload ParrentformState={formState}  ParrentHandleFormSubmit={ () =>{submitFormhelper(formState)}} />

{/* <button className="btn d-block w-100" type="submit">
          Submit
        </button> */}
