const config = require("../config.json");
// const stripe = require("stripe")(config.stripe.secretKey);


module.exports = {
  //payment method is set up in the server.js for now
  test:function(req,res){
    res.json({"test":"yep this is a simple route"})
 }
}

  