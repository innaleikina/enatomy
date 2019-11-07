const router = require("express").Router();
const nodemailerController = require("../../controllers/nodemailerController");
  
// let randomNum = Math.floor(Math.random() * 500) + 100  


router.route("/sendwelcomeemail/:name/:email/:id")
  .post(nodemailerController.sendWelcomeEmail);


router.route("/sendpassreset/:name/:email/:id")
  .post(nodemailerController.sendPassReset);


  // router.route("/confirm/:id/")
  // .put(nodemailerController.confirmFromEmail);

  module.exports = router;