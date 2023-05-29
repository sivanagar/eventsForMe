import { useReducer } from "react";
import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  UPDATE_CURRENT_PACKAGE,
  UPDATE_ROUTE,
  UPDATE_PACKAGE_SELECTED,
  UPDATE_CART_ITEM_CATEGORIES,
  UPDATE_TRACK_CHECKOUT,
  UPDATE_CART_ITEM_BYID,
  UPDATE_DATE,
  CLEAR_CART,
  TOGGLE_CART,
  UPDATE_COLOR,
  UPDATE_CART_ITEM_BY_IDCACHE,
  UPDATE_CART_ITEM_BY_TAG,
  UPDATE_COLORS,
  UPDATE_CART_COLORS,
  UPDATE_CITIES,
  UPDATE_PACKAGES,
  UPDATE_VALIDATE_CART_HASH,
  SET_TRACK_CHECKOUT

} from "./actions";
import { idbPromise } from "./helpers";

export const reducer = (state, action) => {
    console.log(`In reducers.js action is  ${JSON.stringify(action)}`)
  switch (action.type) {
   
  
    case ADD_TO_CART:
        
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.event],
      };

    case ADD_MULTIPLE_TO_CART: {
      return {
        ...state,
        cart: [...state.cart, ...action.events],
      };
    }

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map(event => {
            console.log(`in reducers.js:update_cartQuantity event is : ${JSON.stringify(event)}`)
          if (action._id === event._id ) {
            event.purchaseQuantity = action.purchaseQuantity
          }
          return event
        })
      };
    
  
    case UPDATE_CART_ITEM_BYID: {
      // input:  singular object { _idCache : string ,  value : Object} or

      const itemInCart = state.cart.find((cartItem) => cartItem._id === action.object._id)
      if (itemInCart) {
        // if item in cart update item
        return {
          ...state,
          cartOpen: true,
          cart: state.cart.map(product => {
            if (action._id === product._id) {
              product = action.object
              idbPromise('cart', 'put', {
                ...action.object
              });
            }
            return product
          })
        };
      }
      else {
        idbPromise('cart', 'put', {
          ...action.object,
          _id: action.object._id
        });
        return {
          ...state,
          cartOpen: true,
          cart: [...state.cart, action.object]

        };

      }
    };

   

    case REMOVE_FROM_CART: {
      idbPromise('cart', 'delete', { ...action.object });
      let newState = state.cart.filter(product => {
        return product._id !== action._id;
      });
      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      }
    };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: []
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen
      };


    default:
      return state;
  }
};

export function useCartReducer(initialState) {
  return useReducer(reducer, initialState)
}
