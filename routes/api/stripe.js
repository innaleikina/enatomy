const router = require("express").Router();
const stripeController = require("../../controllers/stripeController");


// router.route("/checkout")
//   .post(stripeController.stripePayment);


router.route("/test")
.post(stripeController.test);


module.exports = router;