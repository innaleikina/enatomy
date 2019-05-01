const router = require("express").Router();
const cartController = require("../../controllers/cartController");

router.route("/addtocart/:id/:setname")
    .put(cartController.addToCart);

router.route("/remove/:id/:setname")
    .put(cartController.removeOneFromCart);

router.route("/emptycart/:id")
    .put(cartController.emptyCart);

router.route("/test")
    .get(cartController.test);

module.exports = router;