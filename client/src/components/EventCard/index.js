import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//import dummy from "./pexels-thibault-trillet-167636.jpg";
import { useQuery, useMutation } from "@apollo/client";
//ToDo: implement picture download
//import FileDownload from "../FileDownload";
import FileDownload from "../FileDownload";

var AWS = require("aws-sdk");

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  dirName: process.env.REACT_APP_DIR_NAME /* optional */,
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
};

AWS.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
});

const EventCard = ({ eventID, event }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [redirectBool, setRedirectBool] = useState(false)
  let formatDate = "No date Loaded yet."
  if (event.when) {
    const dateObj = new Date(parseInt(event.when));
    formatDate = dateObj
    formatDate = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      //second: 'numeric',
      hour12: true
    });
  }

  let [fileNames, setFileNames] = useState(["empty", "empty"]);
  const handleDownload = (_id) => {
    const s3 = new AWS.S3();

    const params = {
      Bucket: config.bucketName,
      //Delimiter: `/`,
      Prefix: _id,
    };

    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        //console.log(data.Contents);
        setFileNames(data.Contents);
        return data.Contents;
      }
    });
  };

  useEffect(() => {
    if (event._id) {
      handleDownload(event._id);
    }
  }, []);

  if (!eventID) {
    return <h3>No Picture Loaded yet</h3>;
  }

  const navigateOnClick = () => {

    navigate(`/event/${event._id}`);

  };

  //console.log(event.when);
  return (
    <div>
      {/* <img src={dummy} alt="" /> */}
      {fileNames &&
        fileNames.map((aFileObject) => (
          <FileDownload key={aFileObject.Key} prefixAndName={aFileObject.Key} />
        ))}

      <h2>{event.title}</h2>
      <h4>Hosted by: {event.owner}</h4>
      <h4>Date: {event.when && formatDate}</h4>

      <p>
        Address:
        {event.address}
      </p>

      <p>{event.description}</p>
      <p>currentPath: {currentPath}</p>

      <p>Number of tickets left: {event.capacity}</p>
      {currentPath === "/dashboard"? 
      <button onClick={navigateOnClick}>Buy Now</button> : " " 
      }
      
    </div>
  );
};

export default EventCard;
