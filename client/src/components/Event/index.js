import React, { useRef, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import EventCard from "../EventCard";
import { useQuery } from '@apollo/client';
import { QUERY_EVENT_BY_ID } from '../../utils/queries'; //ToDo: import QUERY_ME
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_CART_QUANTITY, ADD_TO_CART } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

const Event = () => {
  const [state, dispatch] = useStoreContext();
  const [quantSelected, setQuantSelected] = useState(0);
  const params = useParams();

  const { _id } = params
  const { loading, error1, data, refetch } = useQuery(QUERY_EVENT_BY_ID, {
    variables: { _id },
  });

  
  const event = data?.eventById || []; // assign events data returned to variable
  //if (error1 || error2)
  if (error1)
    throw new Error("Error in graph ql : " + error1)
  //throw new Error ("Error in graph ql : " + error1 + error2)


  // Fetch event details using the eventId or perform any other logic

  const optionsQuantity = Array.from({ length: event.capacity + 1 }, (_, index) => ({
    label: index,
    value: `${index}`
  }));

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    console.log(`check quantitySeelcted  ${parseInt(quantSelected)} | typeOf : ${typeof(quantSelected)}`)
    if (itemInCart) { // if item in cart update cart quantity only
      dispatch({ //update Global State
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + parseInt(quantSelected)
      }); // Update local storage
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + parseInt(quantSelected)
      });
    } else {
      dispatch({ // else add new item to cart
        type: ADD_TO_CART,
        event: { ...event, purchaseQuantity: parseInt(quantSelected) }
      });
      // also update local storage
      idbPromise('cart', 'put', { ...event, purchaseQuantity: parseInt(quantSelected) });
    }
  }

  const handleSetQuantity = ( e) => {
    
    setQuantSelected(e.value)
  }


  return (
    <div>
      Event ID: {_id}
      {loading ? (
        <div>Loading...</div>
      ) : (

        <EventCard
          Key={_id}
          event={event}
          eventID={_id}
        />
      )}
      <Creatable
        onChange={handleSetQuantity}
        options={optionsQuantity}
      />
      <button onClick={addToCart}>
        Add to Cart
      </button>
      {JSON.stringify(state.cart)}


    </div>

  )
};

export default Event;