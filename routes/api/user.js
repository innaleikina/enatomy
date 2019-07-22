const router = require("express").Router();
const userController = require("../../controllers/userController");
const db = require("../../models");

//auth definitions and variables start -----------------------------------------------------------------
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(
  function (username, password, done) {
    db.User.findOne({
      email: username
    }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, console.log("incorrect password"));
      }
      return done(null, user)
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (userId, done) {
  db.User.findById(userId, (err, user) => done(err, user));
});

//auth definitions and variables end -----------------------------------------------------------------

router.route("/api/")
  .post(userController.create);

  router.route("/api/validation")
  .post(userController.checkUser);

  router.route("/nodemailer/confirm/:id")
  .post(userController.confirm);


///user/all
router.route("/api/all")
  .get(userController.findAll);

//auth /user/login
router.route("/login")
  .post(passport.authenticate('local', {
    // successRedirect: '/home',
    failureRedirect: '/'
  }), function (req, res) {
    res.json(req.user);
  });

//logout
router.route("/logout")
  .get(function (req, res) {
    req.logout();
    res.redirect('/');
  })

router.route('/fetch').get(userController.fetch);

router
  .route("/:id")
  .get(userController.findById)
  .delete(userController.remove);

router
  .route("/email/:email")
  .get(userController.findByEmail)


module.exports = router;