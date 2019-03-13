const router = require("express").Router();
const aws= require('aws-sdk');
const config = require("../../config.json");
// var photoNames = [];

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
      //logs the keys for file names to be used in urls
      for(var i =0; i < response.Contents.length; i++ ){
        console.log(response.Contents[i].Key);
        // photoNames.push(response.Contents[i].Key);
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

// router.route('/thumbnails').post(photoNames);

// module.exports = router;