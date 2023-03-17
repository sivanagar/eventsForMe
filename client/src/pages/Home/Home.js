import React from "react";
import Button from "@mui/material/Button";
import Auth from "../../utils/auth";
import EventList from "../../components/EventList/EventList";
import Dashboard from "../../components/Dashboard/Dashboard";

const Home = () => {
  const loggedIn = Auth.loggedIn();
  return (
    <div>
      <a href="/sign-up">
        {loggedIn ? null : <Button variant="outlined">SIGN UP</Button>}
      </a>
      {loggedIn ? <Dashboard /> : ""}
    </div>
  );
};

export default Home;
