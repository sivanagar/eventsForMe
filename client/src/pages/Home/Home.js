import React from "react";
import Button from "@mui/material/Button";
import FileUpload from "../../components/FileUpload";
import CreateEvent from "../CreateEvent/CreateEvent";
import Auth from "../../utils/auth";

const Home = () => {
  const loggedIn = Auth.loggedIn();
  return (
    <div>
      <a href="/sign-up">
        {loggedIn ? null : <Button variant="outlined">SIGN UP</Button>}
      </a>
      {loggedIn ? <CreateEvent /> : ""}
    </div>
  );
};

export default Home;
