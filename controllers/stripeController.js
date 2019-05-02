const config = require("../config.json");
const stripe = require("stripe")(config.stripe.secretKey);


module.exports = {
     stripePayment:function (req, res) {
       (async function(){
            try {
                let {status} = await stripe.charges.create({
                  amount: 2000,
                  currency: "usd",
                  description: "An example charge",
                  source: req.body
                });
            
                res.json({status});
              } catch (err) {
                res.status(500).end();
             }
        })()
   },
  test:function(req,res){
    res.json({"test":"yep this is a simple route"})
 }
}

  