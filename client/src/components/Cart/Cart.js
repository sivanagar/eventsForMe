import React, { useEffect, useState, useRef } from 'react';
//import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import spinner from '../../assets/spinner.gif';
import './style.css';


import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

require('dotenv').config();



//const STRIPE_PUB = `${process.env.REACT_APP_STRIPE_KEY}`
//const stripePromise = loadStripe(`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`);

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


  const isInitialRender = useRef(true);
  const [state, dispatch] = useStoreContext();
  const [stripeCart, setStripeCart] = useState();
  const [getCheckout, { data, loading }] = useLazyQuery(QUERY_CHECKOUT
    , { fetchPolicy: 'no-cache' });
  // const data = eventsInCart
  // const loading = false

  // useEffect(() => {


  // }, [data, getCheckout]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, events: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  const formatDate = (date, type) => {
    let theDate = "No date Loaded yet."
    if (date) {
      const dateObj = new Date(parseInt(date));
      theDate = dateObj
      if (type === "Date")
        theDate = dateObj.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',

        });
      else
      
      theDate = dateObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });

    }
    return theDate
  }

  // function calculateTotal() {
  //   let sum = 0;
  //   state.cart.forEach((item) => {
  //     if (item.price > 0.0)
  //       sum += item.price * item.purchaseQuantity;
  //     if (item.price < 0.0)
  //       sum += item.price * item.purchaseQuantity;
  //   });
  //   return sum.toFixed(2);
  // }

  // const submitCheckout =   async () => {
  //   const productIds = [];
  //   const tags =[];
  //   //const uniqueCartItems = []
  //   //console.log(`in Cart index.js:submitCheckout state.cart ${JSON.stringify(state.cart)}`)

  //   state.cart.forEach((item) => {
  //     //if(item.tag === "date" || item.tag==="add-on-credit")
  //     let tempTag = item.tag
  //     if(tempTag!== "add-on" && tempTag!==  "package"  && tempTag!==  "color" && tempTag!==  "city")
  //     {
  //       productIds.push(JSON.stringify(item))
  //       tags.push(item.tag)
  //     }
  //     else
  //     for (let i = 0; i < item.purchaseQuantity; i++) {
  //       tags.push(item.tag);
  //       productIds.push(item._id);
  //     }
  //   });

  //  let temp = await getCheckout({
  //     variables: { events: eventIds  },
  //   })

  //   return temp
  // }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  return (
    <div className="cart">

      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {(loading) ? <img src={spinner} alt="loading" /> : null}
      {state.cart.length ? (
        <div>
          <div className="flex-row space-between">
            {/* <strong>Total: ${calculateTotal()}</strong> */}


          </div>
          {state.cart.map((item) => (

            <Card sx={{ minWidth: 275 }}>

              <CardContent>
                <Typography variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {formatDate(item.when, "Date")}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {formatDate(item.when, "Time")}
                </Typography>
                <Typography variant="body2">
                  Price: {item.ticketPrice}
                  <br />
                  Number of Tickets: {item.purchaseQuantity}
                  <br />
                  Total: {item.totalPrice}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Go to payment</Button>
              </CardActions>
            </Card>
          ))}


        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}

    </div>
  );
};

export default Cart;
