const router = require("express").Router();
const userRoutes = require("./api/user");
const s3Routes = require("./api/s3");
const path = require("path")


// Book routes
router.use("/user", userRoutes);
// router.use("/profile", profileRoutes);

router.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

//  router.use("/a3", s3Routes);
// router.use("/profile", profileRoutes);

router.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})


module.exports = router;
