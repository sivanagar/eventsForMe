import React, {useRef,useState} from 'react';
import { uploadFile } from 'aws-sdk';
//require('dotenv').config()


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
})
const myBucket = new AWS.S3({
  params: { Bucket: config.bucketName},
  region: config.region,
})

function FileUpload(props) {
  
  const [progress , setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [eventResponse, setEventResponse] = useState(null);

  const handleFileInput = (e) => {
      setSelectedFile(e.target.files[0]);
  }

  const uploadFile = (_fileObject, _DirName) => {

    const formatFileName = _fileObjectB => {
      let tempName = ""
      tempName = `${_fileObjectB.name}_${(new Date().toJSON())}`
      return tempName
    }

    const uniqueFileName = formatFileName(_fileObject)

      const params = {
          ACL: 'public-read',
          Body: _fileObject,
          Bucket: config.bucketName,
          // if for debugging purposes we want to override the dirName, we can pass the directory name 
          // as a config variable
          //Key: `${config.dirName  }\\${uniqueFileName}`,
          Key: `${_DirName  }\\${uniqueFileName}`,
          
      };

      myBucket.putObject(params)
          .on('httpUploadProgress', (evt) => {
              setProgress(Math.round((evt.loaded / evt.total) * 100))
          })
          .send((err) => {
              if (err) console.log(err)
          })
  }

  const submitEventHelper = async (event) => {
    // submit event
    event.preventDefault();
    
    try {
      const tempData = await props.ParrentHandleFormSubmit()
      
      if(tempData){ // if the event submitted sucesfully
        setEventResponse(tempData)
        const  dirName2 = tempData.addEvent._id   // recieve a nested object like {addEvent : {_id:123, name: "some string"}}
        // destructure only the data we care about the id
        
      
        if (selectedFile) // if we suscesfully selected a file, submit the file
          uploadFile(selectedFile, dirName2) // upload the file to aws using the event id as a directory name

      }
      // ToDo Determine else clause when the event fails to submit
      
    }
    catch (e){
      console.log(`Custom error: ${e}`)
      console.error(e)

    }

    // Upload img
  }


  return <div>
      <div>Native SDK File Upload Progress is {progress}%</div>
      <input type="file" onChange={handleFileInput}/>
      <button  onClick={ submitEventHelper }> Submit Event &#38; Photo</button>

  </div>
}

export default FileUpload;

// uploadFile(selectedFile) ;  props.ParrentHandleFormSubmit().then(eventData => {console.log(JSON.stringify(eventData))}).catch(error=> {console.log(`custom error ${error}`)}) ; console.log("Event Submitted ")
//uploadFile(selectedFile) ; props.ParrentHandleFormSubmit(props.ParrentformState)
