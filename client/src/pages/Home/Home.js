import React from "react";
import Button from "@mui/material/Button";
import FileUpload from "../../components/FileUpload";
import CreateEvent from "../CreateEvent/CreateEvent";
import Auth from '../../utils/auth';

const Home = () => {
  return (
    <div>
        <a href="/sign-up" >
        <Button variant="outlined">SIGN UP</Button>
        </a> 
    {Auth.loggedIn() ? <CreateEvent/> : "" }

    </div>
  );
};

export default Home;
