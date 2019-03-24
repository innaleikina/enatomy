const router = require("express").Router();
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
      //this is the file form s3 bucket
      console.log(response);
      //logs the keys for file names to be used in urls
      for(var i =0; i < response.Contents.length; i++ ){
        console.log("this is the looped file names " + response.Contents[i].Key);
      }
     

    } catch (e){
        console.log("error", e );
    }
})();

const s3 = new aws.S3()


//allows user to access the image for 20 seconds and then expires! yay
var params = {Bucket:config.aws.bucket, Key: config.aws.key, Expires: 20}
s3.getSignedUrl('getObject', params, function (err, url) {
console.log('Signed URL: ' + url);
});



// module.exports = router;