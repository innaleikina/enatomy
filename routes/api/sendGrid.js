const router = require("express").Router();
const sendGridController = require("../../controllers/sendGridController");

router.route("/sendwelcomeemail/:name/:email")
  .post(sendGridController.sendWelcomeEmail);


  module.exports = router;