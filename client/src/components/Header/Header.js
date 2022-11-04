import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <a href="/">
          <h1>Events For Me</h1>
        </a>
        <nav>
          <Link to="sign-up">Sign Up</Link>
          <Link to="login">Login</Link>

          <Link to="dashboard">Dashboard</Link>
          <Link to="create-event">Create Event</Link>
          <Link to="my-tickets">My Tickets</Link>
          <Link to="account">Account Details</Link>
          <Link to="/">Log Out</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
