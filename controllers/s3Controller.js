const aws= require('aws-sdk');
const config = require("../config.json");
let fileNames = [{"this is not an empty array":"no it is not"}];

module.exports = {
  allFileNames:function (req, res) {
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
        //   console.log(response);
          //logs the keys for file names to be used in urls
          for(var i =0; i < response.Contents.length; i++ ){
            console.log("this is the looped file names " + response.Contents[i].Key);
            var obj = {}
            obj["filename"] = response.Contents[i].Key
            fileNames.push(obj)
            res.json(fileNames)
        }   
          } catch (e){
            console.log("error", e );
        }
    })()
    
    //   .then(fileNames => res.json(fileNames))
      .catch(err => res.status(422).json(err));
  },
  test:function(req,res){
      res.json({"test":"yep this is a simple route"})
  }




}