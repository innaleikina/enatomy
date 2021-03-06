const aws= require('aws-sdk');
// const ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY
// const SECRET_KEY = process.env.REACT_APP_AWS_SECRET_KEY
// const AWS_BUCKET = process.env.REACT_APP_AWS_BUCKET
require('dotenv').config()


let fileNames = [];

module.exports = {
  allFileNames:function (req, res) {

    (async function(){
   
        try {
            aws.config.setPromisesDependency();
            aws.config.update({
              accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
              secretAccessKey:  process.env.REACT_APP_AWS_SECRET_KEY,
              region: "us-east-1"
          });
    
          const s3 = new aws.S3();
          const response  = await s3.listObjectsV2({
              Bucket: 'enatomy'
          }).promise();
          //this is the file form s3 bucket
          // console.log("got all files from s3!");
          //logs the keys for file names to be used in urls
          for(var i =0; i < response.Contents.length; i++ ){
          //  console.log("this is the looped file names " + response.Contents[i].Key);
            var obj = {}
            obj["filename"] = response.Contents[i].Key
            fileNames.push(obj)
            //res.json(fileNames)
        }   
        // console.log("________");


          } catch (e){
            console.log("error", e );
            console.log(process.env.REACT_APP_AWS_ACCESS_KEY)
           

        }
    })()
    
    .then(
        res.json(fileNames),fileNames = [])
    .catch(err => res.status(422).json(err));
  },
  download: function(req,res){
    aws.config.setPromisesDependency();
    aws.config.update({
      accessKeyId:  process.env.REACT_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
      region: "us-east-1"
  });
     const s3 = new aws.S3();
      var params = {
        Bucket:process.env.REACT_APP_AWS_BUCKET, 
        Key: req.params.setname + "zip", 
        Expires: 60}
      s3.getSignedUrl('getObject', params, function (err, url) {
      console.log('Signed URL: ' + url);
      res.json(url)
      })
    },
  test:function(req,res){
      res.json({"test":"yep this is a simple route"})
  }
}