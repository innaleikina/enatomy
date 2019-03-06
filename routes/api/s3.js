// //const router = require("express").Router();
const aws= require('aws-sdk');
const config = require("../../config.json");


(async function(){

    try {
        aws.config.setPromisesDependency();
      aws.config.update({
          accessKeyId: config.aws.accessKey,
          secretAccessKey: config.aws.secretKey,
          region: "us-east-1"
      });

      const s3 = new aws.S3();
      const response  = await s3.listObjectsV2({
          Bucket: 'enatomy'
      }).promise();

      console.log(response);

    } catch (e){
        console.log("error", e );
    }
})();

// var AWS = require('aws-sdk');
// AWS.config.update(
//   {
//     accessKeyId: config.aws.accessKey,
//     secretAccessKey: config.aws.secretKey,
//   }
// );
// var s3 = new AWS.S3();
// s3.getObject(
//   { Bucket: "enatomy", Key: "_MG_0131_web_e.jpg" },
//   function (error, data) {
//     if (error != null) {
//       console.log("Failed to retrieve an object: " + error);
//     } else {
//       console.log("Loaded " + data.ContentLength + " bytes");
//       // do something with data.Body
//     }
//   }
// );