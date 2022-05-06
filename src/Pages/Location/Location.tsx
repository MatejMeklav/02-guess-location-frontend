import React from 'react';
import ReactS3Client from 'react-aws-s3-typescript';



export default function Location() {

  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME || '',
    region: process.env.REACT_APP_REGION || '',
    accessKeyId: process.env.REACT_APP_ACCESS_ID || '',
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY || '',
  }
  const s3 = new ReactS3Client(config);

  try {
    const fileList = s3.listFiles();

    console.log(fileList);
    /*
    * {
    *   Response: {
    *     message: "Objects listed succesfully",
    *     data: {                   // List of Objects
    *       ...                     // Meta data
    *       Contents: []            // Array of objects in the bucket
    *     }
    *   }
    * }
    */
} catch (exception) {
    console.log(exception);
    /* handle the exception */
}
  return (
    <div>Location</div>
  )
}



  
