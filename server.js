const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const passport = require("passport");
const bodyParser = require('body-parser');
const config = require("./config.json");
 const stripe = require("stripe")(config.stripe.secretKey);


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
app.post("/charge", async (req, res) => {
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
    console.log("status code 500")
  }
});

app.listen(PORT, () => {
  console.log('Running on port:', PORT)
})