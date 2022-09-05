import React from "react";
import Button from "@mui/material/Button"

const Home = () => {
  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">{/* PRINT LIST */}</div>
        <Button variant="outlined">Test Material UI Button</Button>

      </div>
    </main>
  );
};

export default Home;
