import React from "react";

const SingleEvent = (props) => {
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            Username
          </span>{" "}
          event on createdAt
        </p>
        <div className="card-body">
          <p>Event Text</p>
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;
