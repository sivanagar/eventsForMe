import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const eventsInCart = [
  {
    title: "Coachella",
    date: "2023-04-16",
    time: "2pm",
    ticketPrice: 0,
    numberOfTickets: 2,
    totalPrice: 0,
  },
  {
    title: "Coachella 2",
    date: "2023-04-23",
    time: "8pm",
    ticketPrice: 0,
    numberOfTickets: 10,
    totalPrice: 0,
  },
];

const Cart = () => {
  return (
    <div>
      <h2>Cart</h2>
      <div>
        {eventsInCart.map((event) => {
          const {
            title,
            date,
            time,
            ticketPrice,
            numberOfTickets,
            totalPrice,
          } = event;
          return (
            <>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {date}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {time}
                  </Typography>
                  <Typography variant="body2">
                    Price: {ticketPrice}
                    <br />
                    Number of Tickets: {numberOfTickets}
                    <br />
                    Total: {totalPrice}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Go to payment</Button>
                </CardActions>
              </Card>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
