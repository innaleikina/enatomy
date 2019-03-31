const router = require("express").Router();
const aws= require('aws-sdk');
const config = require("../../config.json");
const s3Controller = require("../../controllers/s3Controller");

const s3 = new aws.S3()


//allows user to access the image for 20 seconds and then expires! yay
var params = {Bucket:config.aws.bucket, Key: config.aws.key, Expires: 20}
s3.getSignedUrl('getObject', params, function (err, url) {
console.log('Signed URL: ' + url);
});


router.route("/getfiles/")
  .get(s3Controller.allFileNames);

  router.route("/test")
  .get(s3Controller.test);

module.exports = router;