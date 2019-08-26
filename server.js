const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const passport = require("passport");
const bodyParser = require('body-parser');
// const config = require("./config.json");
 const stripe = require("stripe")(process.env.STRIPE_KEY);
 require('dotenv').config()



const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require("body-parser").text());



if(process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/enatomy", { useNewUrlParser: true }, console.log(mongoose.connection.readyState));

////SETTING UP PASSPORT START---------------------------------------------------
// app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

////SETTING UP PASSPORT END---------------------------------------------------

////SETTING UP PASSPORT END---------------------------------------------------

app.post("/charge/:amount/", async (req, res) => {
  //   let amount = parseInt(req.params.amount, 10)
  // console.log(amount)
 console.log(req.params.amount)
  try {
    let {status} = await stripe.charges.create({
      amount: req.params.amount,
      currency: "usd",
      description: "Enatomy charge",
      source: req.body
    });

    res.json({status});
  } catch (err) {
    res.status(500).end();
    console.log("status code 500")
  }
});

app.listen(PORT, () => {
  console.log('Running on port:', PORT)
  console.log(process.env.REACT_APP_AWS_ACCESS_KEY)
           
})