const router = require("express").Router();
const userRoutes = require("./api/user");
const s3Routes = require("./api/s3");
const cartRoutes = require("./api/cart");
const path = require("path")


// Book routes
router.use("/user", userRoutes);
router.use("/s3", s3Routes);

router.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})




module.exports = router;
