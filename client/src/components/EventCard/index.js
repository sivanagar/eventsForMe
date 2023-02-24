import React, { useRef, useState, useEffect } from 'react';

//import dummy from "./pexels-thibault-trillet-167636.jpg";
import { useQuery, useMutation } from "@apollo/client";
//ToDo: implement picture download
//import FileDownload from "../FileDownload";
import FileDownload from '../FileDownload';


var AWS = require("aws-sdk");

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  dirName: process.env.REACT_APP_DIR_NAME /* optional */,
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY
};

AWS.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey
});


const EventCard = ({eventID, event} ) => {
let [fileNames, setFileNames] = useState(["empty", "empty"])
  const handleDownload = (_id) => {
    const s3 = new AWS.S3();

    const params = {
      Bucket: config.bucketName,
      //Delimiter: `/`,
      Prefix: _id
      
    }

    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {

        //console.log(data.Contents);
        setFileNames(data.Contents)
        return data.Contents
      }
    });

  }

  useEffect(() => {
    if(event._id){
        handleDownload(event._id)
    }
   
  }, [])

  if (!eventID ) {
    return <h3>No Picture Loaded yet</h3>;
  }



  return (
    <div>
      
        
          
          {/* <img src={dummy} alt="" /> */}
        {fileNames && fileNames.map(aFileObject => (
            
           (
           
            
           <FileDownload
            key={aFileObject.Key}
            prefixAndName={aFileObject.Key}
             />)
        ) )}

          <h2>{event.eventTitle}</h2>
          
          <h4>{event.date}</h4>
          <h4>{event.time}</h4>
          <h4>
            {event.address}, {event.city}
          </h4>

          <p>{event.description}</p>
          <h4>{event.price}</h4>
          <button>Buy Now</button>
        
      



    </div>
  )

};


export default EventCard;
