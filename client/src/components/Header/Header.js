import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";


import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { useStoreContext } from '../../utils/GlobalState';
import Cart from '../Cart/Cart'

const Header = () => {
  /*for log out kill session*/

  // const [state, dispatch] = useStoreContext();
  // useEffect(() => {
  //   async function getCart() {
  //     const cart = await idbPromise('cart', 'get');
  //     console.log(`in Header.js:getCart ${JSON.stringify(cart)}`)
  //     dispatch({ type: ADD_MULTIPLE_TO_CART, events: [...cart] });
  //   }
  
  //   if (!state.cart.length) {
  //     getCart();
  //   }
  // }, [state.cart.length, dispatch]);
  



  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };


  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <a href="/">
          <h1>Events For Me</h1>
        </a>
        <nav>
          {Auth.loggedIn() ? (
            <>
               
              <Link to="cart">🛒Cart</Link>
              <a href="/dashboard">Dashboard</a>
              <Link to="create-event">Create Event</Link>
              <Link to="my-tickets">My Tickets</Link>
              <Link to="account">Account Details</Link>
              <a href="/" onClick={logout}>
                Log Out
              </a>
              <Cart/>
            </>
          ) : (
            <>
              <Link to="sign-up">Sign Up</Link>
              <Link to="login">Login</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
