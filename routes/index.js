const router = require("express").Router();
const userRoutes = require("./api/user");
const path = require("path")


// User routes
router.use("/user", userRoutes);

router.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

module.exports = router;
