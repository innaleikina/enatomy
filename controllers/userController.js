const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    db.User
      .find(req.query)
      .sort({
        date: -1
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  checkUser: function (req, res) {
    db.User
      .findOne({
        email: req.body.email
      })
      .then(dbModel => {
        if (!dbModel) {
          db.User
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        } else if (dbModel && !dbModel.confirmed) {
          db.User
          .findOneAndUpdate({
            email: req.body.email
        }, {
            $set: {
                signUpMessage: "You have previosuly registered. New confirmation email has been sent"
            }},
            {
                new: true
            }
        )
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
       
        } else {
          db.User
          .findOneAndUpdate({
            email: req.body.email
        }, {
            $set: {
                signUpMessage: "You already have an account. Please log in"
            }},
            {
                new: true
            }
        )
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
        }
      })
  },
  findByEmail: function (req, res) {
    db.User
      .findOne({
        email: req.params.email
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User
      .findById({
        _id: req.params.id
      })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  fetch: function (req, res) {
    res.json(req.user);
  }
}