const router = require("express").Router();
const sendGridController = require("../../controllers/sendGridController");
  
// let randomNum = Math.floor(Math.random() * 500) + 100  


router.route("/sendwelcomeemail/:name/:email")
  .post(sendGridController.sendWelcomeEmail);

  // router.route("/confirm/:id/")
  // .post(sendGridController.emailConfirmURL);

  module.exports = router;