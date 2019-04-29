const router = require("express").Router();
const cartController = require("../../controllers/cartController");

router.route("/addtocart/:id/:setname")
    .put(cartController.addToCart);


router.route("/emptycart/:id")
.put(cartController.emptyCart);

router.route("/test")
    .get(cartController.test);

module.exports = router;