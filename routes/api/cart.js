const router = require("express").Router();
const cartController = require("../../controllers/cartController");

router.route("/addtocart/:id/:setname")
    .put(cartController.addToCart)

router.route("/test")
    .get(cartController.test);

module.exports = router;