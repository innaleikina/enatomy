const router = require("express").Router();
const photosetController = require("../../controllers/photosetController");


router.route("/set/:id")
// This route uses the user id
  .get(photosetController.findById)
  // !!!!This route uses the POST id!!!!!!
 